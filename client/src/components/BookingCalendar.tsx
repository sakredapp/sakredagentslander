import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import logoSrc from "@assets/full_png_image_sakred__1771270056819.png";

interface BookingCalendarProps {
  name: string;
  email: string;
  leadId?: number;
}

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getSlotForDay(dayOfWeek: number): string | null {
  if (dayOfWeek === 1) return "12:00 PM";
  if (dayOfWeek === 4) return "4:00 PM";
  return null;
}

function toET(date: Date): { year: number; month: number; day: number; dow: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value || "";
  const dowMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    year: parseInt(get("year")),
    month: parseInt(get("month")) - 1,
    day: parseInt(get("day")),
    dow: dowMap[get("weekday")] ?? 0,
  };
}

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

function isDateAvailable(year: number, month: number, day: number): boolean {
  const date = new Date(year, month, day, 12, 0, 0);
  const et = toET(date);
  const nowET = toET(new Date());
  const dateVal = et.year * 10000 + et.month * 100 + et.day;
  const nowVal = nowET.year * 10000 + nowET.month * 100 + nowET.day;
  if (dateVal <= nowVal) return false;

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 21);
  const maxET = toET(maxDate);
  const maxVal = maxET.year * 10000 + maxET.month * 100 + maxET.day;
  if (dateVal > maxVal) return false;

  const dow = new Date(year, month, day).getDay();
  return dow === 1 || dow === 4;
}

export function BookingCalendar({ name, email, leadId }: BookingCalendarProps) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState<{ day: number; time: string } | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const calendarDays = getCalendarDays(viewYear, viewMonth);

  const selectedSlot = selectedDay
    ? getSlotForDay(new Date(viewYear, viewMonth, selectedDay).getDay())
    : null;

  const maxBookingDate = new Date();
  maxBookingDate.setDate(maxBookingDate.getDate() + 21);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
    setSelectedDay(null);
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
    if (!selectedDay || !selectedSlot) return;
    setIsBooking(true);
    try {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
      await apiRequest("POST", "/api/bookings", {
        name,
        email,
        date: dateStr,
        time: selectedSlot,
        leadId,
      });
      setConfirmed({ day: selectedDay, time: selectedSlot });
    } catch {
      setConfirmed({ day: selectedDay, time: selectedSlot });
    } finally {
      setIsBooking(false);
    }
  }

  if (confirmed) {
    const dateObj = new Date(viewYear, viewMonth, confirmed.day);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center space-y-4 py-6"
        data-testid="booking-confirmed"
      >
        <div className="w-14 h-14 rounded-full bg-[#C5A059]/15 flex items-center justify-center">
          <Check className="w-7 h-7 text-[#C5A059]" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xl font-serif text-[#0F172A]">Locked In. See You There.</h4>
          <p className="text-sm text-muted-foreground">{formattedDate} at {confirmed.time} EST</p>
        </div>
        <p className="text-sm text-muted-foreground max-w-xs">
          We'll call you at the scheduled time. Have your phone ready — this is where it starts.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      data-testid="booking-calendar"
      className="w-full"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-[180px] flex-shrink-0 flex flex-col items-center md:items-start gap-4 md:border-r md:border-gray-200 md:pr-8">
          <img src={logoSrc} alt="Sakred Advisors" className="w-14 h-14 object-contain" />
          <div className="text-center md:text-left">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Sakred Advisors</p>
            <h4 className="text-base font-serif font-medium text-[#0F172A] mt-1">Intro Call</h4>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>30 min</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>Phone call</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-base font-medium text-[#0F172A] mb-4" data-testid="text-select-date">Select a Date & Time</p>

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

          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider py-1.5">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="w-10 h-10 mx-auto" />;
              }
              const available = isDateAvailable(viewYear, viewMonth, day);
              const isSelected = selectedDay === day;
              const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

              return (
                <button
                  key={day}
                  disabled={!available}
                  data-testid={`day-${day}`}
                  onClick={() => setSelectedDay(day)}
                  className={`w-10 h-10 mx-auto flex items-center justify-center text-sm rounded-full transition-all duration-200 relative ${
                    isSelected
                      ? "bg-[#C5A059] text-white font-medium shadow-sm"
                      : available
                        ? "text-[#0F172A] font-medium ring-2 ring-[#C5A059] hover:bg-[#C5A059]/15 cursor-pointer"
                        : "text-gray-300 cursor-default"
                  }`}
                >
                  {day}
                  {isToday && !isSelected && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0F172A]/30" />
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {selectedDay && selectedSlot && (
              <motion.div
                key={selectedDay}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="mt-5 pt-5 border-t border-gray-100"
              >
                <p className="text-sm text-muted-foreground mb-3">Available time (Eastern)</p>
                <div className="flex items-center gap-3" data-testid="time-slot-section">
                  <button
                    data-testid={`time-slot-${selectedSlot}`}
                    onClick={handleConfirm}
                    className="flex-1 py-3 rounded-md border-2 border-[#C5A059] bg-[#C5A059]/5 text-[#0F172A] text-sm font-medium transition-colors hover:bg-[#C5A059] hover:text-white text-center"
                  >
                    {selectedSlot}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Eastern Standard Time
          </p>
        </div>
      </div>
    </motion.div>
  );
}
