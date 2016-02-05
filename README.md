# selectify

Generic array for manipulating styles and attributes. Heavily inspired by the wonderful `selections` from `d3`, but works with more generic objects, not just DOM elements! Includes CSS-oriented methods like `style` and `classed`, but can easily be extended to add custom methods. And the input is just an array, so initial selection can be handled elsewhere, and return this object for further manipulation. As an example, see it used for manipulating 3D scenes in [`gl-scene`](http://github.com/freeman-lab/gl-scene).

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## install

Add to your project with

```javascript
npm install selectify --save
```

## example

Create a selection from an array

```javascript
var selectify = require('selectify')
var selection = selectify([{id: 'apple', className: 'fruit'}, {id: 'orange', className: 'fruit'}])
```

you can now set styles

```javascript
selection.style({color: 'rgb(255, 0, 0)'})
```

or classes

```javascript
selection.classed('cirtrus', function (d) {return d.id === 'orange'})
```

and evaluate functions

```javascript
selection.each(function (d) {
	console.log('id: ' + d.id)
	console.log('class: ' + d.className)
	console.log('style: ' + JSON.stringify(d.style))
})
```

which in this example will return

```javascript
id: apple
style: {"color":"rgb(255, 0, 0)"}
class: fruit
id: orange
style: {"color":"rgb(255, 0, 0)"}
class: fruit citrus
````

see below for all included methods, or how to extend with your own!

## methods

#### `selection.each(function)`

Evaluates a function on each element. The first input to the function will be the element.

#### `selection.style(name[,value])`

Set a style on each element by updating the `style` property. Can provide either a single object argument `selection.style({name: value})` or two arguments `selection.style(name, value)`. Can also provide a function for `value`, which will be evaluated on each item to determine the property value. If the function returns undefined, the property will be removed.

#### `selection.attr(name[,value])`

Set an attribute on each element by updating the `attributes` property. Otherwise works identically to `style`.

#### `selection.classed(name[,value])`

Set one or more classes on each element by updating the `className` property. Can provide a single class in the form `name` or a list of multiple classes specified by spaces in the form `name1 name2 name3`. If `value` is truthy it will determine whether to add or remove the class. If not provided, it will return a list of whether or not each element of the selection has the specified class.

#### `selection.toggleClass(name)`

Add one or more classes (if not already present), or remove them (if already present).

#### `selection.select(selector)`

Return a sub selection matching a string specifier of the form `#id` or `.class`. Will return the first element that matches.

#### `selection.selectAll(selector)`

Return a sub selection matching a string specifier of the form `#id` or `.class`. Will return all elements that match.

## extending

You may want to extend `selectify` with your own custom methods. It's easy to do with `inherits`. Here's an example. First, the usual boilerplate

```javascript
var selectify = require('selectify')
var inherits = require('inherits')

inherits(myselectify, selectify)

function myselectify (items) {
  if (!(this instanceof myselectify)) return new myselectify(items)
  myselectify.super_.call(this, items)
}
```

Then add a method `log`

```javascript
myselectify.prototype.log = function () {
  return this.each(function (d) {
    console.log(d.id)
  })
}
```

If we now create a selection we can use our new method

```javascript
var selection = myselectify([{id: 'apple'}, {id: 'orange'}])
selection.log()
```

to get

```
apple
orange
```