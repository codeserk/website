---
slug: meeting-point
title: Meeting Point
excerpt: Web app to connect people that are close to you.
featuredImageId: project/meeting-point/screenshot
termsMap:
  development-area:
    - web
    - android
  database:
    - mongodb
  framework:
    - angular-1
  language:
    - java
    - javascript
  technology:
    - websockets
    - scss
    - phonegap
extra:
  progress: 50
  status: deprecated
  startDate: 2015-01-01
  endDate: 2015-06-01
  repository: https://bitbucket.org/josec89/meetingpoint-node/src/master/
---

This was an app I _tried_ to develop during my 6 months as [freelance](/career/2015-freelance).

In this app you would be able to share your thoughts with the people nearby. I used [](sailsjs) as main Framework for the Backend, using [](mongodb) for persistence and [](redis) for cache. The first approach was to develop a single web Frontend using [](angular-1), and make that work in mobile devices using [](phonegap). But oh boy, if that was buggy:

* The application was highly dependant on [](websockets), and that didn't work very well with embedded web apps.
* I put a lot of efforts to make the website `responsive`, but the UX was not great, you could easily tell that it was just a website pretending to be an app.

Having that in mind, I decided to start implementing a native [](android) app, which was fun to learn, but also a big stone in the path.

This project was a **big failure** for many reasons, but I'm happy of all the things I could learn during this time :) Besides, I was able to present all the work I had done in this project during my interview for a position at [Square 1](/career/square-1) (which showed that I had some experience in [](web)), so it was helpful after all!