var selecitify = require('./index.js')()

var selection = selecitify([
  {id: 'apple', className: 'fruit'}, 
  {id: 'orange', className: 'fruit'}
])

selection.style('width', '100px')
selection.style('color', function (d) {return (d.id === 'apple') ? 'rgb(255,0,0)' : 'rgb(255,255,0)'})

selection.classed('food', true)

selection.select('#orange').classed('citrus', true)

selection.each(function (d) {
  console.log('id: ' + d.id)
  console.log('style: ' + JSON.stringify(d.style))
  console.log('class: ' + d.className)
})
