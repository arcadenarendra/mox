# Website Content Update

Implement the massive content and structural update as per the "Website Content Guide" provided.

## Status Update (2026-04-06)

- **Navigation & Footer:** Completed — `src/app/components/Header.tsx` and `src/app/components/Footer.tsx` have been updated to include `Clubs`, `Programmes`, and `X-Forum`, and Footer now shows updated contact and quick links.
- **Routing:** Partially implemented — header/footer link to `/clubs`, `/programmes`, and `/xforum`, but `src/app/routes.tsx` has not been updated to add those routes. Visiting those links will return the current app `NotFound` route unless routes/pages are added.
- **Pages:** Core pages (`Home`, `About`, `Events`, `Calendar`, `Partnership`, `Contact`) exist under `src/app/pages/` but need content overhaul per the plan; new pages for `Clubs`, `Programmes`, and `X-Forum` are not present yet.
- **Membership:** `src/app/pages/Membership.tsx` and the `/membership` route still exist. Decide whether to delete the page and remove the route.

Next actions:
- Add routes for `/clubs`, `/programmes`, `/xforum` in `src/app/routes.tsx`.
- Create `src/app/pages/Clubs.tsx`, `src/app/pages/Programmes.tsx`, and `src/app/pages/XForum.tsx` with initial content scaffolds.
- Complete content updates for `Home`, `About`, `Events`, `Calendar`, `Partnership`, and `Contact` according to the guide.
- Confirm membership page removal and update routes accordingly.

Recent edits performed (2026-04-06):
- Removed `src/app/pages/Membership.tsx` and its `/membership` route.
- Added scaffolds: `src/app/pages/Clubs.tsx`, `src/app/pages/Programmes.tsx`, `src/app/pages/XForum.tsx` and wired routes in `src/app/routes.tsx`.
- Hid visible pricing/currency UI on `src/app/pages/Payment.tsx` (membership option labels no longer show price; amount label and submit button no longer display currency). Backend amount handling remains unchanged.

If you want pricing fully disabled (no payment flow), I can remove the `Payment` page and server-side payment endpoints next.


## User Review Required

Please review the proposed changes below. It involves overhauling all major pages and adding new ones according to your extensive guide. 

> [!WARNING]
> Since we are globally removing "Become a Member", any existing `/membership` page will become orphaned or removed from navigation. I will leave the file for now but remove all links to it. Let me know if you want it deleted entirely.
> I noticed you mentioned the `/events` page is throwing a 404. I'll make sure it's correctly linked and the content is overhauled. If it still 404s after this, it may be an issue with your hosting platform's routing settings catching hard refreshes.

## Proposed Changes

---

### Navigation & Footer
#### [MODIFY] src/app/components/Header.tsx
- Remove "Become a Member" from any menus.
- Add links for Clubs (`/clubs`), Programmes (`/programmes`), and X-Forum (`/xforum`) to the navigation array.

#### [MODIFY] src/app/components/Footer.tsx
- Add MoX tagline and real address (École Polytechnique, Route de Saclay...).
- Update email to `mox@polytechnique.fr`.
- Add real Instagram link and soon-to-be LinkedIn.
- Replace the link columns with a single "Quick Links" column containing: About MoX, Events, Clubs, Partnership, X-Forum, Contact, Map.
- Remove Membership links.

---

### Core Pages Letdown
#### [MODIFY] src/app/pages/Home.tsx
- Update Hero headline and subheader; remove 'Become a Member' CTA.
- Change 'Mission Statement' to "What is MoX?" with updated paragraph.
- Change 'Features' to "WHAT MOX DOES" with 4 specified cards (Represent, Organise, Support, Connect).
- Update 'Featured Events' with MX Bloom and Park Asterisk Trip.
- Modify CTA Banner to "Ready to Partner with MoX?" with correct buttons.

#### [MODIFY] src/app/pages/About.tsx
- Update Hero text.
- Overhaul "Our Story" section.
- Add a Key Stats section (300+, 40+, 10+, Top 10).
- Update Core Values (Excellence, Integrity, Innovation, Community).
- Update Leadership Team placeholder profiles with real roles (President, VP, etc.).
- Update Find Us section with correct Palaiseau address/email/map.

#### [MODIFY] src/app/pages/Events.tsx
- Update Hero text.
- Replace fallback event data with the 5 specific events (X Got Talent, MScT Gala, Bloom X Party, Company Cocktails, Outings).
- Add new section for "Weekly Activities".
- Remove 'Become a Member' button from the bottom CTA.

#### [MODIFY] src/app/pages/Calendar.tsx
- Update Hero text to match the guide.
- Set up a robust calendar skeleton showing sections for Events, Club events, Academic dates, and Partnerships.

#### [MODIFY] src/app/pages/Partnership.tsx
- Overhaul the Hero section.
- Add Key Stats Bar (350+, 40+, 10+, 2nd rank).
- Create "WHO ARE MX STUDENTS?" text section.
- Overhaul Partnership Tiers & "Non-cash Partnerships" info.
- Add "What We Offer" section (Workshops, Research Briefs, etc).
- Current Partners logos section.
- Update CTA to "Download Partnership Deck".

#### [MODIFY] src/app/pages/Contact.tsx
- Update Hero section text.
- Modify the form to include Subject Dropdown (Partnership Inquiry, Event Collaboration, Press/Media, General).
- Update physical address, email, and social links.

---

### New Pages & Routing
#### [NEW] src/app/pages/Clubs.tsx
- Create Clubs page with sections for PolitiX, MX Arts, MXter Chef, JeuX, etc.

#### [NEW] src/app/pages/Programmes.tsx
- Create Programmes page outlining ViCAI, DSAIB, STEEM, etc.

#### [NEW] src/app/pages/XForum.tsx
- Create X-Forum page showcasing the career forum details and MoX's role.

#### [MODIFY] src/app/routes.tsx
- Add routes for `/clubs`, `/programmes`, and `/xforum`.

## Open Questions

- You mentioned exporting calendar dates. For now, I'll set up the layout/structure so you can easily drop the events in later. Is that okay?
- Should I delete `src/app/pages/Membership.tsx` entirely, since MoX students are enrolled and don't join manually?
- For the `Partnership Deck`, I will use a dummy link (e.g. `href="/partnership-deck.pdf"`) until you upload the actual PDF.

## Verification Plan
### Automated Tests
- Build verification via `npm run build` or the dev server to ensure no broken routes.
### Manual Verification
- Visual check of all updated pages to ensure they match content specifications accurately without breaking layout.
