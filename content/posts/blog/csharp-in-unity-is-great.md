---
slug: cshap-in-unity-is-great
title: C# in Unity is great (finally!)
featuredImageId: framework_unity-logo
termsMap:
  development-area:
    - game
  language:
    - csharp
  framework:
    - unity

---

<div class="flex">
  <div class="flex-1">
    <RouterLink class="text-center" to="/project/game/callet"><img src="callet_icon" /></RouterLink>
  </div>
  <div class="flex-1">
    <RouterLink class="text-center" to="/project/game/ivy"><img src="ivy_icon" /></RouterLink>
  </div>
</div>

I'm revamping some of the games I made using Unity in the past (some jam games, and the games I made when I was _working as freelance_).


I remember I struggled a lot when I had to create _async_ mechanisms, like making a call to an API. That was **AWFUL**, we had to use `IEnumerable` and do some very weird stuff. It was painful to compare that to other ways of doing _async_ communication  in other languages like `JS`.

But the suffering **is over**. With `Unity 5+` and `.NET 4.0` they have introduced `async` / `await` and many other features!

---

Work in progres...