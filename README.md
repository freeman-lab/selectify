# selections

Generic array for manipulating styles and attributes. Inspired by the wonderful `selections` from `d3`, but can be used with more generic objects, not just DOM elements! Useful anytime you want to return one or more array of objects for further manipulation. Assumes the selection logic is handled elsewhere, so this module can composed with anything that returns an array. As an example, see it used for manipulating properties of 3D scenes in [`gl-scene`](http://github.com/freeman-lab/gl-scene).

## install

add to your project with

```javascript
npm install selections --save
```

## example

define a list of selected items

```javascript
var selections = require('selections')()
var items = selections({id: 'apple', className: 'fruit'}, {id: 'orange', className: 'fruit'})
```

you can set styles directly

```javascript
items.style({color: [1, 1, 0]})
```

or use functions (where `d` is the item)

```javascript
items.style('color', function (d) {if (d.id === 'apple') {return [1, 0, 0]}})
```

you can also call functions

```javascript
selections.each(function (d) {
	console.log(d.id)
	console.log(d.style)
})
```

which in this example will return

```javascript
apple
{ width: '100px', color: 'rgb(255,0,0)' }
orange
{ width: '100px' }
````

## methods

#### `selections.each(function)`

#### `selections.style(name[,value])`

#### `selections.classed(name[,value])`

#### `selections.toggleClass(name)`

## customizing

You can pass custom named functions during construction. Let's say you want a function that logs the id of each item.

```javascript
var selections = require('selections')({log: function (d) {console.log(d.id)}})
```

Now define a list of items

```javascript
var items = selections({id: 'apple', className: 'fruit'}, {id: 'orange', className: 'fruit'})
```

If you call

```javascript
items.log()
```

You'll see

```javascript
apple
orange
```

If one of your custom functions is named `onchange`, it will be called every time the class changes. You might want to use this to manually update styles given the current class.

