---
slug: coosto
title: Coosto
featuredImageId: career/coosto
excerpt: I'm currently working for Coosto as Full-stack Developer, using many different technologies that coexist in a micro-services' environment. I'm usually the Joker card in my team, since I'm able to complete any kind task (Frontend, Backend or DevOps, even iOS sometimes).
termsMap:
    development-area:
        - web
        - ios
    language:
        - php
        - javascript
        - typescript
        - kotlin
        - swift
    framework:
        - nestjs
        - vue
    database:
        - mysql
        - mongodb
        - redis
        - elasticsearch
        - cassandra
    message-broker:
        - rabbitmq
        - kafka
    technology:
        - websockets
        - docker
        - kubernetes
        - jaeger
        - jenkins
        - sonarqube
extra:
    startDate: 2017-05-01
    position: Senior Full-Stack Engineer
    website: https://www.coosto.com/
    topTerms:
        - web
        - typescript
        - javascript
        - nestjs
        - vue
        - mysql
        - mongodb
        - rabbitmq
        - kafka
        - docker
        - kubernetes
---

I'm currently working for Coosto as Full-stack Developer, using many different technologies that coexist in a _micro-services' environment_. I'm usually the _Joker card_ in my team, since I'm able to complete any kind task (Frontend, Backend or DevOps, even [iOS](ios) sometimes).

The tech stack is quite diverse, but I'm mostly working with NodeJS in the Backend (using [NestJS](nestjs) as main framework) and [VueJS](vue) in the Frontend. The application is quite complex and it's composed by different smaller heterogeneous services, so [](docker) and [](kubernetes) are present in our daily work. We use a wide range of different databases:

* **[](mysql)**: As default _relational_ database, useful when we have a complex data structure with meaningful relations (and we want to query based on them).
* **[](mongodb)**: As default _no-sql_ database. Provides better scalability options and performance in some situations. It's also helpful when we don't know if the data schema is going to mutate a lot in the future. We discard it for the services where the entities have strong relationships and we want to query by them.
* **[](redis)**: Our main database to go for cache.
* **[](cassandra)**: Useful in some cases where we have more writes than reads,
* **[](elasticsearch)**: Great indexer, used in different places for different reasons. It's not a vital part in any of the systems that we manage in our team, so I haven't used this _that much_.

_Async communication_ plays an important role in our landscape, since our architecture consists on multiple micro-services. We use [](rabbitmq) and [](kafka) for our message communication.

* [](rabbitmq): Offers better routing capabilities, which is useful in some domains (to get only the messages you are interested in).
* [](kafka): This technology is relatively new in our ecosystem, but looks very promising. Scalability seems better, and offers _replay_ opportunities which is useful in some domains.

I have been working in Coosto for more than _3 years_, and I have passed through different phases:

## _Medior_ developer.

I started at Coosto as _medior full-stack developer_. My main focus in the team was to _burn points_ and learn the technologies they were using. It was a lot of fun and I worried **only** about the stories in the sprint. I was _just listening_ in most of the meetings (refinement, sprint planning, etc.), I was learning how things worked here.

## _Senior_ developer.

After some time, I started to get more and more involved in all the discussions, and I started to _show my opinion_. I had spent about 6 months _just learning_ how things worked, so I felt prepared to start contributing in something else than just _burning points_. This was quite challenging for me, since _soft skills_ were more important now than _coding skills_ and being involved in so many discussions was a bit new for me. I presented some of my ideas, like [](graphql), in what we call **Tech meeting** (a meeting were anyone can present new ideas/technologies). Besides, I started to work on a new vision for the company with some colleges, where we would share a set of packages (_an ecosystem_), instead of reinventing the wheel over and over.

## _Software architect_

My current role in the company is _software architect_ (apart from my normal role in the team as _full-stack developer_). In this role, we can discuss topics that has impact on multiple teams, and help them to make certain decisions (_what language fits best for this problem?_, _should we use [](kafka) or [](rabbitmq) here?_, etc.). I'm excited about this role, and now I want to extend it by providing a bit of visibility to all the cool things we do at Coosto (by creating posts in this website :>)