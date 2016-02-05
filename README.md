# selectify

Generic array for manipulating styles and attributes. Heavily inspired by the wonderful `selections` from `d3`, but works with more generic objects, not just DOM elements! Includes CSS-oriented methods like `style` and `classed`, but can easily be inherited from in order to add custom methods. And the input is just an array, so initial selection logic can be handled elsewhere, and return this object for further manipulation. As an example, see it used for manipulating properties of 3D scenes in [`gl-scene`](http://github.com/freeman-lab/gl-scene).

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
selection.style('width', '100px')
```

or do it via functions (where `d` is the item)

```javascript
selection.style('color', function (d) {return (d.id === 'apple') ? 'rgb(255,0,0)' : 'rgb(255,255,0)'})
```

you can also control classes

```javascript
selection.classed('food', true)
```

and target subsets using chaining

```javascript
selection.select('#orange').classed('citrus', true)
```

you can evaluate functions on each item

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
style: {"width":"100px","color":"rgb(255,0,0)"}
class: fruit food
id: orange
style: {"width":"100px","color":"rgb(255,255,0)"}
class: fruit food citrus
````

## methods

#### `selection.each(function)`

Evaluates a function on each element. The first input to the function will be the element.

#### `selection.style(name[,value])`

Set a style on each element by updating the `style` property. Can provide either an object `style({name: value})` or two arguments `style(name, value)`. Can also provide a function for `value`, which will be evaluated on each item to determine the property value. If the function returns undefined, the property will be removed.

#### `selection.attr(name[,value])`

Set an attribute on each element by updating the `attributes` property. Works identically to `style`.

#### `selection.classed(name[,value])`

Set one or more classes on each element by updating the `className` property. Can provide a single class in the form `name` or a list of multiple classes specified by spaces in the form `name1 name2 name3`.

#### `selection.toggleClass(name)`

Add one or more classes (if not already present), or remove them (if already present).

#### `selection.select(selector)`

Return a sub selection matching a string specifier of the form `#id` or `.class`. Will return the first element that matches.

#### `selection.selectAll(selector)`

Return a sub selection matching a string specifier of the form `#id` or `.class`. Will return all elements that match.

## extending

You may want to extend `selectify` with your own custom methods. It's easy to do with `inherits`. Here's an example where we add a log method

```javascript
var selectify = require('selectify')
var inherits = require('inherits')

inherits(myselectify, selectify)

function myselectify (items) {
  if (!(this instanceof myselectify)) return new myselectify(items)
  myselectify.super_.call(this, items)
}

myselectify.prototype.log = function () {
  return this.each(function (d) {
    console.log(d.id)
  })
}
```

If we now create a selection we can use the log method

```javascript
var selection = myselectify([{id: 'apple'}, {id: 'orange'}])

selection.log()
```

to get

```
apple
orange
```