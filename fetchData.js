'use strict'

let request = require('request')
let cheerio = require('cheerio')
let utils = require('./utils')

const fetchData = {
  fetch,
  normalize
}

function fetch (day, month, lang, events) {
  return new Promise(function (resolve) {
    let metadata = []

    request(`https://${lang}.wikipedia.org/wiki/${day}_de_${month}`, function (error, response, html) {
      if (!error && response.statusCode === 200) {
        let $ = cheerio.load(html)
        let li = $('div#toc.toc').next().next().next().children()
        let next = $('div#toc.toc').next().next().next().next()

        $(li).each(function () {
          normalize($(this), $, metadata)
        })

        while (!$(next).is('h2')) {
          if ($(next).is('ul')) {
            $(next).children().each(function () {
              normalize($(this), $, metadata)
            })
          }
          next = $(next).next()
        }

        metadata.day = day
        resolve(metadata)

        // console.log(metadata)
      }
    })
  })
}

function normalize (elem, $, metadata) {
  let date = $(elem).children().html()
  // let data = $(this).children().parent().text().slice(date.length + 2)
  let data = $(elem).children().parent().text()

  // Para conseguir el siguiente ul aqui dentro
  // $(this).parent().next().next().html())

  if (!isNaN(parseInt(date))) {
    let scraped = {
      date: parseInt(date),
      data: utils.capitalizeFirstLetter(data)
    }
    metadata.push(scraped)
  }
}

module.exports = fetchData
