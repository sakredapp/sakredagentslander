// Where an agent signs in.
//
// ONE constant, because this URL is about to be in an email to every agent we
// have and it has to be the same string in the nav, the hero, the footer and
// the no-JS block. It was three different hand-typed hrefs pointing at
// www.sakredcrm.com, which is the OLD host.
//
// `app.sakredagents.com` — NOT the apex. The apex (this site) is the recruiting
// lander; it has no login screen and never should. `app.` is the CRM's own host
// in the platform's tool-host map (shared/tool-host.ts in crmbuilds: the `crm`
// tool's label is `app`), so this is the front door of the product itself.
//
// `/login` and not `/`, deliberately. The point of the link we send agents is
// that it LANDS ON THE LOGIN SCREEN — a domain-change email whose link drops
// somebody on a marketing page, or on a dashboard that bounces them, is the
// thing we are fixing. Signed-in users are redirected off /login to their home
// by the app, so the deep link costs an already-authenticated agent nothing.
//
// www.sakredcrm.com still works and is not going away: it is the live apex, it
// is the registered redirect URI with seventeen OAuth providers, and it is what
// the shipped native binaries claim for deep links. This is the address we
// PUBLISH from now on, not a cutover.
export const SIGN_IN_URL = "https://app.sakredagents.com/login";
