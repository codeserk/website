---
slug: react
name: React
featuredImageId: framework/react
extra:
  order: 1
  status: adopted
  knowledge: 70
  knowledgeYears: 1 year
  summary: Recently adopted, works great when you only want to see TS in your code. Easy transition Vue -> React.
  kind: frontend
---

I have started using React in my projects, and I think right now is my preferred frontend framework (over [vue](vue), which was my preferred framework until now).
React's approach is way more direct, almost without any kind of _magic_ that makes _reactivity_ work behind the scenes. That ensures you can write simple easy-to-follow [typescript](typescript) code.

It has some drawbacks though, and it's also easier to make simple mistakes.
For instance, it's quite simple to create `computed` properties in your Vue components, and they _just work_. But in React you need to be explicit about which variables should be _cached_ (using `memo`), and what are the variables they depend on. This makes the learning curve a bit stepper, but **I really like the fact that there is no magic behind this behavior**: You create your memos, you decide which variables it depend on, everything is clear.

Another **big plus** for this technology is that learning React opens the doors to [React Native](react-native) which is just awesome :)

