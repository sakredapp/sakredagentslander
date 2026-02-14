import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

export function CommissionCalculator() {
  const [premium, setPremium] = useState(800);
  const [policies, setPolicies] = useState(5);
  const [persistency, setPersistency] = useState(85);

  const COMMISSION_RATE = 0.19;

  const calculate = useMemo(() => {
    const monthlyCommPerPolicy = premium * COMMISSION_RATE;
    const persistencyRate = persistency / 100;

    const years: { year: number; monthlyIncome: number; annualIncome: number; activePolicies: number }[] = [];

    let totalActive = 0;

    for (let y = 1; y <= 5; y++) {
      const newPoliciesThisYear = policies * 12;
      const previousActive = totalActive * persistencyRate;
      totalActive = previousActive + newPoliciesThisYear;

      const monthlyIncome = totalActive * monthlyCommPerPolicy;
      const annualIncome = monthlyIncome * 12;

      years.push({
        year: y,
        monthlyIncome,
        annualIncome,
        activePolicies: Math.round(totalActive),
      });
    }

    return years;
  }, [premium, policies, persistency]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between gap-4 flex-wrap">
              <span className="text-sm font-medium text-[#0F172A]/70">Avg Monthly Premium</span>
              <span className="text-sm font-medium text-[#C5A059] tabular-nums">{formatCurrency(premium)}</span>
            </div>
            <Slider
              value={[premium]}
              onValueChange={(vals) => setPremium(vals[0])}
              min={100}
              max={2000}
              step={50}
              className="py-2"
              data-testid="slider-premium"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between gap-4 flex-wrap">
              <span className="text-sm font-medium text-[#0F172A]/70">Policies Per Month</span>
              <span className="text-sm font-medium text-[#C5A059] tabular-nums">{policies}</span>
            </div>
            <Slider
              value={[policies]}
              onValueChange={(vals) => setPolicies(vals[0])}
              min={1}
              max={50}
              step={1}
              className="py-2"
              data-testid="slider-policies"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between gap-4 flex-wrap">
              <span className="text-sm font-medium text-[#0F172A]/70">Persistency %</span>
              <span className="text-sm font-medium text-[#C5A059] tabular-nums">{persistency}%</span>
            </div>
            <Slider
              value={[persistency]}
              onValueChange={(vals) => setPersistency(vals[0])}
              min={50}
              max={100}
              step={1}
              className="py-2"
              data-testid="slider-persistency"
            />
            <p className="text-xs text-[#0F172A]/35 italic">85% is the recommended industry persistency rate</p>
          </div>

          <div className="pt-2 px-4 py-3 rounded-md bg-[#C5A059]/5 border border-[#C5A059]/10">
            <div className="flex justify-between gap-4 flex-wrap">
              <span className="text-xs font-medium tracking-[0.1em] text-[#0F172A]/40 uppercase">Commission Rate</span>
              <span className="text-sm font-medium text-[#A68A4A]">19%</span>
            </div>
          </div>
        </div>
      </div>

      <Card className="border-[#C5A059]/20 bg-white shadow-lg shadow-[#C5A059]/5 overflow-visible">
        <div className="p-8 space-y-0">
          <div className="text-xs font-medium tracking-[0.15em] text-[#0F172A]/35 uppercase mb-5">Projected Income by Year</div>

          {calculate.map((yr, i) => (
            <div
              key={yr.year}
              className={`flex items-center justify-between py-4 ${i < calculate.length - 1 ? "border-b border-[#C5A059]/8" : ""}`}
              data-testid={`row-year-${yr.year}`}
            >
              <div className="space-y-0.5">
                <div className="text-sm font-medium text-[#0F172A]/70">Year {yr.year}</div>
                <div className="text-xs text-[#0F172A]/35">{yr.activePolicies} active policies</div>
              </div>
              <div className="text-right space-y-0.5">
                <div
                  className={`font-medium tabular-nums ${i === calculate.length - 1 ? "text-xl bg-gradient-to-r from-[#C5A059] via-[#D4B76E] to-[#A68A4A] bg-clip-text text-transparent" : "text-lg text-[#0F172A]"}`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {formatCurrency(yr.annualIncome)}
                </div>
                <div className="text-xs text-[#0F172A]/35 tabular-nums">{formatCurrency(yr.monthlyIncome)}/mo</div>
              </div>
            </div>
          ))}

          <div className="text-xs text-[#0F172A]/30 pt-6 italic">
            Estimates only. Actual comp varies by carrier, persistency, and contracting.
          </div>
        </div>
      </Card>
    </div>
  );
}
