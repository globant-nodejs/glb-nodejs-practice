
var gitHubController=require('./controllers/githubController.js'),
    controlParam=require('./functions/controlParam.js'),
    error=require('./functions/errorFunction.js'),
    express=require('express'),
    routes=express.Router();

routes.param('name', controlParam.control);
routes.get('/:name',gitHubController.getRepositories);
routes.get('/:name/:repo/commits',gitHubController.getCommits);
routes.use(error.error404);


module.exports = routes;