# bundl-wrap

*Wrap your bundles with a string or template*

*Runs with the amazing [Bundl](https://github.com/seebigs/bundl) build tool and [Easybars](https://github.com/seebigs/easybars) templating*

## Install

```
$ npm install --save-dev bundl-wrap
```

## Use

```js
var Bundl = require('bundl');
var wrap = require('bundl-wrap');

var options = {
    before: '(function(){',
    after: ')();'
};

new Bundl(targets)
    .then(wrap(options))
    .then(write())
    .go();
```

## Options

### before
Text to come before your content (can use template values)

### after
Text to come after your content (can use template values)

### data
The data object that will be available to your templates

*Note: "{{___}}" (triple underscore) is a magic value that is always available to your templates, even when no data is passed. It represents the full original contents.*

### file
A file path to find a template to pass content through

## Example
```js
var options = {
    data: {
        name: 'Juliet',
        location: 'window',
        direction: 'East',
        exclamation: 'soft'
    },
    before: 'But {{exclamation}}, ',
    after: ', and {{name}} is the sun.',
    file: '../my_template.txt'
};
```
my_template.txt
```
what light through yonder {{location}} breaks?
{{ ___ }}
It is the {{direction}}
```
Output:
```
But soft, what light through yonder window breaks?
ORIGINAL CONTENT
It is the East, and Juliet is the sun.
```
