var getRepos=require('./controllers/githubController.js'),
    controlParam=require('./controllers/urlParamController.js'),
    errorCtrl=require('./controllers/errorController.js'),
    express=require('express'),
    routes=express.Router();


routes.param('name', controlParam.controlParam);
routes.get('/:name',getRepos.githubController);
routes.use(errorCtrl.error404);
routes.use(errorCtrl.error500A);
routes.use(errorCtrl.error500B);

module.exports = routes;