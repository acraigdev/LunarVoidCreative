# LunarVoidCreative

A Next.js app built to help keep track of various aspects of life including craft projects, medications, book collections and more.

## Getting Started

First, run the development server:

```bash
# Create service worker if needed
npm run build-service-worker
# then
npm run dev
```

## Technology Used

- next.js
- react + react-query
- firebase app hosting
- firestore
- sqlite

## Debugging

### `This site can't be reached` on localhost

- Check logs in devtools - more often than not, it's the service worker that needs to be regenerated
- Delete `.next` folder

### Commits take forever

Husky runs a precommit hook to ensure type and lint safety

## Tech debt TODO

- constraint in create - limit label length etc
- next lint has more than inline VSC and need to figure that out
- look into GCP env variables
