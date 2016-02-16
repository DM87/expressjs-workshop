var express = require('express');
var app = express();
var path = require('path');

app.get('/createContent', function(request, response){
    response.sendFile(path.join(__dirname, 'form.html'));
})

app.listen(process.env.PORT);