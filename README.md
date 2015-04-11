metalsmith-gravatar
====

[![Build Status](https://travis-ci.org/stevenschobert/metalsmith-gravatar.svg?branch=master)](https://travis-ci.org/stevenschobert/metalsmith-gravatar)
[![Dependency Status](https://gemnasium.com/stevenschobert/metalsmith-gravatar.svg)](https://gemnasium.com/stevenschobert/metalsmith-gravatar)

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

Nested objects map directly into the outputted `gravatar` object, so you can access them by the same
names:

```html
<img src="{{gravatar.authors.stevenschobert}}" />
```

## Global Options

If you want more control over how the Gravatar URLs are generated, you can specify an `options`
object. If the plugin sees this `options` object, it will expect the avatars you wish to convert to
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

## Individual Avatar Options

Options can also be given for individual avatars. Any options given for an individual
avatar will override the global version of the same setting. In order to add options
for an individual avatar, set the avatar property to an `object` with an `email`
property:

```json
{
  "plugins": {
    "metalsmith-gravatar": {
      "stevenschobert": {
        "email": "spschobert@gmail.com"
      }
    }
  }
}
```

## Valid Options

### protocol (global only)

`String` - `'http' (default)` or `'https'`

Sets the URL prefix for Gravatar images. Useful if you are serving a page via SSL and want to also
load the external images via SSL.

### querystring (global or individual)

`String` or `Object`

Adds a query string to all Gravatar URLs to all for modifications to the requested image, including
image size, default image, and max rating (g, pg, r, x). The query string parameters are detailed
on [Gravatar's website](https://en.gravatar.com/site/implement/images/). Here is the string version:

```json
{
  "plugins": {
    "metalsmith-gravatar": {
      "options": {
        "querystring": "s=200&r=pg"
      },
      "avatars": {
        "stevenschobert": "spschobert@gmail.com",
        "roadrunner": {
          "email": "roadrunnermeepmeep@gmail.com",
           "querystring": "s=400&r=g"
        },
        "authors": { ... }
      }
    }
  }
}
```

Here is the object version:

```json
{
  "plugins": {
    "metalsmith-gravatar": {
      "options": {
        "querystring": {
          "s": 200,
          "r": "pg"
        }
      },
      "avatars": {
        "stevenschobert": "spschobert@gmail.com",
        "roadrunner": {
          "email": "roadrunnermeepmeep@gmail.com",
           "querystring": {
             "s": 400,
             "r": "g"
           }
        },
        "authors": { ... }
      }
    }
  }
}
```

## Credits

Thanks to [Segment.io](http://github.com/segmentio) for creating and open-sourcing
[Metalsmith](https://github.com/segmentio/metalsmith)!
