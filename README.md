metalsmith-gravatar
====

> A [Metalsmith](http://metalsmith.io) plugin for [Gravatar](http://gravatar.com).

This plugin converts email addresses into their associated Gravatar URLs and adds them to
Metalsmith's metadata object.

## Installation

```sh
npm install --save metalsmith-gravatar
```

## Getting Started

If you haven't checked out [Metalsmith](http://metalsmith.io/) before, head over to their website
and check out the documentation.

## CLI Usage

If you are using the command-line version of Metalsmith, you can install via npm, and then add the
`metalsmith-gravatar` key to your `metalsmith.json` file:

```json
{
  "plugins": {
    "metalsmith-gravatar": {
      "stevenschobert": "spschobert@gmail.com"
    }
  }
}
```

## JavaScript API

If you are using the JavaScript API for Metalsmith, then you can require the module and add it to your
`.use()` directives:

```js
var gravatar = require('metalsmith-gravatar');

metalsmith.use(gravatar({
  stevenschobert: "spschobert@gmail.com"
}));
```

## Output

This plugin will a new metadata property named `gravatar`. This object will contain all the
Gravatar URLs you can use in your templates:

```html
<img src="{{gravatar.stevenschobert}}" />
```

## Grouping Avatars

Both the CLI and the JavaScript APIs support nested objects. This allows you to group together
multiple avatars into named groups!

```json
{
  "plugins": {
    "metalsmith-gravatar": {
      "authors": {
        "stevenschobert": "spschobert@gmail.com",
        "malcolmreynolds": "mal@firef.ly"
      },
      "maintainers": {
        "core": { ... },
        "occasional": { ... }
      }
    }
  }
}
```

Nested objects map directly into the output'ed `gravatar` object, so you can access them by the same
names:

```html
<img src="{{gravatar.authors.stevenschobert}}" />
```

## Options

If you want more control over how the Gravatar URLs are generated, you can specify an `options`
object. If the plugin see's this `options` object, it will expect the avatars you wish to convert to
be in a new `avatars` object:

```json
{
  "plugins": {
    "metalsmith-gravatar": {
      "options": {
        "protocol": "https"
      },
      "avatars": {
        "stevenschobert": "spschobert@gmail.com",
        "authors": { ... }
      }
    }
  }
}
```

Below is a list of options that are supported:

### protocol

`(string)`: `'http'` (default) or `'https'`

Sets the URL prefix for Gravatar images. Useful if you are serving a page via SSL and want to also
load the external images via SSL.

## Credits

Thanks to [Segment.io](http://github.com/segmentio) for creating and open-sourcing
[Metalsmith](https://github.com/segmentio/metalsmith)!
