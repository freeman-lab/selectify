var _ = require('lodash')

module.exports = function (custom) {
  _.forEach(_.keys(custom), function (name) {
    Selections.prototype[name] = function (args) {
      if (args) this.each(custom[name](args))
      this.each(custom[name])
    }
  })
  return function (items) {
    var array = []
    array.push.apply(array, items)
    array.__proto__ = Selections.prototype
    return array
  }
}

function Selections () {}

Selections.prototype = new Array;

Selections.prototype.each = function (cb) {
  for (var items = this, i = 0; i < items.length; i++) {
    if (items[i]) cb.call(undefined, items[i])
  }
}

Selections.prototype.style = function (name, value) {
  var remove = function (name) {return function (d) {delete d.style[name]}}
  var add = function (name, value) {return function (d) {
    if (value) d.style[name] = value
    else _.forEach(_.keys(name), function (key) {d.style[key] = name[key]})
  }}
  var conditional = function (name, value) {return function (d) {
    var v = value.apply(d, arguments)
    if (v) d.style[name] = v
    else delete d.style[name]
  }}
  var cb = _.isUndefined(value) 
    ? ((typeof name === 'object') ? add : remove)
    : ((typeof value === 'function') ? conditional : add)
  this.each((cb)(name, value))
}