---
slug: day-10
title: "#10 Lazy-load is not great"
typeId: blog
parentId: i-ching
createdAt: 2020-12-23
excerpt: I've just discovered that lazy loading components is not that great for this kind of apps.
termsMap:
  category:
    - dev-log
---

## Lazy load

I've just discovered that lazy loading components is not that great for this kind of apps. The app has _tabs_ as main router, and when you click on another tab, it **lazy loads** that page.

That behavior is completely weird (you don't expect that in mobile apps!), not sure why that's the recommended way of doing /shrug (TODO: Add a plugin that replaces _/shrug_ with a real one :>)

## Final tweaks

I'm doing some final tweaks (code style and such), and I might even test some _cypress_ tests.
I've also noticed that it takes some time to load the _Journal_, so maybe there is something I can do to make it faster. I think the problem that is that it's calculating the hexagram figure from the hexagram number for **EVERY SAVED ITEM**, which is probably not great (O(n<sup>2</sup>))