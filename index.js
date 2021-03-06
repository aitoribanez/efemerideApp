'use strict'

let utils = require('./utils')
let fetchData = require('./fetchData')
let database = require('./database')

let year = 2016
let month = 7 // TODO: meterlo en for para que funcione por año ???
let lang = 'es'

let events = {}
let lastDays = utils.getLastDayOfMonth(year)

database.createTable().then(function (db) {
  start()
})

function start () {
  let monthT = utils.toMonth(month)
  let lastDay = lastDays[month]
  let days = utils.makeDaysArray(lastDay)

  days.map(function (day) {
    fetchData.fetch(day, monthT, lang, events).then(function (res) {
      database.insert(res)
    })
  })

  // setTimeout(function () { console.log(events) }, 3000)
}
