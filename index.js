//                    For IIT-M AI challenge.
//      Team Bruh-grammers, TCE - Madurai.

var express =require('express');
var app=express();
var path = require('path');
var bodyParser = require('body-parser');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var mysql = require('mysql');
var recommender = require('recommender');




var clicks =[["title1","source1","contentfile 1","id"],["title2","source2","contentfile 2","id"],["title3","source3","contentfile3","id"],["title4","source4","contentfile4","id"],["title5","source5","contentfile5","id"],["title6","source6","contentfile6","id"],["title7","source7","contentfile7","id"],["title8","source8","contentfile8","id"],["title9","source9","contentfile9","id"],["title9","source9","contentfile9","id"],["title9","source9","contentfile9","id"],["title9","source9","contentfile9","id"]];
var related=[["title1","source1","contentfile 1","id"],["title2","source2","contentfile 2","id"],["title3","source3","contentfile3","id"]];


var con = mysql.createConnection({
  host: "localhost",
  database : "db_connect",
  user: "splunk",
  password: "password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
   extended: true
}));
urlencodedParser= bodyParser.urlencoded({
  extended:false
});
app.use(bodyParser.json());
//
//
eventEmitter.on('scream', (click) => {
  clicks=click;
})
eventEmitter.on('forfeed', (click) => {
  clicks=click;
})
//
//
app.post("/posting",function(req,res){

  var str =req.body.user.pref;
  var feedbackid = req.body.user.id;
  console.log("feedbackid="+feedbackid);
  var result = sentiment.analyze(str);
  console.log(result.comparative);



  var feedbackSenti;
  if(result.comparative<0)
  {
    feedbackSenti="Ouch. That hurt. We'll definitely try to improve.";
  }
  else
    {
      feedbackSenti="We see Positivity flowing. Thanks ! BroFist.";
    }
    var feedbackdb;


    feedbackdb  = -3 + (result.comparative+5)*(6)/10;
    con.query('UPDATE new_table SET user_1 = ?  WHERE idnew_table = ?',[feedbackdb,feedbackid], function (error, results, fields) {
        if (error)
            throw error;


         res.render("feedback",{
                      feedbackSenti:  feedbackSenti
                     });

 });
});


var resultsfinal=[];
app.get("/results",function(req,res){

  con.query('SELECT idnew_table FROM new_table WHERE (seen = 1 ) ', function (error, results, fields) {
      if (error)
          throw error;
     //console.log(results);
     var seencount = results.length;

     con.query('SELECT branch FROM user_table ORDER BY user_1 DESC LIMIT 3 ', function (error, results, fields) {
             if (error)
                 throw error;
              if(seencount<25)
              {
                resultsfinal[0]="NOT";
                resultsfinal[1]="ENOUGH";
                resultsfinal[2]="DATA";

              }
              else {
                resultsfinal[0]="We recommend "+ results[0].branch +" for you. Thank your curiosity.";
                resultsfinal[1]="For the second choice, " + results[1].branch+" should also work !";
                resultsfinal[2]= "Also, do consider "+results[2].branch;
              }

              res.render("results",{
               resultsfinal:resultsfinal

              });
     });

     });
   });

 var related =[];
 var documents=[];
app.get("/article",function(req,res){

  var query =clicks[0][0];

  con.query("UPDATE new_table SET user_1= 1  WHERE idnew_table = \'?\' ",[clicks[0][3]],function(error,results1){
    if (error)
        throw error;

  con.query('SELECT idnew_table,text,title FROM new_table', function (error, results, fields) {
      if (error)
          throw error;
          for(var i=0;i<results.length;i++)
          {
            documents[i]=results[i].title;
          }


          recommender.tfidf(query, documents, (sortedDocs) => {
            console.log(sortedDocs[1]);
            for(var i=0;i<results.length;i++)
            {
              if(results[i].title==sortedDocs[1])
              {
                related[1]=results[i].text;
                related[2]=results[i].text;
                related[3]=results[i].idnew_table;
              }
           }

            related[1] = truncate(related[1],50)
            function truncate(str, no_words) {
           return str.split(" ").splice(0,no_words).join(" ");
       }
       related[1]=related[1]+"..."+" click here to read more.. You'll love it."
            related[0]=sortedDocs[1];

            res.render("single",{
                            clicks:clicks[0],
                            related:related
                           });

  });

});
  });

    });




