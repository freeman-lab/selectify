var classlist = require('class-list')
var _ = require('lodash')

module.exports = function (custom) {
  _.forEach(_.keys(custom), function (name) {
    Selectify.prototype[name] = function (args) {
      if (args) this.each(custom[name](args))
      this.each(custom[name])
    }
  })
  return function (items) {return new Selectify (items)}
}

function Selectify (items) {
  var array = []
  if (!_.isArray(items)) items = [items]
  _.forEach(items, function (item) {
    if (!item.style) item.style = {}
    if (!item.attributes) item.attributes = {}
  })
  array.push.apply(array, items)
  array.__proto__ = Selectify.prototype
  return array
}

Selectify.prototype = new Array;

Selectify.prototype.each = function (cb) {
  for (var items = this, i = 0; i < items.length; i++) {
    if (items[i]) cb.call(undefined, items[i])
  }

  return this
}

Selectify.prototype.style = function (name, value) {
  var add = function (name, value) {return function (d) {
    if (value) d.style[name] = value
    else _.forEach(_.keys(name), function (key) {d.style[key] = name[key]})
  }}
  var remove = function (name) {return function (d) {
    delete d.style[name]
  }}
  var conditional = function (name, value) {return function (d) {
    var v = value.apply(d, arguments)
    if (v) d.style[name] = v
    else delete d.style[name]
  }}

  var cb = _.isUndefined(value) 
    ? ((typeof name === 'object') ? add : remove)
    : ((typeof value === 'function') ? conditional : add)
  return this.each(cb(name, value))
}

Selectify.prototype.classed = function (name, value) {
  var names = name.trim().split(/^|\s+/)

  var inspected = []
  var inspect = function (name) {return function (d) {
    var list = classlist(d), i = -1, n = names.length
    while (++i < n) if (!list.contains(names[i])) return inspected.push(false)
    return inspected.push(true)
  }}
  if (arguments.length < 2) {
    this.each((inspect)(name))
    return inspected
  }

  var add = function (names) {return function (d) {
    var list = classlist(d)
    names.forEach(function (name) {list.add(name)})
  }}
  var remove = function (names) {return function (d) {
    var list = classlist(d)
    names.forEach(function (name) {list.remove(name)})
  }}
  var conditional = function (names) {return function (d) {
    var v = value.apply(d, arguments)
    var list = classlist(d)
    if (v) names.forEach(function (name) {list.add(name)})
    else names.forEach(function (name) {list.remove(name)})
  }}

  var cb = typeof value === 'function'
    ? conditional
    : value ? add : remove
  return this.each(cb(names))
}

Selectify.prototype.toggleClass = function (name) {
  var names = name.trim().split(/^|\s+/)

  var cb = function (names) {return function (d) {
    var list = classlist(d)
    names.forEach(function (name) {list.toggle(name)})
  }}

  return this.each(cb(names))
}

Selectify.prototype.select = function (selector) {
  var items = this
  var subitems
  if (selector[0] === '#') subitems = _.find(items, ['id', selector.replace('#', '')])
  if (selector[0] === '.') subitems = _.find(items, function (d) {
    return classlist(d).contains(selector.replace('.',''))
  })
  return Selectify(subitems)
}

Selectify.prototype.selectAll = function (selector) {
  var items = this
  var subitems
  if (selector[0] === '#') subitems = _.filter(items, ['id', selector.replace('#', '')])
  if (selector[0] === '.') subitems = _.filter(items, function (d) {
    return classlist(d).contains(selector.replace('.',''))
  })
  return Selectify(subitems)
}