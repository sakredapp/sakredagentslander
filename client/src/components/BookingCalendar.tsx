import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingCalendarProps {
  name: string;
  email: string;
}

interface AvailableTimesResponse {
  dates: Record<string, string[]>;
  calendlySlug: string;
}

function formatDateCard(dateStr: string) {
  const date = new Date(dateStr + "T12:00:00");
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
  const monthName = date.toLocaleDateString("en-US", { month: "short" });
  const dayNum = date.getDate();
  return { dayName, monthName, dayNum };
}

function formatTime(isoStr: string) {
  const date = new Date(isoStr);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/New_York",
  });
}

export function BookingCalendar({ name, email }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  const { data, isLoading, isError } = useQuery<AvailableTimesResponse>({
    queryKey: ["/api/calendly/available-times"],
  });

  const availableDates = data ? Object.keys(data.dates).sort() : [];
  const visibleCount = 5;
  const maxOffset = Math.max(0, availableDates.length - visibleCount);

  const visibleDates = availableDates.slice(scrollOffset, scrollOffset + visibleCount);

  const timesForDate = selectedDate && data?.dates[selectedDate] ? data.dates[selectedDate] : [];

  function handleTimeClick(startTime: string) {
    if (!data?.calendlySlug) return;
    const dateObj = new Date(startTime);
    const etParts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(dateObj);

    const get = (type: string) => etParts.find((p) => p.type === type)?.value || "";
    const yyyy = get("year");
    const mm = get("month");
    const dd = get("day");
    const hh = get("hour");
    const min = get("minute");

    const dateStr = `${yyyy}-${mm}-${dd}`;
    const timeStr = `${hh}:${min}`;
    const monthStr = `${yyyy}-${mm}`;

    const url = `${data.calendlySlug}/${dateStr}T${timeStr}:00?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&month=${monthStr}`;
    window.open(url, "_blank");
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-3" data-testid="booking-loading">
        <Loader2 className="w-8 h-8 text-[#C5A059] animate-spin" />
        <p className="text-sm text-muted-foreground">Loading available times...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-3" data-testid="booking-error">
        <p className="text-sm text-muted-foreground">Unable to load available times. Please try again later.</p>
      </div>
    );
  }

  if (availableDates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-3" data-testid="booking-empty">
        <Clock className="w-8 h-8 text-[#C5A059]/50" />
        <p className="text-sm text-muted-foreground">No available times in the next 2 weeks.</p>
        <Button
          variant="gold"
          data-testid="button-calendly-direct"
          onClick={() => window.open("https://calendly.com/sakredhealth/opportunity", "_blank")}
        >
          View Full Calendar
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
      data-testid="booking-calendar"
    >
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          disabled={scrollOffset === 0}
          onClick={() => setScrollOffset(Math.max(0, scrollOffset - 1))}
          data-testid="button-scroll-left"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex-1 flex gap-2 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {visibleDates.map((dateStr) => {
              const { dayName, monthName, dayNum } = formatDateCard(dateStr);
              const isSelected = selectedDate === dateStr;
              return (
                <motion.button
                  key={dateStr}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  data-testid={`date-card-${dateStr}`}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`flex-1 min-w-[72px] flex flex-col items-center py-3 px-2 rounded-md border text-center transition-colors ${
                    isSelected
                      ? "bg-[#C5A059]/10 border-[#C5A059] text-[#0F172A]"
                      : "bg-white border-gray-200 text-gray-500 hover:border-[#D4B76E]/50"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wide font-medium">{dayName}</span>
                  <span className="text-lg font-serif font-semibold leading-tight">{dayNum}</span>
                  <span className="text-[10px] uppercase tracking-wide">{monthName}</span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        <Button
          size="icon"
          variant="ghost"
          disabled={scrollOffset >= maxOffset}
          onClick={() => setScrollOffset(Math.min(maxOffset, scrollOffset + 1))}
          data-testid="button-scroll-right"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {selectedDate && timesForDate.length > 0 && (
          <motion.div
            key={selectedDate}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            <p className="text-xs text-muted-foreground text-center">
              Available times (Eastern Time)
            </p>
            <div className="flex flex-wrap justify-center gap-2" data-testid="time-slots">
              {timesForDate.map((slot) => (
                <motion.button
                  key={slot}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.15 }}
                  data-testid={`time-slot-${slot}`}
                  onClick={() => handleTimeClick(slot)}
                  className="px-4 py-2 rounded-full border border-[#D4B76E]/40 bg-[#D4B76E]/10 text-[#0F172A] text-sm font-medium transition-colors hover:bg-[#C5A059] hover:text-white hover:border-[#C5A059]"
                >
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {formatTime(slot)}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {selectedDate && timesForDate.length === 0 && (
          <motion.p
            key="no-times"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-muted-foreground text-center py-4"
            data-testid="text-no-times"
          >
            No times available on this date.
          </motion.p>
        )}
      </AnimatePresence>

      {!selectedDate && (
        <p className="text-sm text-muted-foreground text-center py-2" data-testid="text-select-prompt">
          Select a date to view available times
        </p>
      )}
    </motion.div>
  );
}