app.get("/article1",function(req,res){
  var query =clicks[1][0];
  con.query("UPDATE new_table SET user_1= 1  WHERE idnew_table = \'?\' ",[clicks[1][3]],function(error,results1){
    if (error)
        throw error;
  con.query('SELECT idnew_table,text,title FROM new_table ', function (error, results, fields) {
      if (error)
          throw error;
          for(var i=0;i<results.length;i++)
          {
            documents[i]=results[i].title;
          }


          recommender.tfidf(query, documents, (sortedDocs) => {
            console.log(sortedDocs[1]);
            for(var i=0;i<results.length;i++)
            {
              if(results[i].title==sortedDocs[1])
              {
                related[1]=results[i].text;
                related[2]=results[i].text;
                related[3]=results[i].idnew_table;
              }
           }

            related[1] = truncate(related[1],50)
            function truncate(str, no_words) {
           return str.split(" ").splice(0,no_words).join(" ");
       }
       related[1]=related[1]+"..."+" click here to read more.. You'll love it."
            related[0]=sortedDocs[1];
            res.render("single",{
                            clicks:clicks[1],
                            related:related
                           });

  });

  });

});
});
app.get("/masthead",function(req,res){
  // var upvote = req.body.upvote;
  res.render("masthead",{

         //source1:source
  });

});
app.get("/article2",function(req,res){
  var query =clicks[2][0];

  con.query("UPDATE new_table SET user_1= 1  WHERE idnew_table = \'?\' ",[clicks[2][3]],function(error,results1){
    if (error)
        throw error;

  con.query('SELECT idnew_table,text,title FROM new_table ', function (error, results, fields) {
      if (error)
          throw error;
          for(var i=0;i<results.length;i++)
          {
            documents[i]=results[i].title;
          }


          recommender.tfidf(query, documents, (sortedDocs) => {
            console.log(sortedDocs[1]);
            for(var i=0;i<results.length;i++)
            {
              if(results[i].title==sortedDocs[1])
              {
                related[1]=results[i].text;
                related[2]=results[i].text;
                related[3]=results[i].idnew_table;
              }
           }

            related[1] = truncate(related[1],50)
            function truncate(str, no_words) {
           return str.split(" ").splice(0,no_words).join(" ");
       }
       related[1]=related[1]+"..."+" click here to read more.. You'll love it."
            related[0]=sortedDocs[1];
            res.render("single",{
                            clicks:clicks[2],
                            related:related
                           });

  });

  });
});
});
app.get("/article3",function(req,res){
  var query =clicks[3][0];
  con.query("UPDATE new_table SET user_1= 1  WHERE idnew_table = \'?\' ",[clicks[3][3]],function(error,results1){
    if (error)
        throw error;
  con.query('SELECT idnew_table,text,title FROM new_table ', function (error, results, fields) {
      if (error)
          throw error;
          for(var i=0;i<results.length;i++)
          {
            documents[i]=results[i].title;
          }


          recommender.tfidf(query, documents, (sortedDocs) => {
            console.log(sortedDocs[1]);
            for(var i=0;i<results.length;i++)
            {
              if(results[i].title==sortedDocs[1])
              {
                related[1]=results[i].text;
                related[2]=results[i].text;
                related[3]=results[i].idnew_table;
              }
           }

            related[1] = truncate(related[1],50)
            function truncate(str, no_words) {
           return str.split(" ").splice(0,no_words).join(" ");
       }
       related[1]=related[1]+"..."+" click here to read more.. You'll love it."
            related[0]=sortedDocs[1];
            res.render("single",{
                            clicks:clicks[3],
                            related:related
                           });

  });
});
  });
});
app.get("/article4",function(req,res){
  var query =clicks[4][0];
  con.query("UPDATE new_table SET user_1= 1  WHERE idnew_table = \'?\' ",[clicks[4][3]],function(error,results1){
    if (error)
        throw error;
  con.query('SELECT idnew_table,text,title FROM new_table ', function (error, results, fields) {
      if (error)
          throw error;
          for(var i=0;i<results.length;i++)
          {
            documents[i]=results[i].title;
          }


          recommender.tfidf(query, documents, (sortedDocs) => {
            console.log(sortedDocs[1]);
            for(var i=0;i<results.length;i++)
            {
              if(results[i].title==sortedDocs[1])
              {
                related[1]=results[i].text;
                related[2]=results[i].text;
                related[3]=results[i].idnew_table;
              }
           }

            related[1] = truncate(related[1],50)
            function truncate(str, no_words) {
           return str.split(" ").splice(0,no_words).join(" ");
       }
       related[1]=related[1]+"..."+" click here to read more.. You'll love it."
            related[0]=sortedDocs[1];
            res.render("single",{
                            clicks:clicks[4],
                            related:related
                           });

  });
});
  });
});
app.get("/article5",function(req,res){
  var query =clicks[5][0];
  con.query("UPDATE new_table SET user_1= 1  WHERE idnew_table = \'?\' ",[clicks[5][3]],function(error,results1){
    if (error)
        throw error;
  con.query('SELECT idnew_table,text,title FROM new_table ', function (error, results, fields) {
      if (error)
          throw error;
          for(var i=0;i<results.length;i++)
          {
            documents[i]=results[i].title;
          }


          recommender.tfidf(query, documents, (sortedDocs) => {
            console.log(sortedDocs[1]);
            for(var i=0;i<results.length;i++)
            {
              if(results[i].title==sortedDocs[1])
              {
                related[1]=results[i].text;
                related[2]=results[i].text;
                related[3]=results[i].idnew_table;
              }
           }

            related[1] = truncate(related[1],50)
            function truncate(str, no_words) {
           return str.split(" ").splice(0,no_words).join(" ");
       }
       related[1]=related[1]+"..."+" click here to read more.. You'll love it."
            related[0]=sortedDocs[1];
            res.render("single",{
                            clicks:clicks[5],
                            related:related
                           });

  });
});
  });
});
app.get("/article6",function(req,res){
  var query =clicks[6][0];
  con.query("UPDATE new_table SET user_1= 1  WHERE idnew_table = \'?\' ",[clicks[0][3]],function(error,results1){
    if (error)
        throw error;
  con.query('SELECT idnew_table,text,title FROM new_table ', function (error, results, fields) {
      if (error)
          throw error;
          for(var i=0;i<results.length;i++)
          {
            documents[i]=results[i].title;
          }


          recommender.tfidf(query, documents, (sortedDocs) => {
            console.log(sortedDocs[1]);
            for(var i=0;i<results.length;i++)
            {
              if(results[i].title==sortedDocs[1])
              {
                related[1]=results[i].text;
                related[2]=results[i].text;
                related[3]=results[i].idnew_table;
              }
           }

            related[1] = truncate(related[1],50)
            function truncate(str, no_words) {
           return str.split(" ").splice(0,no_words).join(" ");
       }
       related[1]=related[1]+"..."+" click here to read more.. You'll love it."
            related[0]=sortedDocs[1];
            res.render("single",{
                            clicks:clicks[6],
                            related:related
                           });

  });
});
  });

});
app.get("/article7",function(req,res){
  var query =clicks[7][0];

  con.query("UPDATE new_table SET user_1= 1  WHERE idnew_table = \'?\' ",[clicks[7][3]],function(error,results1){
    if (error)
        throw error;
  con.query('SELECT idnew_table,text,title FROM new_table ', function (error, results, fields) {
      if (error)
          throw error;
          for(var i=0;i<results.length;i++)
          {
            documents[i]=results[i].title;
          }


          recommender.tfidf(query, documents, (sortedDocs) => {
            console.log(sortedDocs[1]);
            for(var i=0;i<results.length;i++)
            {
              if(results[i].title==sortedDocs[1])
              {
                related[1]=results[i].text;
                related[2]=results[i].text;
                related[3]=results[i].idnew_table;
              }
           }

            related[1] = truncate(related[1],50)
            function truncate(str, no_words) {
           return str.split(" ").splice(0,no_words).join(" ");
       }
       related[1]=related[1]+"..."+" click here to read more.. You'll love it."
            related[0]=sortedDocs[1];
            res.render("single",{
                            clicks:clicks[7],
                            related:related
                           });

  });

  });
});
});
app.get("/article8",function(req,res){
  var query =clicks[8][0];
  con.query("UPDATE new_table SET user_1= 1  WHERE idnew_table = \'?\' ",[clicks[8][3]],function(error,results1){
    if (error)
        throw error;
  con.query('SELECT idnew_table,text,title FROM new_table ', function (error, results, fields) {
      if (error)
          throw error;
          for(var i=0;i<results.length;i++)
          {
            documents[i]=results[i].title;
          }


          recommender.tfidf(query, documents, (sortedDocs) => {
            console.log(sortedDocs[1]);
            for(var i=0;i<results.length;i++)
            {
              if(results[i].title==sortedDocs[1])
              {
                related[1]=results[i].text;
                related[2]=results[i].text;
                related[3]=results[i].idnew_table;
              }
           }

            related[1] = truncate(related[1],50)
            function truncate(str, no_words) {
           return str.split(" ").splice(0,no_words).join(" ");
       }
       related[1]=related[1]+"..."+" click here to read more.. You'll love it."
            related[0]=sortedDocs[1];
            res.render("single",{
                            clicks:clicks[8],
                            related:related
                           });

  });
});
  });

});

