var chai=require('chai'),
    expect=require('chai').expect,
    sinon = require('sinon'),
    replyJson=require('./reply/repos.json'),
    gitHubService=require('../src/services/githubService.js'),
    gitHubController=require('../src/controllers/githubController.js'),
    reposHal=require('./reply/reposhal.json');

describe('githubControllerTest Controller Test/',function(){
  it('Should Test Something',function(){
     
     var mock=sinon.stub(gitHubService,'getReposByUser',function(username,callback){
          callback(null,replyJson);
     });

     gitHubController.getRepositories({params:{name:'MDIAZ88'}},{json:function(response){
        expect(response).to.deep.equal(reposHal);
    }});
  });
});

