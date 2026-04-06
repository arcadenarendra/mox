PR Proposal: Remove membership pricing and add pages scaffolds

Summary of changes (2026-04-06):

- Removed `src/app/pages/Membership.tsx` and its `/membership` route from `src/app/routes.tsx`.
- Created scaffolds: `src/app/pages/Clubs.tsx`, `src/app/pages/Programmes.tsx`, `src/app/pages/XForum.tsx`.
- Updated `src/app/routes.tsx` to register `/clubs`, `/programmes`, `/xforum` routes.
- Updated `src/app/components/Header.tsx` and `src/app/components/Footer.tsx` were previously updated to include the new links (verify in codebase).
- Hid visible pricing and currency displays in `src/app/pages/Payment.tsx` while preserving numeric `amount` handling for backend payment flows.

Files changed:
- src/app/pages/Clubs.tsx (new)
- src/app/pages/Programmes.tsx (new)
- src/app/pages/XForum.tsx (new)
- src/app/pages/Membership.tsx (deleted)
- src/app/pages/Payment.tsx (edited)
- src/app/routes.tsx (edited)
- docs/implementation_plan.md (edited)

Suggested commit message:

"feat(site): remove membership page, hide pricing UI, add Clubs/Programmes/XForum scaffolds"

Suggested git commands:

```bash
git checkout -b feat/remove-membership-and-add-scaffolds
git add src/app/pages/Clubs.tsx src/app/pages/Programmes.tsx src/app/pages/XForum.tsx src/app/pages/Payment.tsx src/app/routes.tsx docs/implementation_plan.md
# If the membership file was deleted via git, include it in the index
# git rm src/app/pages/Membership.tsx (if not already staged)

git commit -m "feat(site): remove membership page, hide pricing UI, add Clubs/Programmes/XForum scaffolds"
git push -u origin feat/remove-membership-and-add-scaffolds
```

Notes / Next steps:
- Decide whether to fully remove the `Payment` flow or keep backend enforcement for pricing.
- Populate the new pages with the full content from the implementation plan.
- Run `npm run dev` and manually verify navigation and payment behaviour.
