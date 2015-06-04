var githubController=require('./controllers/githubController.js'),
    express=require('express'),
    routes=express.Router();

routes.get('/:name',githubController.getRepositories);
routes.get('/:name/:repo/commits',githubController.getCommits);
routes.get('/:name/:repo/pulls',githubController.getPullRequest);

module.exports = routes;