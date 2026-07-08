# QR Generator Webapp

Generate and share QR codes for restaurant menu selections using a fast, browser-based interface.

This project helps food businesses move from printed menus to a lightweight digital flow. Users can build item lists, generate QR payloads, and share those codes with staff for order handling.

## Why This Exists

Printed menus are hard to update and can slow down ordering. This app provides:
- Faster updates to menu-linked selections
- Simple QR sharing between users
- A consistent browser experience with local persistence

## Core Features

- Create QR codes from selected menu items
- Manage multiple item lists
- Keep list data in browser storage
- Share generated QR codes with other users
- Responsive web interface for menu browsing

## Current Limitations

- QR payloads are generated from client-side state only
- No backend sync or server-side menu source
- Shared codes do not auto-refresh if menu content changes later
- Data is tied to the browser/device unless exported or shared manually

## Tech Stack

- React Router + Vite
- TypeScript
- Local browser storage for persistence

## Local Development

1. Install dependencies:
pnpm install

2. Start development server:
pnpm dev

3. Run tests:
pnpm test

## Roadmap Ideas

- Server-backed menu source and versioning
- Auto-invalidating stale QR payloads
- User accounts and cross-device sync
- Export and import list backups

## Image Credits

Icons made by Smashicons from www.flaticon.com
