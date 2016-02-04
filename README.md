# selectify

Generic array for manipulating styles and attributes. Heavily inspired by the wonderful `selections` from `d3`, but works with more generic objects, not just DOM elements! Includes CSS-oriented methods like `style` and `classed`, but custom methods can be added. And the input is just an array, so initial selection logic can be handled elsewhere, and return this object for further manipulation. As an example, see it used for manipulating properties of 3D scenes in [`gl-scene`](http://github.com/freeman-lab/gl-scene).

## install

Add to your project with

```javascript
npm install selectify --save
```

## example

Create a selection from an array

```javascript
var selectify = require('selectify')()
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

#### `selection.style(name[,value])`

#### `selection.classed(name[,value])`

#### `selection.toggleClass(name)`

#### `selection.select(selector)`

#### `selection.selectAll(selector)`

## customizing

You can pass custom named methods during construction. 

Let's add a method called `log` that logs the `id` of each item.

```javascript
var selectify = require('selectify')({log: function (d) {console.log(d.id)}})
```

Now define a list of items

```javascript
var items = selectify([{id: 'apple', className: 'fruit'}, {id: 'pear', className: 'fruit'}])
```

If you call

```javascript
items.log()
```

You'll see

```javascript
apple
pear
```

If one of your custom methods is named `onchange`, it will be called every time the class changes. You might want to use this to manually update styles given the current class.

