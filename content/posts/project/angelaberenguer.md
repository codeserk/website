---
slug: angelaberenguer
title: AJ+B
excerpt: Angela Berenguer's brand portfolio.
featuredImageId: project/angelaberenguer/logo
galleryImageIds:
  - project/angelaberenguer/screenshot-1
  - project/angelaberenguer/screenshot-2
  - project/angelaberenguer/screenshot-3
termsMap:
  development-area:
    - web
  database:
    - mysql
    - redis
  framework:
    - vue
    - nuxt
  language:
    - javascript
    - php
  technology:
    - wordpress
    - firebase
    - scss
extra:
  progress: 100
  status: completed
  order: 8
  website: https://www.angelaberenguer.es
  startDate: 2016-05-17
  endDate: 2016-11-01
---

Angela Berenguer's brand portfolio. This public website uses a library that I built in [](php) which is very similar to [Press](/project/web/press).

The library reads all the content from a [](wordpress) instance and provides all scaffolding to build a public website. It uses [Corcel library](https://github.com/corcel/corcel) behind the scene. The final application is built in [](laravel).

The main _problem_ of this implementation is that it requires a _live app_ (apart from the _CMS_) running in order to make this work. In the new implementation (using [Pres](/project/web/press)), I make use of `SSG` so it's possible to serve just static content.