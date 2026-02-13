import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from "framer-motion";

export function CommissionCalculator() {
  const [premium, setPremium] = useState(800);
  const [policies, setPolicies] = useState(5);
  const [commission, setCommission] = useState(15);
  const [retention, setRetention] = useState(12);

  const calculate = useMemo(() => {
    // Simple logic for demonstration
    // Monthly commission per policy
    const monthlyCommPerPolicy = premium * (commission / 100);
    
    // Month 1 revenue (assuming policies sold in month 1)
    const month1 = monthlyCommPerPolicy * policies;
    
    // Month 6 revenue (accumulation)
    // Assuming simple linear growth for this demo (6 months * policies/mo)
    const totalPoliciesMonth6 = policies * 6;
    const month6 = totalPoliciesMonth6 * monthlyCommPerPolicy;
    
    // Month 12 revenue
    const totalPoliciesMonth12 = policies * 12;
    const month12 = totalPoliciesMonth12 * monthlyCommPerPolicy;

    return { month1, month6, month12 };
  }, [premium, policies, commission, retention]);

  const data = [
    { name: 'Month 1', value: calculate.month1 },
    { name: 'Month 6', value: calculate.month6 },
    { name: 'Month 12', value: calculate.month12 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Average Monthly Premium</span>
              <span className="text-sm font-bold font-mono text-[#C5A059]">${premium}</span>
            </div>
            <Slider
              value={[premium]}
              onValueChange={(vals) => setPremium(vals[0])}
              min={100}
              max={2000}
              step={50}
              className="py-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Policies Sold Per Month</span>
              <span className="text-sm font-bold font-mono text-[#C5A059]">{policies}</span>
            </div>
            <Slider
              value={[policies]}
              onValueChange={(vals) => setPolicies(vals[0])}
              min={1}
              max={50}
              step={1}
              className="py-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Commission Rate</span>
              <span className="text-sm font-bold font-mono text-[#C5A059]">{commission}%</span>
            </div>
            <Slider
              value={[commission]}
              onValueChange={(vals) => setCommission(vals[0])}
              min={5}
              max={30}
              step={1}
              className="py-2"
            />
          </div>
        </div>
        
        <Card className="p-6 bg-slate-50 border-none shadow-inner">
          <div className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Projected Monthly Income (Month 12)</div>
          <div className="text-4xl font-serif font-bold text-[#0F172A]">
            ${calculate.month12.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            <span className="text-lg text-muted-foreground font-sans font-normal ml-2">/mo</span>
          </div>
        </Card>
      </div>

      <div className="h-[400px] w-full bg-white rounded-2xl p-6 border border-[#C5A059]/20 shadow-xl shadow-[#C5A059]/5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              hide={true} 
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Income']}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={1000}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 2 ? '#C5A059' : '#E2E8F0'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
