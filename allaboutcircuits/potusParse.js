const rp = require('request-promise');
const $ = require('cheerio');

const potusParse = function(url) {
  return rp(url)
    .then(function(html) {
    return{
      title : $('div>h1', html).text(),
      source : 'Article by '+ $('.author',html).text()+ ' ' + 'Credits : allaboutcircuits.com',
      text : $('.lead',html).text()+ ' '+$('div > p', html).text(),
     };
    })
    .catch(function(err) {
      //handle error
    });
};

module.exports = potusParse;