app.get("/relatedarticle",function(req,res){
  clicks[9][0]=related[0];
  clicks[9][1]=related[1];
  clicks[9][2]=related[2];
  clicks[9][3]=related[3];
  var query =related[0];

  con.query("UPDATE new_table SET user_1= 1  WHERE idnew_table = \'?\' ",[clicks[9][3]],function(error,results1){
    if (error)
        throw error;
  con.query('SELECT idnew_table,text,title FROM new_table ',[query], function (error, results, fields) {
      if (error)
          throw error;
          for(var i=0;i<results.length;i++)
          {
            documents[i]=results[i].title;
          }


          recommender.tfidf(query, documents, (sortedDocs) => {
            console.log(sortedDocs[1]);
            for(var i=0;i<results.length;i++)
            {
              if(results[i].title==sortedDocs[1])
              {
                related[1]=results[i].text;
                related[2]=results[i].text;
                related[3]=results[i].idnew_table;
              }
           }

            related[1] = truncate(related[1],50)
            function truncate(str, no_words) {
           return str.split(" ").splice(0,no_words).join(" ");
       }
       related[1]=related[1]+"..."+" click here to read more.. You'll love it."
            related[0]=sortedDocs[1];
            res.render("single",{
                            clicks:clicks[9],
                            related:related
                           });

  });

  });
});
});
app.get("/branches",function(req,res){
  // var upvote = req.body.upvote;
  res.render("branches",{

         //source1:source
  });

});
app.get("/",function(req,res){

  res.render("front");

});

