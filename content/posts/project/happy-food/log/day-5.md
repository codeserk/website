---
slug: day-5
title: "#5 Moving away from vuex"
typeId: blog
parentId: happy-food
createdAt: 2020-12-30
excerpt: Now that I'm using the composition API, I feel Vuex is no longer necessary.
termsMap:
  category:
    - dev-log
---

Now that I'm using the composition API, I feel `Vuex` is no longer necessary, the same can be achieved extracting logic to different modules. Actually, I'm trying to reproduce a similar structure I use in my [](nestjs) projects.

It works, _sort of_, although `IoC` is missing in this architecture, and I'm coupling components that should be separated:

* **Visual components**: I have my _visual components_ that only care about visual stuff, and might have some small `state` (to take care of the active tab or such visual
stuff). This layer takes functionality from the next layer (as described in the guides about _composition API_).
* **Shared setups** I have created a new entity that I called `<module>.setup.ts`, which contains the `use` function (similar to `useStore()`). This returns some _mmethods_, _getters_ and sometimes even some _state_. This layer uses _yet another_ layer that handles data.
* **Data layer**: There is another abstraction layer that is used to take care of data (`SurveyRepository` and `ConfigRepository`). These two interfaces have implementations that uses `localStorage` ([](ionic)'s `Storage` actually, but it's pretty much `localStorage`).

But this approach has 2 problems that I can see so far:

## First problem
There is no way to use whatever I need from the _2nd layer_ in any other layer. It's only usable within _visual components_. This very same problem happens with `useStore()`: I noticed I wasn't able to get values from the store in hook from `vue-router`. This is a small project, but it wouldn't be crazy that a certain functionality in an entity of the 2nd layer needed some other stuff from another entity that's also in the 2nd layer.

### Conclusion
I think I need another layer, that 2nd layer looks more like a _Controller_, and I'm missing the _Service_ layer.

## Second problem
I have this kind of code:

```ts
// src/module/config/repositories/local.repository.ts

/**
 * Repository to handle saved configuration.
 */
export interface ConfigRepository {
  /**
   * Gets the saved configuration.
   */
  get(): Promise<Config>

  /**
   * Updates the saved configuration.
   *
   * @param config
   */
  update(config: Config): Promise<Config>
}
```

```ts
// src/module/config/config.repository.ts

/**
 * Uses `capacitor`'s Storage.
 */
export class ConfigLocalRepository implements ConfigRepository {
  /** @inheritdoc */
  async get(): Promise<Config> {
    return this.getFromStore<Config>('config', CONFIG_DEFAULTS)
  }

  /** @inheritdoc */
  async update(config: Config): Promise<Config> {
    await Storage.set({ key: 'config', value: JSON.stringify(config) })

    return config
  }

  /**
   * Tries to get a key from the storage, defaults to the given value.
   *
   * @TODO improve logging :eyes:
   *
   * @param key
   * @param defaultValue
   */
  protected async getFromStore<T>(key: string, defaultValue: T): Promise<T> {
    try {
      const resultsJson = await Storage.get({ key })

      return (JSON.parse(resultsJson.value) as T) || defaultValue
    } catch (error) {
      console.error(error)
    }

    return defaultValue
  }
}
```

```ts
// In the 2nd layer, who uses the data layer.

const repository = new SurveyLocalRepository()
```

Is this bad? well, a bit. I shouldn't be creating the exact type of repository by myself in the place I'm using it! _SOLID_ gods might be crying now.

### Conclusion

I need some _DI_ solution. I've tested `typedi` in the past (for the backend)  and it did the trick, it's probably working here too :)