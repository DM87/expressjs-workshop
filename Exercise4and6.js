var Sequelize = require("sequelize");
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))


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
User.hasMany(Content); 

User.belongsToMany(Content, {through: Vote, as: 'Upvotes'}); // This will add an `add`
Content.belongsToMany(User, {through: Vote});

function createUser (user, pass, callback) {
    var usercreator = User.create({username:user, password:pass});
    callback(usercreator);
}

function createContent (userID, titre, urllink, callback) {
    var contentcreator;
    User.findById(userID).then(function(user){contentcreator = user.createContent({title:titre, url:urllink})});
    callback(contentcreator);
}

app.get("/", function(request, response) {
    Content.findAll({order: 'createdAt DESC', include:User}).then(function(val){
        var lists = "";
        val.forEach(function(item){
            lists = lists +  "<li><h2><a href="+item.url+">"+item.title+"</a></h2><p>Created by: "+ item.user.username +"</p></li>";
        });
        
        var finalResult = "<div><h1>List of contents</h1><ul>"+lists+"</ul></div>";
        response.send(finalResult)
    })
})


app.get('/createContent', function(request, response){
    response.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/createContent', function(request, response){
    User.findById(1).then(function(user) {
        return user.createContent({
            title: request.body.title,
            url: request.body.url
        })
    }).then(function(val){
        response.redirect("/")
    })
});

app.listen(process.env.PORT);

