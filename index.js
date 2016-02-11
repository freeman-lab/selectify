var classlist = require('class-list')
var _ = require('lodash')

module.exports = Selectify

function Selectify (items) {
  if (!(this instanceof Selectify)) return new Selectify(items)
  if (!_.isArray(items)) items = [items]
  _.forEach(items, function (item) {
    if (!item.style) item.style = {}
    if (!item.attributes) item.attributes = {}
  })
  this.push.apply(this, items)
}

function each (cb) {
  for (var items = this, i = 0; i < items.length; i++) {
    if (items[i]) cb(items[i])
  }
  return this
}

function style (name, value) {
  var add = function (name, value) {
    return function (d) {
      if (value) d.style[name] = value
      else _.forEach(_.keys(name), function (key) { d.style[key] = name[key] })
    }
  }
  var remove = function (name) {
    return function (d) {
      delete d.style[name]
    }
  }
  var conditional = function (name, value) {
    return function (d) {
      var v = value.apply(d, arguments)
      if (v) d.style[name] = v
      else delete d.style[name]
    }
  }

  var cb = _.isUndefined(value)
    ? ((typeof name === 'object') ? add : remove)
    : ((typeof value === 'function') ? conditional : add)
  return this.each(cb(name, value))
}

function attr (name, value) {
  var add = function (name, value) {
    return function (d) {
      if (value) d.attributes[name] = value
      else _.forEach(_.keys(name), function (key) { d.attributes[key] = name[key] })
    }
  }
  var remove = function (name) {
    return function (d) {
      delete d.attributes[name]
    }
  }
  var conditional = function (name, value) {
    return function (d) {
      var v = value.apply(d, arguments)
      if (v) d.attributes[name] = v
      else delete d.attributes[name]
    }
  }

  var cb = _.isUndefined(value)
    ? ((typeof name === 'object') ? add : remove)
    : ((typeof value === 'function') ? conditional : add)
  return this.each(cb(name, value))
}

function classed (name, value) {
  var names = name.trim().split(/^|\s+/)

  var inspected = []
  var inspect = function (name) {
    return function (d) {
      var list = classlist(d)
      var i = -1
      var n = names.length
      while (++i < n) if (!list.contains(names[i])) return inspected.push(false)
      return inspected.push(true)
    }
  }
  if (arguments.length < 2) {
    this.each((inspect)(name))
    return inspected
  }

  var add = function (names) {
    return function (d) {
      var list = classlist(d)
      names.forEach(function (name) { list.add(name) })
    }
  }
  var remove = function (names) {
    return function (d) {
      var list = classlist(d)
      names.forEach(function (name) { list.remove(name) })
    }
  }
  var conditional = function (names) {
    return function (d) {
      var v = value.apply(d, arguments)
      var list = classlist(d)
      if (v) names.forEach(function (name) { list.add(name) })
      else names.forEach(function (name) { list.remove(name) })
    }
  }

  var cb = typeof value === 'function'
    ? conditional
    : value ? add : remove
  this.each(cb(names))
  this.each(function (d) { if (d.update)d.update() })
  return this
}

function toggleClass (name) {
  var names = name.trim().split(/^|\s+/)

  var cb = function (names) {
    return function (d) {
      var list = classlist(d)
      names.forEach(function (name) { list.toggle(name) })
    }
  }

  this.each(cb(names))
  this.each(function (d) { if (d.update) d.update() })
  return this
}

function select (selector) {
  var items = this
  var subitems
  if (selector[0] === '#') {
    subitems = _.find(items, ['id', selector.replace('#', '')])
  } else if (selector[0] === '.') {
    subitems = _.find(items, function (d) {
      return classlist(d).contains(selector.replace('.', ''))
    })
  } else {
    subitems = _.find(items, ['id', selector])
  }
  if (!subitems) return null
  return new this.constructor(subitems)
}

function selectAll (selector) {
  var items = this
  var subitems
  if (selector[0] === '#') {
    subitems = _.filter(items, ['id', selector.replace('#', '')])
  } else if (selector[0] === '.') {
    subitems = _.filter(items, function (d) {
      return classlist(d).contains(selector.replace('.', ''))
    })
  } else {
    subitems = _.filter(items, ['id', selector])
  }
  if (subitems.length == 0) return null
  return new this.constructor(subitems)
}

Selectify.prototype = Object.create(Array.prototype, {
  constructor: {value: Selectify},
  each: {value: each},
  style: {value: style},
  attr: {value: attr},
  classed: {value: classed},
  toggleClass: {value: toggleClass},
  select: {value: select},
  selectAll: {value: selectAll}
})
