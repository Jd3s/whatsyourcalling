const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');

const potusParse = require('./potusParse');
 var topics = ["aerospace","automotive_and_transportation","consumer_electronics","energy_and_resources","telecommunications","biochemistry","inorganic_chemistry","organic_chemistry","thermodynamics","electricity","alternative_fuels","batteries","energy_policy","fossil_fuels","fuel_cells","nuclear_energy","petroleum","solar_energy","wind_energy",
"3-d_printing","aviation","automotive_and_transportation","nature_of_light","microarrays","robotics","biometric","civil_engineering","construction","detectors","electronics","graphene","materials_science","nanotechnology","engineering_and_construction","spintronics","technology","vehicles","wearable_technology","acoustics","albert_einstein","nature_of_water","quantum_computing","quantum_physics","ultrasound"]; 


// Do not run all of these at once. I repeat, do not run all of these at once.

// Include only 2-3 topics at a time of execution. Run multiple times similarly with different topics


for(let i=0;i<topics.length;i++)
{
topics[i]=topics[i]+'/';
}

for(let j=0;j<topics.length;j++)
{

const url = 'https://www.sciencedaily.com/news/matter_energy/'+topics[j];
 
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
  // console.log(presidents);
    fs.appendFile("/tmp/data_construction3",JSON.stringify(presidents,null,3),function(err) {
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