app.get("/reset",function(req,res){

  con.query("UPDATE new_table SET user_1= 0  WHERE idnew_table != '1000' ",function(error,results1){
    if (error)
        throw error;
        con.query("UPDATE new_table SET seen= 0  WHERE idnew_table != '1000' ",function(error,results1){
          if (error)
              throw error;
              con.query("UPDATE user_table SET user_1= 0  WHERE branch != 'nil' ",function(error,results1){
                if (error)
                    throw error;
  res.render("reset");
});
});
});
});

app.get("/feed",function(req,res){
  con.query('SELECT * FROM new_table ORDER BY RAND() LIMIT 9', function (error, results, fields) {
      if (error)
          throw error;
     //console.log(results);
       for(var i=0;i<9;i++)
       {
       clicks[i][0]=results[i].title ;
       clicks[i][1]=results[i].text;
       clicks[i][2]=results[i].text;
        clicks[i][3]=results[i].idnew_table;

       clicks[i][1] = truncate(clicks[i][1],50)
       function truncate(str, no_words) {
      return str.split(" ").splice(0,no_words).join(" ");
  }
  clicks[i][1]=clicks[i][1]+"..."+" click here to read more.. You'll love it."

     };

     con.query("UPDATE new_table SET seen = 1  WHERE idnew_table = \'?\' OR idnew_table = \'?\' OR idnew_table = \'?\' OR idnew_table = \'?\' OR idnew_table = \'?\' OR idnew_table = \'?\' OR idnew_table = \'?\' OR idnew_table = \'?\' OR idnew_table = \'?\' ",[clicks[0][3],clicks[1][3],clicks[2][3],clicks[3][3],clicks[4][3],clicks[5][3],clicks[6][3],clicks[7][3],clicks[8][3]],function(error,results1){
       if (error)
           throw error;

            eventEmitter.emit('forfeed',clicks);


             res.render("index",{
              clicks:clicks
                    //source1:source
             });
  });
});

});


