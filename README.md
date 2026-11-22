# ALMAS Restaurant ordering website

A responsive multi-page React + Tailwind website with menu detail routes, persistent cart, customer checkout, English/Dari/German interface, light/dark theme, and a WhatsApp order-message flow.

## Run locally

1. Install Node.js 18 or newer.
2. Open a terminal in this folder and install the dependencies listed in `package.json`.
3. Run `npm run dev` and open the local address shown in the terminal.
4. Check a production bundle with `npm run build`.

## Required owner setup before orders can be sent

Edit `src/data/config.js`:
- The confirmed WhatsApp number is configured in this project. Update it there if it changes.
- Set delivery availability, pickup availability and the delivery fee only after the restaurant confirms them.
- Keep `deliveryFee` as `null` if it is not confirmed; the message will state that the fee is to be confirmed and the displayed total excludes it.

The phone contact and confirmed WhatsApp number are configured separately. The email is set to the exact address supplied. Pickup is enabled; delivery is disabled until confirmed. The checkout does not claim that an order is accepted: the customer must send the WhatsApp message and wait for the restaurant's reply.

## Content notes

The 64 menu items and prices remain in `src/data/menu.js`; update that file to change menu content. Menu names and printed ingredient descriptions remain in their original wording. Some low-resolution print details still need owner confirmation. The bundled WebP photos are illustrative concepts, not actual ALMAS restaurant photography. Opening hours, social links and delivery terms remain hidden or disabled until owner-approved values are available.

When deploying, configure the host to serve `index.html` for the React routes (SPA fallback), otherwise direct refreshes on paths such as `/menu/pizza-margherita` may return a host 404.
