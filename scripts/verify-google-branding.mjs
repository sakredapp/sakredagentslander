#!/usr/bin/env node
/**
 * Build guard for the Google OAuth branding requirements.
 *
 * Why this exists
 * ---------------
 * This site is a client-rendered SPA. The HTML actually served is a shell, and
 * everything a visitor reads is painted by React after load. Google's branding
 * reviewer (and any crawler that does not execute JavaScript) sees ONLY the
 * shell. That is why client/index.html carries a static description of the app
 * inside <div id="root">, which createRoot() replaces on mount.
 *
 * That block is invisible in a browser, so it is exactly the kind of thing a
 * later "tidy up index.html" commit deletes without anyone noticing. The site
 * would keep looking perfect while Google silently sees an empty page again and
 * the verification gets rejected a second time.
 *
 * So: fail the build instead. Vercel runs `npm run build`, npm runs `postbuild`
 * after it, and a non-zero exit here blocks the deploy.
 *
 * Requirements enforced (support.google.com/cloud/answer/13807376):
 *   - the home page must fully describe the app's functionality
 *   - it must explain the purpose for which the app requests user data
 *   - it must link to the privacy policy
 * all of which must be true WITHOUT JavaScript.
 *
 * If a check here is genuinely obsolete, delete the check deliberately and say
 * why in the commit. Do not delete the file to make a build go green.
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const file = resolve(root, "dist/index.html");

let html;
try {
  html = readFileSync(file, "utf8");
} catch {
  console.error(`\n  ✗ google-branding: cannot read ${file}. Did the build run?\n`);
  process.exit(1);
}

// What a no-JS client actually gets: strip scripts and comments, then tags.
const noJsText = html
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const checks = [
  {
    name: "app is described as a CRM, without JS",
    pass: /customer relationship management/i.test(noJsText),
    fix: "Restore the static <main> block inside <div id=\"root\"> in client/index.html.",
  },
  {
    name: "the description says what the app DOES",
    // Google rejects vague marketing copy; these are the concrete functions.
    pass: ["client", "appointment", "commission", "pipeline"].every((w) => new RegExp(w, "i").test(noJsText)),
    fix: "The no-JS description must enumerate real functions (clients, pipeline, appointments, commissions).",
  },
  {
    name: "the Google-data purpose is explained",
    pass: /Google Calendar/i.test(noJsText) && /Limited Use/i.test(noJsText),
    fix: "Keep the 'Why the app asks for Google access' paragraph and the Limited Use sentence.",
  },
  {
    name: "privacy policy is linked from the home page",
    pass: /href="\/privacy"/.test(html),
    fix: "The no-JS block must link /privacy — it must match the OAuth consent screen.",
  },
  {
    name: "no-JS content is substantial (>800 chars)",
    pass: noJsText.length > 800,
    fix: `Only ${noJsText.length} chars render without JS; a near-empty shell reads as "does not explain the purpose".`,
  },
  {
    name: "<title> and meta description identify the app",
    pass: /<title>[^<]*CRM/i.test(html) && /name="description"[^>]*CRM/i.test(html),
    fix: "Title and meta description should name the app as a CRM, not only as a sales opportunity.",
  },
];

const failed = checks.filter((c) => !c.pass);

if (failed.length) {
  console.error("\n  ✗ Google OAuth branding checks FAILED — not deploying.\n");
  for (const c of failed) console.error(`    · ${c.name}\n      → ${c.fix}\n`);
  console.error("  Background: docs at support.google.com/cloud/answer/13807376\n");
  process.exit(1);
}

console.log(`  ✓ Google OAuth branding: ${checks.length} checks passed (${noJsText.length} chars render without JS)`);
