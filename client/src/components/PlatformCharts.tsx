/**
 * Charts for the #platform section.
 *
 * Every number on this page is STRUCTURAL (a schedule, a stage list, a payout
 * mechanic) or an explicitly-labelled illustration. None of it is a performance
 * statistic — we have no publicly-defensible denominator for reply rate,
 * booking rate, or conversion, and a wrong stat on a recruiting page is worse
 * than no stat. Do not add one here without a source you can defend.
 *
 * Sources of truth (crmbuilds repo):
 *   - cadence      → hetzner/lib/sms-templates.ts   (reengagement stageN_Ndays keys)
 *   - board stages → client/src/lib/types.ts        (PROSPECT_DISPOSITIONS, 31 selectable)
 *   - payout shape → api/_lib/commission-schedule.ts (advance lump + as-earned tail)
 * If any of those change, this file is stale.
 *
 * Palette: #A6791B (gold) / #3A5CA8 (indigo). Validated with the dataviz
 * six-checks validator against both #FFFFFF and #F9F9F7 — all pass. The brand
 * gold #C5A059 is deliberately NOT used as a data mark: it fails the chroma
 * floor and lands at 2.46:1 on white. It stays as a decorative/border accent.
 */

const GOLD = "#A6791B";
const INDIGO = "#3A5CA8";
const INK = "#0F172A";
const GRID = "rgba(15, 23, 42, 0.10)";

function Figure({
  kicker,
  title,
  note,
  children,
}: {
  kicker: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="portal-card p-6 md:p-8 m-0" data-testid={`figure-${kicker.toLowerCase().replace(/\s+/g, "-")}`}>
      <figcaption className="mb-6">
        <div className="text-[0.65rem] font-medium tracking-[0.25em] text-[#A68A4A] uppercase mb-2">{kicker}</div>
        <h4 className="text-xl md:text-2xl font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
          {title}
        </h4>
      </figcaption>
      {children}
      <p className="text-[#0F172A]/40 text-xs leading-relaxed mt-5 pt-4 border-t border-[#C5A059]/15">{note}</p>
    </figure>
  );
}

