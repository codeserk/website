---
slug: press
title: Press
excerpt: CMS used to build this and other public websites.
termsMap:
  development-area:
    - web
  database:
    - mysql
    - redis
  language:
    - typescript
  technology:
    - wordpress
    - graphql
extra:
  progress: 50
  status: wip
  startDate: 2020-05-01
---

`Press` is the core library used for to make this website happen. The library reads from different sources ([](wordpress) or filesystem for now) and serves a [](graphql) server to get all the content. It also provides some tools to transform the media (resize, optimize, etc.).

It's built using some `design patterns` that allow additions of new sources in the future. It's private for now, but I want to get to a more stable phase and make it public.