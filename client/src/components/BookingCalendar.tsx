import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CRMSlot {
  id: string;
  starts_at: string;
  ends_at: string;
  spots_remaining: number;
  title: string;
}

interface BookingCalendarProps {
  name: string;
  email: string;
  phone: string;
  leadId?: number;
  onBooked?: () => void;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/New_York",
  });
}

function getDateKey(isoString: string): string {
  const date = new Date(isoString);
  const year = date.toLocaleString("en-US", { year: "numeric", timeZone: "America/New_York" });
  const month = date.toLocaleString("en-US", { month: "2-digit", timeZone: "America/New_York" });
  const day = date.toLocaleString("en-US", { day: "2-digit", timeZone: "America/New_York" });
  return `${year}-${month}-${day}`;
}

export function BookingCalendar({ name, email, phone, leadId, onBooked }: BookingCalendarProps) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<{ date: string; time: string } | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const [slots, setSlots] = useState<CRMSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  useEffect(() => {
    setSlotsLoading(true);
    setSlotsError(null);
    fetch("/api/scheduling/available")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load available times");
        return res.json();
      })
      .then((data) => {
        const slotList = Array.isArray(data) ? data : data.slots || data.data || [];
        setSlots(slotList);
      })
      .catch((err) => setSlotsError(err.message))
      .finally(() => setSlotsLoading(false));
  }, []);

  const slotsByDate = new Map<string, CRMSlot[]>();
  for (const slot of slots) {
    if (slot.spots_remaining <= 0) continue;
    const key = getDateKey(slot.starts_at);
    if (!slotsByDate.has(key)) slotsByDate.set(key, []);
    slotsByDate.get(key)!.push(slot);
  }

  const calendarDays = getCalendarDays(viewYear, viewMonth);

  function isDayAvailable(day: number): boolean {
    const key = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return slotsByDate.has(key);
  }

  function getSlotsForDay(day: number): CRMSlot[] {
    const key = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return slotsByDate.get(key) || [];
  }

  const maxBookingDate = new Date();
  maxBookingDate.setDate(maxBookingDate.getDate() + 28);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
    setSelectedDay(null);
    setSelectedSlotId(null);
  }

  function nextMonth() {
    const maxMonth = maxBookingDate.getMonth();
    const maxYear = maxBookingDate.getFullYear();
    const nextM = viewMonth === 11 ? 0 : viewMonth + 1;
    const nextY = viewMonth === 11 ? viewYear + 1 : viewYear;
    if (nextY > maxYear || (nextY === maxYear && nextM > maxMonth)) return;
    setViewMonth(nextM);
    setViewYear(nextY);
    setSelectedDay(null);
    setSelectedSlotId(null);
  }

  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());
  const canGoNext = (() => {
    const nextM = viewMonth === 11 ? 0 : viewMonth + 1;
    const nextY = viewMonth === 11 ? viewYear + 1 : viewYear;
    const maxMonth = maxBookingDate.getMonth();
    const maxYear = maxBookingDate.getFullYear();
    return nextY < maxYear || (nextY === maxYear && nextM <= maxMonth);
  })();

  async function handleConfirm() {
    if (!selectedSlotId) return;
    setIsBooking(true);
    setBookingError(null);
    try {
      const res = await fetch("/api/scheduling/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot_id: selectedSlotId,
          email,
          name,
          phone,
          recruit_id: leadId,
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || "Booking failed. Please try again.");
      }
      const selectedSlot = slots.find((s) => s.id === selectedSlotId);
      if (selectedSlot) {
        const date = new Date(selectedSlot.starts_at);
        const formattedDate = date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          timeZone: "America/New_York",
        });
        const formattedTime = formatTime(selectedSlot.starts_at);
        setConfirmed({ date: formattedDate, time: formattedTime });
      } else {
        setConfirmed({ date: "Your selected date", time: "" });
      }
      onBooked?.();
    } catch (err: any) {
      setBookingError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsBooking(false);
    }
  }

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center space-y-5 py-8"
        data-testid="booking-confirmed"
      >
        <div className="w-16 h-16 rounded-full bg-[#C5A059]/15 flex items-center justify-center">
          <Check className="w-8 h-8 text-[#C5A059]" />
        </div>
        <div className="space-y-2">
          <h4 className="text-2xl font-serif text-[#0F172A]">You're In. Let's Execute.</h4>
          <p className="text-base text-muted-foreground">{confirmed.date}{confirmed.time ? ` at ${confirmed.time} EST` : ""}</p>
        </div>
        <p className="text-sm text-muted-foreground max-w-sm">
          Check your email for a confirmation with the Zoom link and calendar invite. Be somewhere quiet with a computer ready to learn about the opportunity.
        </p>
      </motion.div>
    );
  }

  if (slotsLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-3" data-testid="booking-loading">
        <Loader2 className="w-6 h-6 text-[#C5A059] animate-spin" />
        <p className="text-sm text-muted-foreground">Loading available times...</p>
      </div>
    );
  }

  if (slotsError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-3 text-center" data-testid="booking-error">
        <p className="text-sm text-red-500">Unable to load available times. Please try again later.</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.reload()}
          data-testid="button-retry-slots"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-3 text-center" data-testid="booking-no-slots">
        <p className="text-sm text-muted-foreground">No available time slots right now. Please check back soon.</p>
      </div>
    );
  }

  const daySlots = selectedDay ? getSlotsForDay(selectedDay) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      data-testid="booking-calendar"
      className="w-full"
    >
      <div className="flex items-center justify-between gap-2 mb-4">
        <Button
          size="icon"
          variant="ghost"
          disabled={!canGoPrev}
          onClick={prevMonth}
          data-testid="button-prev-month"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-base font-medium text-[#0F172A]" data-testid="text-current-month">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <Button
          size="icon"
          variant="ghost"
          disabled={!canGoNext}
          onClick={nextMonth}
          data-testid="button-next-month"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2">
        {calendarDays.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="h-11" />;
          }
          const available = isDayAvailable(day);
          const isSelected = selectedDay === day;
          const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

          return (
            <div key={day} className="flex items-center justify-center">
              <button
                disabled={!available}
                data-testid={`day-${day}`}
                onClick={() => { setSelectedDay(day); setSelectedSlotId(null); }}
                className={`w-11 h-11 flex items-center justify-center text-sm rounded-full transition-all duration-200 relative ${
                  isSelected
                    ? "bg-[#C5A059] text-white font-medium"
                    : available
                      ? "text-[#0F172A] font-medium ring-2 ring-[#C5A059] hover:bg-[#C5A059]/10 cursor-pointer"
                      : "text-gray-300 cursor-default"
                }`}
              >
                {day}
                {isToday && !isSelected && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0F172A]/30" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selectedDay && daySlots.length > 0 && (
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-5 pt-5 border-t border-gray-100"
          >
            <p className="text-sm text-muted-foreground mb-3">Available times (Eastern)</p>
            <div className="space-y-2">
              {daySlots.map((slot) => {
                const isSlotSelected = selectedSlotId === slot.id;
                return (
                  <button
                    key={slot.id}
                    data-testid={`time-slot-${slot.id}`}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`w-full py-3 rounded-md border-2 text-sm font-medium transition-colors text-center ${
                      isSlotSelected
                        ? "border-[#C5A059] bg-[#C5A059] text-white"
                        : "border-[#C5A059] bg-[#C5A059]/5 text-[#0F172A] hover:bg-[#C5A059]/15"
                    }`}
                  >
                    {formatTime(slot.starts_at)}
                    {slot.spots_remaining <= 3 && (
                      <span className="ml-2 text-xs opacity-70">({slot.spots_remaining} spots left)</span>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedSlotId && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4"
              >
                <Button
                  onClick={handleConfirm}
                  disabled={isBooking}
                  className="w-full bg-gradient-to-b from-[#D4B76E] via-[#C5A059] to-[#B8944E] text-white border border-[#D4B76E]/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] font-serif tracking-wide"
                  data-testid="button-confirm-booking"
                >
                  {isBooking ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </motion.div>
            )}

            {bookingError && (
              <p className="text-sm text-red-500 mt-2 text-center" data-testid="text-booking-error">
                {bookingError}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        All times shown in Eastern Time
      </p>
    </motion.div>
  );
}
