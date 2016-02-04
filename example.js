var selecitify = require('./index.js')()

var items = selecitify([
  {id: 'apple', className: 'fruit'}, 
  {id: 'pear', className: 'fruit'}
])

items.style('width', '100px')
items.style('color', function (d) {return (d.id === 'apple') ? 'rgb(255,0,0)' : 'rgb(0,255,0)'})

items.classed('food meat', true)
items.classed('red', function (d) {return (d.id === 'apple')})
items.toggleClass('meat')

items.select('#pear').classed('green', true)

items.each(function (d) {
  console.log('id: ' + d.id)
  console.log('style: ' + JSON.stringify(d.style))
  console.log('class: ' + d.className)
})
