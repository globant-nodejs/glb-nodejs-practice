var chai=require('chai'),
    expect=require('chai').expect,
    sinon = require('sinon'),
    replyReposJson=require('./reply/repos.json'),
    replyCommitJson=require('./reply/commits.json'),
    gitHubService=require('../src/services/githubService.js'),
    gitHubController=require('../src/controllers/githubController.js'),
    reposHal=require('./reply/reposhal.json'),
    commitHal=require('./reply/commithal.json');

describe('githubControllerTest Controller Test/',function(){

  describe('Get Repositories Test/',function(){
    it('Should Test Something',function(){
     
     var mock=sinon.stub(gitHubService,'getReposByUser',function(username,callback){
          callback(null,replyReposJson);
     });

     gitHubController.getRepositories({params:{name:'MDIAZ88'}},{json:function(response){
        expect(response).to.deep.equal(reposHal);
    }});
  });
  });

  describe('Get Commits Test/',function(){
    it('Should Test Something 2',function(){
     
     var mock=sinon.stub(gitHubService,'getCommitsByRepo',function(username,repository,callback){
          callback(null,replyCommitJson);
     });

     gitHubController.getCommits({params:{name:'MDIAZ88',repo:'anular-lab'}},{json:function(response){
        expect(response).to.deep.equal(commitHal);
    }});
  });
  });




});

