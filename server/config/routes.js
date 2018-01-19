const userController = require('../controllers/users.js');
const surveyController = require('../controllers/surveys.js');
module.exports = function(app) {

  app.post('/users', userController.create);
  
  app.post('/login', userController.login);

  app.get('/survey', surveyController.show);
  app.post('/survey', surveyController.create);
  app.delete('/survey/:id', surveyController.destroy);
  app.put('/survey/:id', surveyController.update);

  app.get('/poll/:id/', surveyController.getPoll);

  //app.put('/survey', surveyController.update);
  //app.post('/tasks', tasks.create);
  app.all("*", (request, response) => { response.sendFile(path.resolve("./public/dist/index.html")) });
}
