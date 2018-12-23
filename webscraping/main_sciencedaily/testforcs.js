const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');

const potusParse = require('./potusParse');

var topics = ["artificial_intelligence","hacking","communications","computer_science","virtual_reality","software","mathematics"];
for(let i=0;i<topics.length;i++)
{
topics[i]=topics[i]+'/';
}

for(let j=0;j<topics.length;j++)
{

const url = 'https://www.sciencedaily.com/news/computers_math/'+topics[j];
 
rp(url)
  .then(function(html) {
   
    const wikiUrls = [];
    for (let i = 0; i < 30; i++) {
      wikiUrls.push($('h3 > a', html)[i].attribs.href);
    }

    return Promise.all(
      wikiUrls.map(function(url) {
        return potusParse('https://www.sciencedaily.com'+url);
      })
    );
  })
  .then(function(presidents) {
    console.log(presidents);
    fs.appendFile("/tmp/cs_test",JSON.stringify(presidents,null,3),function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  })
 
}) 
    
  .catch(function(err) {
    console.log("Fucked up");
    console.log(err);
  });


}

