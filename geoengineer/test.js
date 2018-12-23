const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');

const potusParse = require('./potusParse');

var topicsindex = 10;
var topics = ["10"];


for(let i=2;i<=60;i++)
{
  var x= topicsindex*i;
 topics.push(x.toString());
}


for(let j=0;j<topics.length;j++)
{

const url = 'https://www.geoengineer.org/news-center/news?limit=10&start='+topics[j];

rp(url)
  .then(function(html) {

    const wikiUrls = [];
    for (let i = 0; i < 10; i++) {
      wikiUrls.push($('div > h3 > a', html)[i].attribs.href);
    }

    return Promise.all(
      wikiUrls.map(function(url) {
        return potusParse('https://www.geoengineer.org'+url);
      })
    );
  })
  .then(function(presidents) {
    console.log(presidents);
    fs.appendFile("/tmp/data1",JSON.stringify(presidents,null,3),function(err) {
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
//
// for(let j=0;j<topics.length;j++)
// {
//
// const url = 'https://www.geoengineer.org/news-center/news?limit=10&start='+topics[j];
//
// rp(url)
//   .then(function(html) {
//     const wikiUrls = [];
//
//     for (let i = 0; i < 10; i++) {
//
//      wikiUrls.push($(' div > h3 > a', html)[i].attribs.href);
//
//     }
//   })
//
//
//
//
//
// // rp(url)
// //       .then(function(html)
// //        {
// //     for (let i = 0; i < 90; i++) {
// //        var links = ($(' div > a', html)[i].attribs.href);
// //        if(links.includes("/news/"))
// //      {
// //
// //
// //       // console.log(links);
// //        set1.add(links);
// //      }
// //
// //     }
// //     const wikiUrls = [];
// //     for (let i = 0; i < 19; i++) {
// //
// //      wikiUrls.push(iterator1.next().value);
// //
// //     }
//
//     return Promise.all(
//       wikiUrls.map(function(url) {
//         return potusParse('https://www.geoengineer.org'+url);
//       })
//     );
//
//   .then(function(presidents) {
//     console.log(presidents);
//     fs.appendFile("/tmp/data1",JSON.stringify(presidents,null,3),function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
//   })
//
// })
//
//   .catch(function(err) {
//     console.log("Fucked up");
//     console.log(err);
//   });
//
//
// }
