# CMS setup for nihalhasain.online

This package keeps the existing portfolio HTML/CSS and adds Decap CMS at `/admin/`. Content is stored in `content/portfolio.json`; the frontend bridge reads it and updates the existing sections while retaining their styling.

## Before deploying
1. Upload/commit all package files to `main` in `https://github.com/nihalhsn/nihal.online` (do not upload the ZIP as the only file). Keep all original image, CSS, PDF, and HTML assets at their relative paths.
2. In Netlify, keep the existing site linked to this repo, production branch `main`, publish directory `.` and no build command.
3. **Authentication is not configured by this package alone.** Decap's GitHub backend requires an OAuth service. Do not put a GitHub personal access token in `admin/config.yml` or browser code. Configure a trusted OAuth provider/proxy for Decap CMS, then follow that provider's callback URL instructions. The old Netlify Identity/Git Gateway approach should not be assumed available for new sites.
4. Test `/admin/` only after the OAuth service is configured. Login should be restricted to your GitHub account/repository access.
5. Edit content, save/publish, wait for the Netlify deployment to finish, then hard-refresh the public site.

## Editable fields and current renderer limits
The CMS offers list editing for education, skills, tools, certifications and projects. The current portfolio renderer updates text/items in the existing design slots. For education, skill groups, tool groups, certifications, or projects, the live design has a fixed number of cards/groups; entries beyond the existing slots are saved in JSON but are not automatically rendered as additional cards yet. Deleting/reordering within available slots works; full dynamic add/remove card rendering requires a second template-rendering integration. The existing HTML remains a fallback if the JSON fetch fails.

## Important
- This is a prepared integration package, not a live deployment. I cannot push to your GitHub or change Netlify settings from this chat.
- No `nihal/nihal` password is embedded. Use OAuth and repository permissions.
- Test in a preview deploy before relying on it in production.