app.listen(3000);

 app.post('/id',function (req, res) {



   var user1val=[];
   for(var i=0;i<7;i++)
   {
     user1val.push(0.0000);
   }
   con.query('SELECT aero,user_1 FROM new_table where (seen != 0 && (((aero >= chem) + (aero >= civil) + (aero >= cs) + (aero >= ece) + (aero >= eee) + (aero >= mech) )>=4)) ', function(error,results, fields) {
             if (error)
                 throw error;
             for(var i=0;i<results.length;i++)
             {
               user1val[0]=user1val[0]+(results[i].aero*results[i].user_1);
             };


                   con.query('SELECT chem,user_1 FROM new_table where (seen != 0 && (((chem >= aero) + (chem >= civil) + (chem >= cs) + (chem >= ece) + (chem >= eee) + (chem >= mech) )>=4)) ', function(error,results, fields) {
                             if (error)
                                 throw error;
                             for(var i=0;i<results.length;i++)
                             {
                               user1val[1]=user1val[1]+(results[i].chem*results[i].user_1);
                             };


                                   con.query('SELECT civil,user_1 FROM new_table where (seen != 0 && (((civil >= chem) + (civil >= aero) + (civil >= cs) + (civil >= ece) + (civil >= eee) + (civil >= mech) )>=4)) ', function(error,results, fields) {
                                             if (error)
                                                 throw error;
                                             for(var i=0;i<results.length;i++)
                                             {
                                               user1val[2]=user1val[2]+(results[i].civil*results[i].user_1);
                                             }



                                                   con.query('SELECT cs,user_1 FROM new_table where (seen != 0 && (((cs >= chem) + (cs >= civil) + (aero <= cs) + (cs >= ece) + (cs >= eee) + (cs >= mech) )>=4)) ', function(error,results, fields) {
                                                             if (error)
                                                                 throw error;
                                                             for(var i=0;i<results.length;i++)
                                                             {
                                                               user1val[3]=user1val[3]+(results[i].cs*results[i].user_1);
                                                             }



                                                                   con.query('SELECT ece,user_1 FROM new_table where (seen != 0 && (((ece >= chem) + (ece >= civil) + (ece >= cs) + (ece >= aero) + (ece >= eee) + (ece >= mech) )>=4)) ', function(error,results, fields) {
                                                                             if (error)
                                                                                 throw error;
                                                                             for(var i=0;i<results.length;i++)
                                                                             {
                                                                               user1val[4]=user1val[4]+(results[i].ece*results[i].user_1);
                                                                             }


                                                                             con.query('SELECT eee,user_1 FROM new_table where (seen != 0 && (((eee >= chem) + (eee >= civil) + (eee >= cs) + (eee >= aero) + (ece <= eee) + (eee >= mech) )>=4)) ', function(error,results, fields) {
                                                                                       if (error)
                                                                                           throw error;
                                                                                       for(var i=0;i<results.length;i++)
                                                                                       {
                                                                                         user1val[5]=user1val[5]+(results[i].eee*results[i].user_1);
                                                                                       }


                                                                                       con.query('SELECT mech,user_1 FROM new_table where (seen != 0 && (((mech >= chem) + (mech >= civil) + (mech >= cs) + (mech >= aero) + (mech >= eee) + (ece <= mech) )>=4)) ', function(error,results, fields) {
                                                                                                 if (error)
                                                                                                     throw error;
                                                                                                 for(var i=0;i<results.length;i++)
                                                                                                 {
                                                                                                   user1val[6]=user1val[6]+(results[i].mech*results[i].user_1);
                                                                                                 }
                                                                                                console.log("User1's values for all 7 departments : ")
                                                                                                console.log(user1val);


                                                                                                 var sql = "UPDATE user_table SET user_1 = ?  WHERE branch = \'aero\'";
                                                                                                 sql = mysql.format(sql, user1val[0]);
                                                                                                 con.query(sql,function(error,results1){
                                                                                                   if (error)
                                                                                                       throw error;

                                                                                                       var sql = "UPDATE user_table SET user_1 = ?  WHERE branch = \'chem\'";
                                                                                                       sql = mysql.format(sql, user1val[1]);
                                                                                                       con.query(sql,function(error,results1){
                                                                                                         if (error)
                                                                                                             throw error;

                                                                                                             var sql = "UPDATE user_table SET user_1 = ?  WHERE branch = \'civil\'";
                                                                                                             sql = mysql.format(sql, user1val[2]);
                                                                                                             con.query(sql,function(error,results1){
                                                                                                               if (error)
                                                                                                                   throw error;

                                                                                                                   var sql = "UPDATE user_table SET user_1 = ?  WHERE branch = \'cs\'";
                                                                                                                   sql = mysql.format(sql, user1val[3]);
                                                                                                                   con.query(sql,function(error,results1){
                                                                                                                     if (error)
                                                                                                                         throw error;

                                                                                                                         var sql = "UPDATE user_table SET user_1 = ?  WHERE branch = \'ece\'";
                                                                                                                         sql = mysql.format(sql, user1val[4]);
                                                                                                                         con.query(sql,function(error,results1){
                                                                                                                           if (error)
                                                                                                                               throw error;

                                                                                                                               var sql = "UPDATE user_table SET user_1 = ?  WHERE branch = \'eee\'";
                                                                                                                               sql = mysql.format(sql, user1val[5]);
                                                                                                                               con.query(sql,function(error,results1){
                                                                                                                                 if (error)
                                                                                                                                     throw error;

                                                                                                                                     var sql = "UPDATE user_table SET user_1 = ?  WHERE branch = \'mech\'";
                                                                                                                                     sql = mysql.format(sql, user1val[6]);
                                                                                                                                     con.query(sql,function(error,results1){
                                                                                                                                       if (error)
                                                                                                                                           throw error;
                                                                                                                                             var flag =[0,0,0];
                                                                                                                                           con.query('SELECT * FROM user_table ORDER BY user_1 DESC LIMIT 3', function(error,results, fields) {
                                                                                                                                                     if (error)
                                                                                                                                                         throw error;

                                                                                                                                                     var top_3 = ['','',''];
                                                                                                                                                     var branches =["aero","chem","civil","cs","ece","eee","mech"];
                                                                                                                                                     var top_3_val =[0.000,0.000,0.000]
                                                                                                                                                     for(var i=0;i<3;i++)
                                                                                                                                                     {
                                                                                                                                                        top_3[i]=results[i].branch;
                                                                                                                                                        for(var j=0;j<7;j++)
                                                                                                                                                        {
                                                                                                                                                           if(top_3[i]==branches[j])
                                                                                                                                                           {
                                                                                                                                                               flag[i]=j;
                                                                                                                                                               break;
                                                                                                                                                           }

                                                                                                                                                        }

                                                                                                                                                        top_3_val[i]=results[i].user_1;
                                                                                                                                                     }
                                                                                                                                                     var overall0=[];
                                                                                                                                                     var overall1=[];
                                                                                                                                                     var overall2=[];
                                                                                                                                                     console.log("Your top 3 Branches currently :")
                                                                                                                                                    console.log(flag);
                                                                                                                                                     var ids=[];
                                                                                                                                                     con.query("SELECT idnew_table FROM new_table WHERE seen != 1 ",function(error,results1,fields){
                                                                                                                                                       if (error)
                                                                                                                                                           throw error;

                                                                                                                                                           for(var i=0;i<results1.length;i++)
                                                                                                                                                             {
                                                                                                                                                               ids[i]=results1[i].idnew_table;

                                                                                                                                                             }
                                                                                                                                                            // console.log("all the ids : ");


                                                                                                                                                      var val =top_3[0];
                                                                                                                                                       con.query("SELECT "+val+" FROM new_table WHERE seen != 1 ",function(error,results1,fields){
                                                                                                                                                         if (error)
                                                                                                                                                             throw error;
                                                                                                                                                        //   for(var i=0;i<results1.length;i++)
                                                                                                                                                        // {
                                                                                                                                                         //   overall[i][0]=(results1[i].cs);
                                                                                                                                                         // }
                                                                                                                                                         // console.log(overall);

                                                                                                                                                         for(var i=0;i<results1.length;i++)
                                                                                                                                                           {
                                                                                                                                                             // for(val i=0;i<3;i++)
                                                                                                                                                             // {



                                                                                                                                                           if(flag[0]==0)
                                                                                                                                                              overall0[i]=(results1[i].aero);
                                                                                                                                                             if(flag[0]==1)
                                                                                                                                                               overall0[i]=(results1[i].chem);
                                                                                                                                                               if(flag[0]==2)
                                                                                                                                                                 overall0[i]=(results1[i].civil);
                                                                                                                                                                 if(flag[0]==3)
                                                                                                                                                                   overall0[i]=(results1[i].cs);
                                                                                                                                                                   if(flag[0]==4)
                                                                                                                                                                     overall0[i]=(results1[i].ece);
                                                                                                                                                                     if(flag[0]==5)
                                                                                                                                                                       overall0[i]=(results1[i].eee);
                                                                                                                                                                       if(flag[0]==6)
                                                                                                                                                                         overall0[i]=(results1[i].mech);



                                                                                                                                                         }

                                                                                                                                                         var val =top_3[1];
                                                                                                                                                          con.query("SELECT "+val+" FROM new_table WHERE seen != 1 ",function(error,results1,fields){
                                                                                                                                                            if (error)
                                                                                                                                                                throw error;
                                                                                                                                                           //   for(var i=0;i<results1.length;i++)
                                                                                                                                                           // {
                                                                                                                                                            //   overall[i][0]=(results1[i].cs);
                                                                                                                                                            // }
                                                                                                                                                            // console.log(overall);

                                                                                                                                                            for(var i=0;i<results1.length;i++)
                                                                                                                                                              {
                                                                                                                                                                // for(val i=0;i<3;i++)
                                                                                                                                                                // {

                                                                                                                                                              if(flag[1]==0)
                                                                                                                                                                overall1[i]=(results1[i].aero);
                                                                                                                                                                if(flag[1]==1)
                                                                                                                                                                 overall1[i]=(results1[i].chem);
                                                                                                                                                                  if(flag[1]==2)
                                                                                                                                                                   overall1[i]=(results1[i].civil);
                                                                                                                                                                    if(flag[1]==3)
                                                                                                                                                                      overall1[i]=(results1[i].cs);
                                                                                                                                                                      if(flag[1]==4)
                                                                                                                                                                        overall1[i]=(results1[i].ece);
                                                                                                                                                                        if(flag[1]==5)
                                                                                                                                                                          overall1[i]=(results1[i].eee);
                                                                                                                                                                          if(flag[1]==6)
                                                                                                                                                                           overall1[i]=(results1[i].mech);



                                                                                                                                                            }

                                                                                                                                                            var val =top_3[2];
                                                                                                                                                             con.query("SELECT "+val+" FROM new_table WHERE seen != 1 ",function(error,results1,fields){
                                                                                                                                                               if (error)
                                                                                                                                                                   throw error;
                                                                                                                                                              //   for(var i=0;i<results1.length;i++)
                                                                                                                                                              // {
                                                                                                                                                               //   overall[i][0]=(results1[i].cs);
                                                                                                                                                               // }
                                                                                                                                                                //console.log(overall0);

                                                                                                                                                               for(var i=0;i<results1.length;i++)
                                                                                                                                                                 {
                                                                                                                                                                   // for(val i=0;i<3;i++)
                                                                                                                                                                   // {

                                                                                                                                                                 if(flag[2]==0)
                                                                                                                                                                   overall2[i]=(results1[i].aero);
                                                                                                                                                                   if(flag[2]==1)
                                                                                                                                                                       overall2[i]=(results1[i].chem);
                                                                                                                                                                     if(flag[2]==2)
                                                                                                                                                                         overall2[i]=(results1[i].civil);
                                                                                                                                                                       if(flag[2]==3)
                                                                                                                                                                           overall2[i]=(results1[i].cs);
                                                                                                                                                                         if(flag[2]==4)
                                                                                                                                                                             overall2[i]=(results1[i].ece);
                                                                                                                                                                           if(flag[2]==5)
                                                                                                                                                                               overall2[i]=(results1[i].eee);
                                                                                                                                                                             if(flag[2]==6)
                                                                                                                                                                                 overall2[i]=(results1[i].mech);



                                                                                                                                                               }

   // var Q = require( "q" );
   //  var defered = Q.defer();
                                                                                                                                                                 var distances=[];
                                                                                                                                                                 for(var i=0;i<results1.length;i++)
                                                                                                                                                                 {
                                                                                                                                                                   distances[i]=  (Math.sqrt(top_3_val[0])*overall0[i])+(Math.sqrt(top_3_val[1])*overall1[i])+(Math.sqrt(top_3_val[2])*overall2[i]);
                                                                                                                                                                 }

   //console.log(distances);

                                                                                                                                                                 var id_dist=[];
                                                                                                                                                                 for(var i=0;i<results1.length;i++)
                                                                                                                                                                 {

                                                                                                                                                                       id_dist.push([ids[i],distances[i]]);


                                                                                                                                                                 }


                                                                                                                                                                 id_dist.sort(compareSecondColumn);

                                                                                                                                                                 function compareSecondColumn(a, b) {
                                                                                                                                                                     if (a[1] === b[1]) {
                                                                                                                                                                         return 0;
                                                                                                                                                                     }
                                                                                                                                                                     else {
                                                                                                                                                                         return (a[1] > b[1]) ? -1 : 1;
                                                                                                                                                                     }
                                                                                                                                                                 }

                                                                                                                                                                      var ids_sorted=[];

                                                                                                                                                                      //console.log("The ids and distances of all articles sorted :")
                                                                                                                                                                  //  console.log(id_dist);


                                                                                                                                                                           for(var i=0; i<id_dist.length; i++){
                                                                                                                                                                             if(i<5||i>=(id_dist.length-2))
                                                                                                                                                                             {
                                                                                                                                                                               ids_sorted.push(id_dist[i][0]);

                                                                                                                                                                             }

                                                                                                                                                                           }

                                                                                                                                                                        console.log("The ids of all the chosen articles in priority order :")

                                                                                                                                                                       console.log(ids_sorted);

                                                                                                                                                                       var text=[];


                                                                                                                                                                       con.query("SELECT title,text,idnew_table FROM new_table WHERE idnew_table = ?",[ids_sorted[0]],function(error,results,fields){
                                                                                                                                                                         if (error)
                                                                                                                                                                             throw error;
                                                                                                                                                                         clicks[0][0]=results[0].title;
                                                                                                                                                                         clicks[0][1]=results[0].text;
                                                                                                                                                                         clicks[0][2]=results[0].text;
                                                                                                                                                                         clicks[0][3]= results[0].idnew_table;
                                                                                                                                                                       //  console.log(clicks);

                                                                                                                                                                         con.query("SELECT title,text,idnew_table FROM new_table WHERE idnew_table =?",[ids_sorted[1]],function(error,results,fields){
                                                                                                                                                                           if (error)
                                                                                                                                                                               throw error;
                                                                                                                                                                           clicks[1][0]=results[0].title;
                                                                                                                                                                           clicks[1][1]=results[0].text;
                                                                                                                                                                           clicks[1][2]=results[0].text;
                                                                                                                                                                           clicks[1][3]= results[0].idnew_table;

                                                                                                                                                                           con.query("SELECT title,text,idnew_table FROM new_table WHERE idnew_table =?",[ids_sorted[2]],function(error,results,fields){
                                                                                                                                                                             if (error)
                                                                                                                                                                                 throw error;
                                                                                                                                                                             clicks[3][0]=results[0].title;
                                                                                                                                                                             clicks[3][1]=results[0].text;
                                                                                                                                                                             clicks[3][2]=results[0].text;
                                                                                                                                                                             clicks[3][3]= results[0].idnew_table;

                                                                                                                                                                             con.query("SELECT title,text,idnew_table FROM new_table WHERE idnew_table=? ",[ids_sorted[3]],function(error,results,fields){
                                                                                                                                                                               if (error)
                                                                                                                                                                                   throw error;
                                                                                                                                                                               clicks[5][0]=results[0].title;
                                                                                                                                                                               clicks[5][1]=results[0].text;
                                                                                                                                                                               clicks[5][2]=results[0].text;
                                                                                                                                                                               clicks[5][3]= results[0].idnew_table;

                                                                                                                                                                               con.query("SELECT title,text,idnew_table FROM new_table WHERE idnew_table=? ",[ids_sorted[4]],function(error,results,fields){
                                                                                                                                                                                 if (error)
                                                                                                                                                                                     throw error;
                                                                                                                                                                                 clicks[8][0]=results[0].title;
                                                                                                                                                                                 clicks[8][1]=results[0].text;
                                                                                                                                                                                 clicks[8][2]=results[0].text;
                                                                                                                                                                                 clicks[8][3]= results[0].idnew_table;

                                                                                                                                                                                 con.query("SELECT title,text,idnew_table FROM new_table WHERE idnew_table=? ",[ids_sorted[5]],function(error,results,fields){
                                                                                                                                                                                   if (error)
                                                                                                                                                                                       throw error;
                                                                                                                                                                                   clicks[6][0]=results[0].title;
                                                                                                                                                                                   clicks[6][1]=results[0].text;
                                                                                                                                                                                   clicks[6][2]=results[0].text;
                                                                                                                                                                                   clicks[6][3]= results[0].idnew_table;

                                                                                                                                                                                   con.query("SELECT title,text,idnew_table FROM new_table WHERE idnew_table=? ",[ids_sorted[6]],function(error,results,fields){
                                                                                                                                                                                     if (error)
                                                                                                                                                                                         throw error;
                                                                                                                                                                                     clicks[7][0]=results[0].title;
                                                                                                                                                                                     clicks[7][1]=results[0].text;
                                                                                                                                                                                     clicks[7][2]=results[0].text;
                                                                                                                                                                                     clicks[7][3]= results[0].idnew_table;

                                                                                                                                                                                     con.query("SELECT title,text,idnew_table FROM new_table ORDER BY RAND() LIMIT 1",function(error,results,fields){
                                                                                                                                                                                       if (error)
                                                                                                                                                                                           throw error;
                                                                                                                                                                                       clicks[2][0]= results[0].title;;
                                                                                                                                                                                       //
                                                                                                                                                                                       clicks[2][1]=results[0].text;
                                                                                                                                                                                       clicks[2][2]=results[0].text;
                                                                                                                                                                                       clicks[2][3]= results[0].idnew_table;

                                                                                                                                                                                       con.query("SELECT title,text,idnew_table FROM new_table ORDER BY RAND() LIMIT 1",function(error,results,fields){

                                                                                                                                                                                         if (error)
                                                                                                                                                                                             throw error;
                                                                                                                                                                                         clicks[4][0]=results[0].title;
                                                                                                                                                                                         clicks[4][1]=results[0].text;
                                                                                                                                                                                         clicks[4][2]=results[0].text;
                                                                                                                                                                                         clicks[4][3]= results[0].idnew_table;

                                                                                                                                                                                         // var sql = "UPDATE new_table SET seen = 1  WHERE idnew_table = \'?\' OR idnew_table = \'?\'";
                                                                                                                                                                                         // sql = mysql.format(sql, clicks[0][3]);
                                                                                                                                                                                         // con.query(sql,function(error,results1){
                                                                                                                                                                                         //   if (error)
                                                                                                                                                                                         //       throw error;
                                                                                                                                                                                         con.query("UPDATE new_table SET seen = 1  WHERE idnew_table = \'?\' OR idnew_table = \'?\' OR idnew_table = \'?\' OR idnew_table = \'?\' OR idnew_table = \'?\' OR idnew_table = \'?\' OR idnew_table = \'?\' OR idnew_table = \'?\' OR idnew_table = \'?\' ",[clicks[0][3],clicks[1][3],clicks[2][3],clicks[3][3],clicks[4][3],clicks[5][3],clicks[6][3],clicks[7][3],clicks[8][3]],function(error,results1){
                                                                                                                                                                                           if (error)
                                                                                                                                                                                               throw error;


                                                                                                                                                                                          for(var i=0;i<9;i++)
                                                                                                                                                                                          {
                                                                                                                                                                                            clicks[i][1] = truncate(clicks[i][1],50)
                                                                                                                                                                                            function truncate(str, no_words) {
                                                                                                                                                                                           return str.split(" ").splice(0,no_words).join(" ");
                                                                                                                                                                                           }
                                                                                                                                                                                      clicks[i][1]=clicks[i][1]+"..."+" click here to read more.. You'll love it.";

                                                                                                                                                                                         }

                                                                                                                                                                                          eventEmitter.emit('scream',clicks);

                                                                                                                                                                                          res.render("index",{
                                                                                                                                                                                           clicks:clicks

                                                                                                                                                                                          });


                                                                                                                                                                                           });

                                                                                                                                                                                         });

                                                                                                                                                                                         });


                                                                                                                                                                                       });



                                                                                                                                                                                     });


                                                                                                                                                                                   });






                                                                                                                                                                                 });






                                                                                                                                                                               });






                                                                                                                                                                            });





                                                                                                                                                                           });
















                                                                                                                                                               });





                                                                                                                                                             });




                                                                                                                                                          });




                                                                                                                                                       });
                                                                                                                                                     //}


                                                                                                                                                       //console.log(results1.top_3[0]);









                                                                                                                                                   });




                                                                                                       });
                                                                                                 });
                                                                                       });





                                                                                       });
                                                                             });





                                                                             });
                                                                   });



                                                             });
                                                   });




                                             });
                                   });




                             });
                   });




             });

});
//
// // var documents=[];
// // var query ='';
// // eventEmitter.on('article1', function(queri) {
// //   query=queri;
// //   con.query('SELECT idnew_table,title,text FROM new_table  ', function (error, results, fields) {
// //       if (error)
// //           throw error;
// //           for(var i=0;i<results.length;i++)
// //           {
// //             documents.push(results[i].text);
// //             // documents[i][1]=results[i].title;
// //             // documents[i][2]=results[i].text;
// //           }
// //
// //
// //
// //           recommender.tfidf(query, documents, (sortedDocs) => {
// //             console.log(sortedDocs);
// //            con.query("SELECT title,text,idnew_table FROM new_table WHERE text = ?",[sortedDocs[0]],function(error,results,fields){
// //                 if (error)
// //                     throw error;
// //                   related[0][0]=results.title;
// //                   related[0][1]=results.text;
// //                   related[0][2]=results.text;
// //                   related[0][3]=results.idnew_table;
// //
// //                   con.query("SELECT title,text,idnew_table FROM new_table WHERE text = ?",[sortedDocs[1]],function(error,results,fields){
// //                        if (error)
// //                            throw error;
// //                          related[1][0]=results.title;
// //                          related[1][1]=results.text;
// //                          related[1][2]=results.text;
// //                          related[1][3]=results.idnew_table;
// //
// //
// //                          });
// //
// //                          con.query("SELECT title,text,idnew_table FROM new_table WHERE text = ?",[sortedDocs[2]],function(error,results,fields){
// //                               if (error)
// //                                   throw error;
// //                                 related[2][0]=results.title;
// //                                 related[2][1]=results.text;
// //                                 related[2][2]=results.text;
// //                                 related[2][3]=results.idnew_table;
// //
// //                                   eventEmitter.emit('relatedover',related);
// //                                 });
// //
// //
// //                   });
// //
// //
// //
// //
// //
// //
// //
// //
// //         });
// //
// //
// //
// //
// //   });
// //
// // })
