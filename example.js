var selections = require('./index.js')({
  log: function (d) {
    console.log(d.id)
    console.log(d.style)
  }
})

var items = selections([
  {id: 'apple', className: 'fruit'}, 
  {id: 'orange', className: 'fruit'}
])

items.style({width: '100px'})
items.style('color', function (d) {if (d.id === 'apple') {return 'rgb(255,0,0)'}})

items.log()
