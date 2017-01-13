# bundl-wrap

*Wrap your bundles with a string or template*

*Runs with the amazing [Bundl](https://github.com/seebigs/bundl) build tool*

## Install

```
$ npm install --save-dev bundl-wrap
```

## Use

```js
var bundl = require('bundl');
var wrap = require('bundl-wrap');

var options = {
    before: '(function(){',
    after: ')();'
};

bundl(targets)
    .then(wrap(options))
    .then(write())
    .all();
```

## Options

### before
Text to come before your content (can use template values)

### after
Text to come after your content (can use template values)

### data
The data object that will be available to your templates

*Note: "<%= content %>" is a magic value that is always available to your templates, even when no data is passed*

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
    before: 'But <%= exclamation %>, ',
    after: ', and <%= name %> is the sun.',
    file: '../my_template.txt'
};
```
my_template.txt
```
what light through yonder <%= location %> breaks?
<%= content %>
It is the <%= direction %>
```
Output:
```
But soft, what light through yonder window breaks?
ORIGINAL CONTENT
It is the East, and Juliet is the sun.
```
