---
# ─────────────────────────────────────────────────────────────────────────
# TEMPLATE CASE — exercises every feature of the case page.
# Copy this file to content/cases/<your-slug>.md and replace the content.
# The filename (minus .md) becomes the URL: /work/example-template
# Media here is borrowed from the Gustavo Gusto case purely for the demo.
# ─────────────────────────────────────────────────────────────────────────
title: Example Case
client: Template Studio
aspect: "3-2" # homepage card shape: 9-16 | 3-4 | 1-1 | 3-2
featured: true # show on the homepage work grid (when not a draft)
draft: true # draft: hidden from homepage & related, still previewable by URL
order: 2 # homepage sort (lower = earlier)
competencies: # keys from src/constants/competencies.ts
  - art-direction
  - ui
  - ux
  - motion
  - illustration
  - branding
cover: /work/gustavo-gusto/cover.mp4 # .mp4/.webm/.mov/.ogg => video cover, else image
intro: >-
  This is the intro paragraph that sits beside the title and client. Use it for
  a one- or two-sentence framing of the project — what it was, who it was for,
  and why it mattered.
liveLink: https://example.com
liveLinkLabel: Visit the site
metrics: # optional big-number row near the top
  - value: "2M+"
    label: Video views
  - value: "+38%"
    label: Brand lift
  - value: "4"
    label: Markets
---

## A single hero video

Open with one full-width video to set the tone. A section is just an `##`
heading followed by some text and any number of media embeds. The text on the
left stays sticky while the media scrolls on the right.

![](/work/gustavo-gusto/music-video.mp4)

## Two images side by side

Stack as many images or videos as you like under one heading — they render one
per row at their natural aspect ratio. Always add alt text for accessibility.

![Pizza box packaging](/work/gustavo-gusto/pizza-box.webp)
![Augmented-reality carton](/work/gustavo-gusto/ar-carton.webp)

> A pull quote drops in between sections to break up the rhythm and let someone
> else tell part of the story.
> — Jane Doe, Creative Director

## Mixed media in one section

You can freely mix video and images in a single section's gallery — the file
extension decides how each one renders.

![](/work/gustavo-gusto/music-video-square.mp4)
![Plated margherita](/work/gustavo-gusto/margherita.webp)
![](/work/gustavo-gusto/carton-falls.mp4)

## A closing still

End on a strong image. Below this, the page automatically shows related cases,
the contact section, and the footer.

![Final photography](/work/gustavo-gusto/foto.webp)
