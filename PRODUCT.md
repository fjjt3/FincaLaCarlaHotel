# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are prospective guests browsing from any device and reserving a
room online: a person planning a leisure stay at a small Andalusian hotel who
wants to check room types, prices, and availability and complete a booking with
minimal friction. No other audience (staff, admin, owners) is in scope today.

## Product Purpose

A guest-facing booking site for a fictional small hotel, **Finca La Carla**, in
Antequera, Málaga. It presents the property and its rooms and lets a guest submit
a reservation (name, email, room type, check-in/check-out). Success means a guest
can understand the offer and complete a reservation without confusion, and the
surface itself reads as finished, portfolio-grade craft.

This is a **demo / portfolio build**, not an operating business: the site exists
to demonstrate full-stack craft (Angular frontend + Spring Boot API), not to take
real bookings.

## Positioning

A complete, distraction-free direct-booking experience for a single small rural
hotel — inspiration and room discovery flowing straight into a reservation, with
a warm Andalusian identity rather than a generic OTA or SaaS booking widget.

## Operating Context

- Guests arrive from a landing page (property story, room cards with nightly
  prices), then move to a reservation form, optionally deep-linked with a
  pre-selected room (`/reserve?room=DOUBLE`).
- Three room types are offered: Single (€75/night), Double (€120/night), Suite
  (€200/night). Prices are hardcoded in the UI, not sourced from the API.
- Booking rules enforced by the backend: check-out after check-in; no overlapping
  ACTIVE reservations per room type; cancellation is a soft delete.
- The reservation form shows a live price summary (nights × nightly rate) as the
  guest picks dates.

## Capabilities and Constraints

- **Current capabilities:** property landing page, room showcase, reservation
  creation, and reservation listing via the REST API. Guest-facing only — there
  is no admin/management UI.
- **Stack (existing, fixed):** Angular 18 standalone components + Bootstrap 5.3
  on the frontend; Spring Boot 3.2 / Java 21 / H2 in-memory on the backend.
- **Data is ephemeral:** the H2 database is in-memory and resets on restart with
  5 sample reservations. No real persistence.
- **Undecided:** whether staff/admin tooling, real payments, real availability
  calendars, or production persistence will ever be added.

## Brand Commitments

- **Name:** Finca La Carla.
- **Location:** Antequera, Málaga, Spain (Andalusia).
- **Voice:** warm, calm, welcoming; bilingual touches (Spanish section eyebrows
  such as "Bienvenidos", "Estancias", "Dónde estamos") over English body copy.
- **Identity in use:** Andalusian/Mediterranean palette (terracotta, olive,
  Mediterranean blue, sun yellow, whitewash, dark oak); Playfair Display for
  display type, Inter for body; a recurring diamond "andalusian divider" motif.

## Evidence on Hand

- **Placeholder content — do not present as real.** Contact details
  (`+34 952 000 000`, `info@fincalacarla.com`, "Camino Rural s/n"), sample
  reservations, and all imagery are placeholders. Room and hero images
  (`/hotel-hero.png`, `/room-single.png`, `/room-double.png`, `/room-suite.png`)
  are stand-ins; cards fall back to CSS gradients when images are absent.
- **No real evidence:** no real testimonials, reviews, ratings, press, awards, or
  verified amenities exist. Future work must not fabricate them or imply the
  hotel is a real, bookable business.

## Product Principles

1. **Discovery flows into booking.** The path from property story to confirmed
   reservation stays short, obvious, and uninterrupted.
2. **Warmth over commerce.** The Andalusian identity and calm tone carry through
   the booking flow; it should feel like a small hotel, never a transaction engine.
3. **Honest as a demo.** Never manufacture real-world proof (reviews, awards,
   availability guarantees); placeholder content stays clearly placeholder.
4. **Craft is the deliverable.** As a portfolio build, visual and interaction
   quality is itself the point, not an afterthought.

## Accessibility & Inclusion

Standards already reflected in the codebase: semantic landmarks, `aria-label`s on
regions and controls, a skip link, visible `:focus-visible` outlines, and
`aria-live` regions for form feedback. Future work preserves this floor.
