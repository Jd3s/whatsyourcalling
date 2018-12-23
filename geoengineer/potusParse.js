const rp = require('request-promise');
const $ = require('cheerio');

const potusParse = function(url) {
  return rp(url)
    .then(function(html) {
    return{
      title : $('div>h1', html).text(),
      source : 'credits : www.geoengineer.org',
      text : $('div > p', html).text(),
     };
    })
    .catch(function(err) {
      //handle error
    });
};

module.exports = potusParse;
