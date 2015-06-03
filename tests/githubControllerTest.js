var chai=require('chai'),
expect=require('chai').expect,
sinon = require('sinon'),
replyReposJson=require('./reply/repos.json'),
replyCommitJson=require('./reply/commits.json'),
gitHubService=require('../src/services/githubService.js'),
gitHubController=require('../src/controllers/githubController.js'),
reposHal=require('./reply/reposhal.json'),
commitHal=require('./reply/commithal.json'),
replyError=require('./reply/error404.json');

describe('Github Controller Tests/',function(){


  describe('Get Repositories Test/',function(){
    afterEach(function(done) {
      gitHubService.getReposByUser.restore();
      done();
    });
    it('Should Return a Correct Repositories-HAL Response/',function(){     
      var mock=sinon.stub(gitHubService,'getReposByUser',function(username,callback){
        callback(null,replyReposJson);
      });

      gitHubController.getRepositories({params:{name:'MDIAZ88'}},{json:function(response){
        expect(response).to.deep.equal(reposHal);
      }});
    });
  });

  describe('Get Error When You Send The Incorrect Username As Parameter/',function(){
    afterEach(function(done) {
      gitHubService.getReposByUser.restore();
      done();
    });
    it('Should Return a 404 Error/',function(){
      var mock=sinon.stub(gitHubService,'getReposByUser',function(username,callback){
        callback(replyError,{});
      });

      gitHubController.getRepositories({params:{name:'lala'}},{json:function(response){
        expect(response).to.deep.equal(replyError);
      }});

    });
  });

  describe('Get Commits Test/',function(){
    afterEach(function(done) {
      gitHubService.getCommitsByRepo.restore();
      done();
    });
    it('Should Return a Correct Commits-HAL Response/',function(){

      var mock=sinon.stub(gitHubService,'getCommitsByRepo',function(username,repository,callback){
        callback(null,replyCommitJson);
      });

      gitHubController.getCommits({params:{name:'MDIAZ88',repo:'angular-lab'}},{json:function(response){
        expect(response).to.deep.equal(commitHal);
      }});
    });
  });

  describe('Get Error When You Send The Incorrect Repository As Parameter/',function(){
    afterEach(function(done) {
      gitHubService.getCommitsByRepo.restore();
      done();
    });
    it('Should Return a 404 Error/',function(){
      var mock=sinon.stub(gitHubService,'getCommitsByRepo',function(username,repository,callback){
        callback(replyError,{});
      });

      gitHubController.getCommits({params:{name:'MDIAZ88',repo:'anular-labs'}},{json:function(response){
        expect(response).to.deep.equal(replyError);
      }});

    });
  });


});

