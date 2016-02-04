var selections = require('./index.js')({
  log: function (d) {
    console.log(d.id)
    console.log(d.style)
  }
})

var items = selections([
  {id: 'apple', className: 'fruit'}, 
  {id: 'pear', className: 'fruit'}
])

items.style('width', '100px')
items.style('color', function (d) {return (d.id === 'apple') ? 'rgb(255,0,0)' : 'rgb(255,255,0)'})

items.log()
