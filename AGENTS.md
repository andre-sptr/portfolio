# Portfolio (`andre-gravity-portfolio`)

## Architecture & Runtime
- Next.js static export site for `https://andresptr.site`.
- Static build outputs to `out/` and is served via OpenResty from `/opt/1panel/apps/openresty/openresty/www/sites/andresptr.site/index`.

## Verification Commands
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- Test: `npm test`
- Build: `npm run build`

## Guardrails
- Verify static export output in `out/` before deploying to `/opt/1panel/apps/openresty/openresty/www/sites/andresptr.site/index`.
- Never commit `.env` or secret values.
