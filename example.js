var selectify = require('./index.js')

var selection = selectify([
  {id: 'apple', className: 'fruit'},
  {id: 'orange', className: 'fruit'}
])

selection.style({color: 'rgb(255, 0, 0)'})

selection.classed('citrus', function (d) { return d.id === 'orange' })

selection.each(function (d) {
  console.log('id: ' + d.id)
  console.log('style: ' + JSON.stringify(d.style))
  console.log('class: ' + d.className)
})
