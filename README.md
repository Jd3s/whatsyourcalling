# What's your calling ?

Instructions for the demo site. Team Bruh-grammers, IIT-M Ai challenge. Theme - Education.

 ![picture alt](https://github.com/jayasuriyars/whatsyourcalling/blob/master/desc_images/site.jpeg)


 Just don't look at the code, already.

> Read the proposal.pdf file.

The tech stack and algorithm have been tinkered a bit.

> Read the writeup.pdf file.

We'll setup the environment for the site to run.

> > Take a deep breath



### 1.Install node Js. ###

 https://nodejs.org/en/download/
 
### 2. Install npm ###

https://www.npmjs.com/get-npm
 
### 3. Install MySql ### 

This may take some time. When on Linux or Mac OS, you'll have a bit trouble concerning root access permissions.   

https://dev.mysql.com/doc/refman/8.0/en/installing.html

### 4. Install MySql Workbench. ###
 
### 5. Establish a connection between the workbench and MySql. ###

![picture alt](https://github.com/jayasuriyars/whatsyourcalling/blob/master/desc_images/workbench.png)

### 6. Install node js dependencies. ###
> npm install express body-parser ejs recommender http-server sentiment mysql nodemon

### 7. Open MySql workbench, create a new schema, name it db_connect ###
 
 *PLEASE TAKE EXTRA CARE IN DOING THIS STEP*
 

 Run this query.
 

   >CREATE TABLE `db_connect`.`new_table` (
    `idnew_table` INT(11) NOT NULL,
    `title` VARCHAR(10000) NULL,
    `text` VARCHAR(40000) NULL,
    `aero` DECIMAL(10,9) NULL,
   `chem` DECIMAL(10,9) NULL,
   `civil` DECIMAL(10,9) NULL,
   `cs` DECIMAL(10,9) NULL,
   `ece` DECIMAL(10,9) NULL,
   `eee` DECIMAL(10,9) NULL,
   `mech` DECIMAL(10,9) NULL,
   `user_1` DECIMAL(20,10)NULL,
   `seen` INT(10)NULL,
    PRIMARY KEY (`idnew_table`));

After that, run this query.

  >   CREATE TABLE `db_connect`.`user_table` (
    `iduser_table` INT NOT NULL,
    `branch` VARCHAR(45) NULL,
    `user_1` DECIMAL(20,10) NULL,
    PRIMARY KEY (`iduser_table`));

 

 *NAME THE COLOUMNS AND THEIR DATATYPES CORRECTLY. CHANGING THIS A BIT, MAY MESS UP THE CODE* 
 
 
### 8. Import results.csv file into new_table. Import branch.csv in user_table. ###

> Want to know how this file came aboard, read Algorithm/model applied in writeup.pdf

Your DB should now look like this :

![picture alt](https://github.com/jayasuriyars/whatsyourcalling/blob/master/desc_images/mysql.png)

### 9. Open index.js file. The code inside looks like spaghetti but does wonders. ###
 > The code is unformmated. Yet, it does what we intended it to do.
 ### 10. Fill in your DB connection information like username, password etc., ###
 
 ![picture alt](https://github.com/jayasuriyars/whatsyourcalling/blob/master/desc_images/db.jpg)
 
 
 
 
 
 
Time for some action.
 
 Open up terminal / command prompt.
 
> node index.js

You should see th word "Connected !" in your terminal window.

 ![picture alt](https://github.com/jayasuriyars/whatsyourcalling/blob/master/desc_images/terminal.jpg)


Visit http://localhost:3000/



Screenshots from the site :


 ![picture alt](https://github.com/jayasuriyars/whatsyourcalling/blob/master/desc_images/article.jpg)
 
 
 ![picture alt](https://github.com/jayasuriyars/whatsyourcalling/blob/master/desc_images/review.jpg)
 
 > We'll not reveal too much here ! See for yourself.
 
 
We havent added user login feautre yet. The default user is user_1. If you want to reset his preferences, click on 'Reset'button on the feed.

 
 Incase of a doubt, please feel free to reach out at jayasuriyars@gmail.com or through the contact number on the front page of the proposal.pdf file.
 
 
