const rp = require('request-promise');
const $ = require('cheerio');

const potusParse = function(url) {
  return rp(url)
    .then(function(html) {
    return{ 
      title : $('div>h1', html).text()+' '+$('div>h2', html).text(),
      source : 'Materials provided by '+$('p>a>strong', html).text(),
      text : $('div>p', html).text(),
     };
    })
    .catch(function(err) {
      //handle error
    });
};

module.exports = potusParse;
