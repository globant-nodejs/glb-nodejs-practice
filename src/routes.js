var githubController=require('./controllers/githubController.js'),
    express=require('express'),
    routes=express.Router();

routes.get('/:name',githubController.getRepositories);
routes.get('/:name/:repo',githubController.getRepository);
routes.get('/:name/:repo/pulls',githubController.getPullRequest);
routes.get('/:name/:repo/pulls/:number',githubController.getOnePullRequest);
routes.get('/:name/:repo/commits',githubController.getCommits);
routes.get('/:name/:repo/commits/:sha',githubController.getOneCommit);



module.exports = routes;