function Legend({ items }: { items: { color: string; label: string }[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-5 list-none p-0 m-0">
      {items.map((it) => (
        <li key={it.label} className="flex items-center gap-2 text-xs text-[#0F172A]/65">
          <span aria-hidden="true" className="inline-block w-3 h-3 rounded-sm shrink-0" style={{ background: it.color }} />
          {it.label}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · Follow-up cadence — real day offsets from sms-templates.ts      */
/* ------------------------------------------------------------------ */

// stage1_1days … stage7_17days, verified 2026-08-03 for health, aca, iul,
// general_life, finex, annuity, mortgage_protection (identical ladders).
const CADENCE = [
  { day: 0, label: "Lead lands", detail: "First text goes out in seconds", opener: true },
  { day: 1, label: "Day 1", detail: "Checks it didn't get buried" },
  { day: 2, label: "Day 2", detail: "Asks a direct question" },
  { day: 4, label: "Day 4", detail: "Reframes the value" },
  { day: 6, label: "Day 6", detail: "Offers to run the numbers" },
  { day: 9, label: "Day 9", detail: "Offers a time with your name on it" },
  { day: 13, label: "Day 13", detail: "Asks for a yes or a no" },
  { day: 17, label: "Day 17", detail: "Closes the file — or reopens it" },
];

export function CadenceTimeline() {
  const W = 780;
  const H = 150;
  const padL = 24;
  const padR = 24;
  const axisY = 78;
  const maxDay = 17;
  const x = (d: number) => padL + (d / maxDay) * (W - padL - padR);

  return (
    <Figure
      kicker="Follow-Up"
      title="Seven touches over seventeen days — without you"
      note="The re-engagement schedule shipped for health, ACA, life, mortgage protection, IUL, final expense, and annuity leads. Supplemental runs a longer cycle — six touches out to day 90. A reply at any point stops the ladder and hands the conversation back to a live thread."
    >
      <Legend
        items={[
          { color: INDIGO, label: "First contact (immediate)" },
          { color: GOLD, label: "Automatic re-engagement" },
        ]}
      />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label="Timeline of automatic follow-up: a first text the moment the lead lands, then re-engagement texts on days 1, 2, 4, 6, 9, 13 and 17."
        style={{ overflow: "visible" }}
      >
        {/* axis */}
        <line x1={padL} y1={axisY} x2={W - padR} y2={axisY} stroke={GRID} strokeWidth={2} />

        {CADENCE.map((t) => {
          const cx = x(t.day);
          const color = t.opener ? INDIGO : GOLD;
          // Alternate labels above/below so days 1 and 2 never collide.
          const above = t.day % 2 === 0;
          return (
            <g key={t.day}>
              <title>{`${t.label} — ${t.detail}`}</title>
              <line x1={cx} y1={axisY} x2={cx} y2={above ? axisY - 14 : axisY + 14} stroke={color} strokeWidth={2} />
              <circle cx={cx} cy={axisY} r={t.opener ? 7 : 5.5} fill={color} stroke="#fff" strokeWidth={2} />
              <text
                x={cx}
                y={above ? axisY - 22 : axisY + 30}
                textAnchor="middle"
                fontSize="12"
                fontWeight="500"
                fill={INK}
                fillOpacity={0.8}
              >
                {t.opener ? "Lands" : t.day}
              </text>
            </g>
          );
        })}

        {/* axis end caption */}
        <text x={padL} y={H - 6} fontSize="11" fill={INK} fillOpacity={0.4}>
          day 0
        </text>
        <text x={W - padR} y={H - 6} textAnchor="end" fontSize="11" fill={INK} fillOpacity={0.4}>
          day 17 &rarr; dormant, then long-cycle re-engagement
        </text>
      </svg>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 mt-6 list-none p-0 text-sm">
        {CADENCE.map((t) => (
          <li key={t.day} className="flex gap-3 text-[#0F172A]/55">
            <span className="font-medium text-[#0F172A]/80 tabular-nums shrink-0 w-14">
              {t.opener ? "Lands" : `Day ${t.day}`}
            </span>
            <span>{t.detail}</span>
          </li>
        ))}
      </ul>
    </Figure>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · The board — structural, no numbers                             */
/* ------------------------------------------------------------------ */

const JOURNEY = [
  { stage: "New", items: ["New"] },
  { stage: "Dialing", items: ["No Answer", "Left Voicemail", "Callback"] },
  { stage: "Talking", items: ["Replied", "Re-Engaging", "Maybe Later"] },
  { stage: "Warm", items: ["Interested", "Sent Info", "Pending Booking"] },
  { stage: "Appointments", items: ["Appt 1 Set", "Appt 2 Set", "Appt 3 Set"], accent: true },
  { stage: "Writing", items: ["Application Submitted", "Application Approved"] },
];

const ROUND_OUTCOMES = ["Set", "No Show", "Reschedule", "Sat — No Follow-Up Set"];

export function PipelineLadder() {
  return (
    <Figure
      kicker="The Board"
      title="Thirty-one dispositions. One board."
      note="The live disposition list from the platform. Every lead sits in exactly one of these, which is what lets the dialer know who to call next and the assistant know whether to keep texting. Terminal outcomes — Not Interested, Wrong Number, Do Not Contact, Disqualified, Unresponsive — sit at the end of the board so the working funnel reads left to right."
    >
      <div className="overflow-x-auto -mx-2 px-2">
        <div className="flex items-stretch gap-2 min-w-[640px]">
          {JOURNEY.map((col, i) => (
            <div key={col.stage} className="flex items-stretch gap-2 flex-1">
              <div
                className={`flex-1 rounded-lg border p-3 ${
                  col.accent ? "border-[#C5A059]/45 bg-[#C5A059]/[0.07]" : "border-[#C5A059]/20 bg-white"
                }`}
              >
                <div className="text-[0.6rem] font-medium tracking-[0.18em] text-[#A68A4A] uppercase mb-2.5">
                  {col.stage}
                </div>
                <ul className="list-none p-0 m-0 space-y-1.5">
                  {col.items.map((it) => (
                    <li key={it} className="text-[0.7rem] leading-snug text-[#0F172A]/70">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              {i < JOURNEY.length - 1 && (
                <div className="flex items-center text-[#C5A059] text-sm shrink-0" aria-hidden="true">
                  &rarr;
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-[#C5A059]/25 bg-[#C5A059]/[0.05] p-5">
        <div className="text-[0.6rem] font-medium tracking-[0.18em] text-[#A68A4A] uppercase mb-1.5">
          Every appointment round, tracked separately
        </div>
        <p className="text-[#0F172A]/55 text-sm leading-relaxed mb-4">
          Most CRMs give you one &ldquo;appointment&rdquo; field and lose the story after the first no-show. Each of the
          three rounds carries its own four outcomes:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {["Appt 1", "Appt 2", "Appt 3"].map((round) => (
            <div key={round} className="rounded-md bg-white border border-[#C5A059]/20 p-3">
              <div className="text-xs font-medium text-[#0F172A]/80 mb-2">{round}</div>
              <ul className="list-none p-0 m-0 space-y-1">
                {ROUND_OUTCOMES.map((o) => (
                  <li key={o} className="text-[0.68rem] leading-snug text-[#0F172A]/50">
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Figure>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · Advance vs as-earned — the payout mechanic                     */
/* ------------------------------------------------------------------ */

// Shape comes from api/_lib/commission-schedule.ts: an advance pays n months as
// a lump at month 0, then months n..11 pay as-earned. As-earned pays 12 equal
// shares. Both total the same first-year commission.
const ANNUAL = 1200;
const MONTHLY = ANNUAL / 12;
const ADVANCE_MONTHS = 9;

const cumulativeAdvance = Array.from({ length: 12 }, (_, m) =>
  m === 0 ? ADVANCE_MONTHS * MONTHLY : ADVANCE_MONTHS * MONTHLY + Math.max(0, m - ADVANCE_MONTHS + 1) * MONTHLY,
);
const cumulativeAsEarned = Array.from({ length: 12 }, (_, m) => (m + 1) * MONTHLY);

export function CommissionCurve() {
  const W = 780;
  const H = 300;
  const padL = 54;
  const padR = 30;
  const padT = 16;
  const padB = 46;
  const maxY = ANNUAL;

  const x = (m: number) => padL + (m / 11) * (W - padL - padR);
  const y = (v: number) => padT + (1 - v / maxY) * (H - padT - padB);
  const path = (vals: number[]) => vals.map((v, m) => `${m === 0 ? "M" : "L"}${x(m)},${y(v)}`).join(" ");

  const ticks = [0, 300, 600, 900, 1200];

  return (
    <Figure
      kicker="Getting Paid"
      title="The same case. Two very different months."
      note="Illustration using a case that pays $1,200 in first-year commission, advanced at nine months — not a representative case, an average, or a promise. Your actual advance terms and comp vary by plan, product, and your level. The platform models whichever applies to you and shows the resulting schedule per policy."
    >
      <Legend
        items={[
          { color: GOLD, label: `Advanced (${ADVANCE_MONTHS} months upfront)` },
          { color: INDIGO, label: "As-earned (paid monthly)" },
        ]}
      />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label={`Cumulative first-year commission over twelve months. An advanced case pays $${(ADVANCE_MONTHS * MONTHLY).toFixed(0)} in month one and reaches $${ANNUAL} by month twelve. An as-earned case climbs in equal monthly steps to the same $${ANNUAL}.`}
        style={{ overflow: "visible" }}
      >
        {/* gridlines + y axis */}
        {ticks.map((t) => (
          <g key={t}>
            <line x1={padL} y1={y(t)} x2={W - padR} y2={y(t)} stroke={GRID} strokeWidth={1} />
            <text x={padL - 10} y={y(t) + 4} textAnchor="end" fontSize="11" fill={INK} fillOpacity={0.45}>
              ${t}
            </text>
          </g>
        ))}

        {/* x axis */}
        {Array.from({ length: 12 }, (_, m) => m).map((m) => (
          <text key={m} x={x(m)} y={H - padB + 20} textAnchor="middle" fontSize="11" fill={INK} fillOpacity={0.45}>
            {m + 1}
          </text>
        ))}
        <text x={(padL + W - padR) / 2} y={H - 6} textAnchor="middle" fontSize="11" fill={INK} fillOpacity={0.4}>
          month of the policy year
        </text>

        {/* series */}
        <path d={path(cumulativeAsEarned)} fill="none" stroke={INDIGO} strokeWidth={2} strokeLinejoin="round" />
        <path d={path(cumulativeAdvance)} fill="none" stroke={GOLD} strokeWidth={2} strokeLinejoin="round" />

        {cumulativeAsEarned.map((v, m) => (
          <circle key={`e${m}`} cx={x(m)} cy={y(v)} r={4} fill={INDIGO} stroke="#fff" strokeWidth={2}>
            <title>{`Month ${m + 1} — as-earned: $${v.toFixed(0)} paid to date`}</title>
          </circle>
        ))}
        {cumulativeAdvance.map((v, m) => (
          <circle key={`a${m}`} cx={x(m)} cy={y(v)} r={4} fill={GOLD} stroke="#fff" strokeWidth={2}>
            <title>{`Month ${m + 1} — advanced: $${v.toFixed(0)} paid to date`}</title>
          </circle>
        ))}

        {/* selective direct labels — the two points that carry the story */}
        <text x={x(0) + 10} y={y(cumulativeAdvance[0]) - 10} fontSize="12" fontWeight="600" fill={INK} fillOpacity={0.85}>
          ${cumulativeAdvance[0].toFixed(0)} in month 1
        </text>
        <text x={x(11)} y={y(ANNUAL) - 12} textAnchor="end" fontSize="12" fontWeight="600" fill={INK} fillOpacity={0.85}>
          both land at ${ANNUAL}
        </text>
      </svg>

      <p className="text-[#0F172A]/55 text-sm leading-relaxed mt-5">
        An advance is not extra money — it&rsquo;s the same commission, sooner. Which is why the platform also tracks the
        other side of it: if a policy lapses early, the unearned portion is clawed back, and you can see that exposure
        before it lands instead of reading about it on a statement.
      </p>
    </Figure>
  );
}
