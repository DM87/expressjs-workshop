var express = require('express');
var app = express();


app.get('/op/:operation/:number1/:number2', function(request, response) {
  var solution = {
    operator: request.params['operation'],
    number1:request.params['number1'],
    number2: request.params['number2']
  };
  switch  (solution.operator) {
    case 'add':
    solution['answer'] = (parseInt(solution.number1) + parseInt(solution.number2));
    break;
    case 'mult':
    solution['answer'] = (parseInt(solution.number1) * parseInt(solution.number2))
    break;
    case 'sub':
    solution['answer'] = (parseInt(solution.number1) - parseInt(solution.number2))
    break;
    case 'div':
    solution['answer'] = (parseInt(solution.number1) / parseInt(solution.number2))
    break;
    default:
    solution['answer'] = 'An error occured, please cheack your operator'
  }
     response.send(solution);
})

/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
