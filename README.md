<h1 align="center">Welcome to plinter 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/joaquimnet/plinter#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/joaquimnet/plinter/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/joaquimnet/plinter/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/joaquimnet/plinter" />
  </a>
  <a href="https://twitter.com/joaquimnet\_" target="_blank">
    <img alt="Twitter: joaquimnet\_" src="https://img.shields.io/twitter/follow/joaquimnet_.svg?style=social" />
  </a>
</p>

> A linter for your project.

### 🏠 [Homepage](https://github.com/joaquimnet/plinter#readme)

## Install

```sh
yarn install plinter
```

## Usage

```sh
plinter [pattern] [--options]
```

## Run tests

```sh
yarn test
```

## Config Example

```js
// plinter.config.js
module.exports = {
  rules: {
    'top-level-items': [
      'error',
      { items: ['CHANGELOG.md', 'README.md', 'src', '.editorconfig'] },
    ],
  },
  ignore: ['*.md'],
  pattern: ['**'],
};
```

## Plinter Rules

### 🔹 top-level-items

> Make some files and directories on the top level of your project required.

| Option | type       | description                                | required |
| ------ | ---------- | ------------------------------------------ | -------- |
| items  | `string[]` | The items that should be on the top level. | true     |

```js
'top-level-items': [ 'error', { items: ['src', 'config.json', '.env'] } ]
```

### 🔹 More rules TBD

## Author

👤 **Joaquim Neto**

- Website: joaquimnet.github.io
- Twitter: [@joaquimnet\_](https://twitter.com/joaquimnet_)
- Github: [@joaquimnet](https://github.com/joaquimnet)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Joaquim Neto](https://github.com/joaquimnet).<br />
This project is [MIT](https://github.com/joaquimnet/plinter/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
