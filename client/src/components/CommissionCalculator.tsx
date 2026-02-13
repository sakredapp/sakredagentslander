import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

export function CommissionCalculator() {
  const [premium, setPremium] = useState(800);
  const [policies, setPolicies] = useState(5);
  const [commission, setCommission] = useState(15);
  const [retention, setRetention] = useState(12);

  const calculate = useMemo(() => {
    const monthlyCommPerPolicy = premium * (commission / 100);
    const month1 = monthlyCommPerPolicy * policies;

    let month6 = 0;
    for (let m = 1; m <= 6; m++) {
      const activePolicies = Math.min(m, Math.floor(retention)) * policies;
      month6 = activePolicies * monthlyCommPerPolicy;
    }

    let month12 = 0;
    const activePoliciesAt12 = Math.min(12, Math.floor(retention)) * policies;
    month12 = activePoliciesAt12 * monthlyCommPerPolicy;

    const total12 = Array.from({ length: 12 }, (_, i) => {
      const m = i + 1;
      const active = Math.min(m, Math.floor(retention)) * policies;
      return active * monthlyCommPerPolicy;
    }).reduce((sum, v) => sum + v, 0);

    const renewalRunRate = activePoliciesAt12 * monthlyCommPerPolicy;

    return { month1, month6, month12, total12, renewalRunRate };
  }, [premium, policies, commission, retention]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* Inputs */}
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between gap-4 flex-wrap">
              <span className="text-sm font-medium text-[#0F172A]/70">Avg Monthly Premium</span>
              <span className="text-sm font-bold text-[#C5A059] tabular-nums">{formatCurrency(premium)}</span>
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
              <span className="text-sm font-bold text-[#C5A059] tabular-nums">{policies}</span>
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
              <span className="text-sm font-medium text-[#0F172A]/70">Avg Retention (months)</span>
              <span className="text-sm font-bold text-[#C5A059] tabular-nums">{retention}</span>
            </div>
            <Slider
              value={[retention]}
              onValueChange={(vals) => setRetention(vals[0])}
              min={3}
              max={36}
              step={1}
              className="py-2"
              data-testid="slider-retention"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between gap-4 flex-wrap">
              <span className="text-sm font-medium text-[#0F172A]/70">Commission Rate</span>
              <span className="text-sm font-bold text-[#C5A059] tabular-nums">{commission}%</span>
            </div>
            <Slider
              value={[commission]}
              onValueChange={(vals) => setCommission(vals[0])}
              min={5}
              max={30}
              step={1}
              className="py-2"
              data-testid="slider-commission"
            />
          </div>
        </div>
      </div>

      {/* Outputs */}
      <Card className="border-[#C5A059]/20 bg-white shadow-lg shadow-[#C5A059]/5 overflow-visible">
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-xs font-semibold tracking-[0.15em] text-[#0F172A]/35 uppercase mb-1">Month 1</div>
              <div className="text-2xl font-bold tabular-nums" style={{ fontFamily: "'Playfair Display', serif" }}>
                {formatCurrency(calculate.month1)}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold tracking-[0.15em] text-[#0F172A]/35 uppercase mb-1">Month 6 Run-Rate</div>
              <div className="text-2xl font-bold tabular-nums" style={{ fontFamily: "'Playfair Display', serif" }}>
                {formatCurrency(calculate.month6)}
              </div>
            </div>
          </div>

          <div className="border-t border-[#C5A059]/10 pt-6">
            <div className="text-xs font-semibold tracking-[0.15em] text-[#C5A059] uppercase mb-2">Month 12 Run-Rate</div>
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#C5A059] via-[#D4B76E] to-[#A68A4A] bg-clip-text text-transparent tabular-nums" style={{ fontFamily: "'Playfair Display', serif" }}>
              {formatCurrency(calculate.month12)}
              <span className="text-lg text-[#0F172A]/30 ml-2" style={{ fontFamily: "'DM Sans', sans-serif", WebkitTextFillColor: 'initial' }}>/mo</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t border-[#C5A059]/10 pt-6">
            <div>
              <div className="text-xs font-semibold tracking-[0.15em] text-[#0F172A]/35 uppercase mb-1">12-Month Total</div>
              <div className="text-xl font-bold tabular-nums" style={{ fontFamily: "'Playfair Display', serif" }}>
                {formatCurrency(calculate.total12)}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold tracking-[0.15em] text-[#0F172A]/35 uppercase mb-1">Renewal Run-Rate</div>
              <div className="text-xl font-bold tabular-nums" style={{ fontFamily: "'Playfair Display', serif" }}>
                {formatCurrency(calculate.renewalRunRate)}
              </div>
            </div>
          </div>

          <div className="text-xs text-[#0F172A]/30 pt-2 italic">
            Estimates only. Actual comp varies by carrier, persistency, and contracting.
          </div>
        </div>
      </Card>
    </div>
  );
}
