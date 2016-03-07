var test = require('tape')
var selectify = require('./index.js')

test('construction', function (t) {
  var s = selectify([{id: 'a', className: 'x'}])
  t.deepEqual(s[0], {id: 'a', className: 'x', style: {}, attributes: {}})
  t.equals(s.length, 1)
  t.end()
})

test('select', function (t) {
  var s = selectify([{id: 'a', className: 'x'}, {id: 'b', className: 'x'}])
  t.equals(s.select('#a').length, 1)
  t.equals(s.select('.x').length, 1)
  t.end()
})

test('selectAll', function (t) {
  var s = selectify([{id: 'a', className: 'x'}, {id: 'b', className: 'x'}])
  t.equals(s.selectAll('#a').length, 1)
  t.equals(s.selectAll('.x').length, 2)
  t.end()
})

test('select', function (t) {
  var s = selectify([{id: 'a', className: 'x'}, {id: 'b', className: 'x'}])
  t.equals(s.select('#a').length, 1)
  t.equals(s.select('.x').length, 1)
  t.end()
})

test('each', function (t) {
  var s = selectify([{id: 'a', className: 'x'}, {id: 'b', className: 'x'}])
  var count = 0
  s.each(function (d) { count++ })
  t.equals(count, 2)
  t.end()
})

test('each with index', function (t) {
  var s = selectify([{id: 'a', className: 'x'}, {id: 'b', className: 'x'}])
  var count = 0
  s.each(function (d, i) { count = count + i + 1 })
  t.equals(count, 3)
  t.end()
})

test('style', function (t) {
  var s = selectify([{id: 'a', className: 'x'}, {id: 'b', className: 'x'}])
  s.style({prop: 'val'})
  s.each(function (d) {
    t.deepEquals(d.style, {prop: 'val'})
  })
  s.style('prop', 'val')
  s.each(function (d) {
    t.deepEquals(d.style, {prop: 'val'})
  })
  s.style({prop: 'val', prop2: 'val2'})
  s.each(function (d) {
    t.deepEquals(d.style, {prop: 'val', prop2: 'val2'})
  })
  t.end()
})

test('attr', function (t) {
  var s = selectify([{id: 'a', className: 'x'}, {id: 'b', className: 'x'}])
  s.attr({prop: 'val'})
  s.each(function (d) {
    t.deepEquals(d.attributes, {prop: 'val'})
  })
  s.attr('prop', 'val')
  s.each(function (d) {
    t.deepEquals(d.attributes, {prop: 'val'})
  })
  s.attr({prop: 'val', prop2: 'val2'})
  s.each(function (d) {
    t.deepEquals(d.attributes, {prop: 'val', prop2: 'val2'})
  })
  t.end()
})

test('classed', function (t) {
  var s = selectify([{id: 'a', className: 'x'}, {id: 'b', className: 'x'}])
  s.classed('x', true)
  s.each(function (d) {
    t.equals(d.className, 'x')
  })
  s.classed('x y', true)
  s.each(function (d) {
    t.equals(d.className, 'x y')
  })
  s.classed('y', false)
  s.each(function (d) {
    t.equals(d.className, 'x')
  })
  t.deepEquals(s.classed('x'), [true, true])
  t.end()
})

test('toggleClass', function (t) {
  var s = selectify([{id: 'a', className: 'x'}, {id: 'b', className: 'x'}])
  s.toggleClass('x')
  s.each(function (d) {
    t.equals(d.className, '')
  })
  s.toggleClass('y')
  s.each(function (d) {
    t.equals(d.className, 'y')
  })
  s.toggleClass('j k')
  s.each(function (d) {
    t.equals(d.className, 'y j k')
  })
  t.end()
})

test('chaining', function (t) {
  var s = selectify([{id: 'a', className: 'x'}, {id: 'b', className: 'x'}])
  s.select('#a').style({prop: 'val'})
  t.deepEquals(s[0].style, {prop: 'val'})
  t.deepEquals(s[1].style, {})
  s.select('#b').style({prop2: 'val2'}).attr({attr3: 'val3'})
  t.deepEquals(s[1].style, {prop2: 'val2'})
  t.deepEquals(s[1].attributes, {attr3: 'val3'})
  t.end()
})
