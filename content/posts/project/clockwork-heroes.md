---
slug: clockwork-heroes
title: Clockwork Heroes
excerpt: A game for programmers!
featuredImageId: project/clockwork-heroes/logo
galleryImageIds:
  - project/clockwork-heroes/screenshot
termsMap:
  development-area:
    - game
    - web
  language:
    - javascript
  technology:
    - websockets
extra:
  progress: 10
  status: abandoned
  startDate: 2015-06-01
  endDate: 2015-09-01
  repository: https://bitbucket.org/josec89/royale/src/master/client/asset/img/cwh_logo.png
---

This was project that was initiated by my brother [Alejandro Cámara](http://acamara.es/), and I joined to help with some [](web) technologies. The idea was to create an `AI` that could be programmed by the player. The goal of this `AI` was to navigate a _maze_ that was generated procedurally.

* My brother built the **core** of the project. It was built in [](c++), and was responsible generating the _mazes_ and parsing the `Lua` code from the player which would guide the `AI` through the map.
* I was responsible for building the [](web) infrastructure so it was possible to visualize how the `AI` (the dot) was moving through the map. It consisted of a backend that had a `socket` connection with the [](c++) program and `websocket` connection with the active users.

This was a very interesting project, but it has some design flaws. I would like to give it a try somewhere in the future (if I ever have time for that...)
