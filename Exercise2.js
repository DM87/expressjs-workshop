var express = require('express');
var app = express();

app.get('/hello', function(request, response) {
    response.send('Hello World');
});

app.get('/hello/:firstName', function(request, response) {
    response.send('<h1>Hello <span style="color:red">' + request.params.firstName + '</span>!</h1>');
})

app.listen(process.env.PORT)
