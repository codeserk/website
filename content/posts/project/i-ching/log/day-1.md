---
slug: day-1
title: "#1 Native? React native? Vue native? Ionic!"
typeId: blog
parentId: i-ching
featuredImageId: framework/ionic
excerpt: I've spent the whole day researching what's the best technology to achieve this.
createdAt: 2020-12-14
termsMap:
  category:
    - dev-log
---

I've spent the whole day researching what's the best technology to achieve this. This is meant to be a _very simple_ app, so we don't need the full power of Native apps, but... maybe it's easy to built those for any platform too?

## Native app

I've been checking [](kotlin) stuff to share some code (business logic). But still, you need to create two apps ([](ios) and [](android)) and you won't get any [](web) result! I'll check this further later, but that's not a good match for this project!

## React Native

This looked quite promising (despite the fact that it was React - which I don't like that much). I created a sample project, but I realised soon enough that this was still a bit _overkill_: This library relies on the _native components_ that they provide, but they are quite limited (at least coming from [](web) environment). I might check this later, but for not it was a **no**.

## Vue Native

Well, I really like [](vue), but this shares the same problems discovered with `React Native`, so I discarded this too.

## **Ionic**

I heard about [](ionic) in the past, but I had never tested it. It looks _good enough_ for this project (although I still have some doubts!).

I've created a sample project and it seems to do the trick, and I can make the app using [](vue), which is a **big plus**. I'll do more tests _tomorrow_.