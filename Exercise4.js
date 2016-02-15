var Sequelize = require("sequelize");
var express = require('express');
var app = express();



var db = new Sequelize('redditproject', 'dm87', '',{dialect:'mysql'});

var User = db.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING // TODO: make the passwords more secure!
});

// Even though the content belongs to users, we will setup the userId relationship later
var Content = db.define('content', {
    url: Sequelize.STRING,
    title: Sequelize.STRING
});

// Even though a vote has a link to user and content, we will setup the relationship later
var Vote = db.define('vote', {
    upVote: Sequelize.BOOLEAN
});

// User <-> Content relationship
Content.belongsTo(User); // This will add a `setUser` function on content objects
User.hasMany(Content); // This will add an `addContent` function on user objects

// User <-> Vote <-> Content relationship
User.belongsToMany(Content, {through: Vote, as: 'Upvotes'}); // This will add an `add`
Content.belongsToMany(User, {through: Vote});


// createContent(1, 'On February 14th Gravity will pause for 14 seconds in Quebec.', 'www.foxnews.ca/14-february/gravity-pause', function (val){console.log(val)})

function createUser (user, pass, callback) {
    var usercreator = User.create({username:user, password:pass});
    callback(usercreator);
}

function createContent (userID, titre, urllink, callback) {
    var contentcreator;
    User.findById(userID).then(function(user){contentcreator = user.createContent({title:titre, url:urllink})});
    callback(contentcreator);
}


Content.findAll({limit: 5, order: 'createdAt DESC'}).then(function(val){
    app.get('/', function(request, response) {
        
        var lists = "";
        val.forEach(function(item){
            lists = lists +  "<li><h2><a href>"+item.title+"</a></h2><p>Created by: "+ item.userId +"</p></li>"
        })
        
        var finalResult = "<div><ul>"+lists+"</ul></div>"
        response.send(finalResult)
    // response.send(JSON.stringify(val));
});});

var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

