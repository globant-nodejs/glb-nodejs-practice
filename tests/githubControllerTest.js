var chai=require('chai'),
expect=require('chai').expect,
sinon = require('sinon'),
gitHubController=require('../src/controllers/githubController.js'),
repositoriesHAL=require('./reply/repositoriesHAL.json'),
singleRepoHAL=require('./reply/singleRepositoryHAL.json'),
commitsHAL=require('./reply/commitsHAL.json'),
pullrequestsHAL=require('./reply/pullrequestsHAL.json'),
singlePullHAL=require('./reply/singlePullRequestHAL.json'),
singleCommitHAL=require('./reply/singleCommitHAL.json'),
replyReposJson=require('./reply/repositoriesList.json'),
replyCommitJson=require('./reply/commitList.json'),
replyPullRequestsJson=require('./reply/pullrequestsList.json'),
replySingleRepository=require('./reply/singleRepository.json'),
replySingleCommit=require('./reply/singleCommit.json'),
replySinglePullRequest=require('./reply/singlePullRequest.json'),
errorMessage=require('./reply/errors.json'),
gitHubService=require('../src/services/githubService.js');




describe('API glb-nodejs-practice Controller Tests/',function(){

  describe('Get All Repositories Function Test/',function(){
    afterEach(function(done) {
      gitHubService.getRepositoriesByUser.restore();
      done();
    });
    it('Should Return a Correct Repositories-HAL Response',function(){     
      var mock=sinon.stub(gitHubService,'getRepositoriesByUser',function(username,callback){
        callback(null,replyReposJson);
      });

      gitHubController.getRepositories({params:{name:'MDIAZ88'}},{json:function(response){
        expect(response).to.deep.equal(repositoriesHAL);
      }});
    });
  });

  describe('Get All Commits Function Test/',function(){
    afterEach(function(done) {
      gitHubService.getCommitsByRepository.restore();
      done();
    });
    it('Should Return a Correct Commits-HAL Response',function(){

      var mock=sinon.stub(gitHubService,'getCommitsByRepository',function(username,repository,callback){
        callback(null,replyCommitJson);
      });

      gitHubController.getCommits({params:{name:'MDIAZ88',repo:'angular-lab'}},{json:function(response){
        expect(response).to.deep.equal(commitsHAL);
      }});
    });
  });

  describe('Get All Pull Request Function Test/',function(){
    afterEach(function(done) {
      gitHubService.getPullRequestByRepository.restore();
      done();
    });
    it('Should Return a Correct PullRequest-HAL Response',function(){

      var mock=sinon.stub(gitHubService,'getPullRequestByRepository',function(username,repository,callback){
        callback(null,replyPullRequestsJson);
      });

      gitHubController.getPullRequest({params:{name:'lfantone',repo:'glb-nodejs-practice'}},{json:function(response){
        expect(response).to.deep.equal(pullrequestsHAL);
      }});
    });
  });

  describe('Get One Pull Request Function Test/',function(){
    afterEach(function(done) {
      gitHubService.getSinglePullRequest.restore();
      done();
    });
    it('Should Return a Correct Single PullRequest-HAL Response',function(){

      var mock=sinon.stub(gitHubService,'getSinglePullRequest',function(username,repository,pullnumber,callback){
        callback(null,replySinglePullRequest);
      });

      gitHubController.getPullRequest({params:{name:'lfantone',repo:'glb-nodejs-practice',number:3}},{json:function(response){
        expect(response).to.deep.equal(singlePullHAL);
      }});
    });
  });

  describe('Get One Commit Function Test/',function(){
    afterEach(function(done) {
      gitHubService.getSingleCommit.restore();
      done();
    });
    it('Should Return a Correct Single Commit-HAL Response',function(){

      var mock=sinon.stub(gitHubService,'getSingleCommit',function(username,repository,sha,callback){
        callback(null,replySingleCommit);
      });

      gitHubController.getPullRequest({params:{name:'lfantone',repo:'glb-nodejs-practice',sha:'4dff4c82a6e8a7fdf5e63c5513ae581746c404da'}},
        {json:function(response){
        expect(response).to.deep.equal(singleCommitHAL);
      }});
    });
  });

  describe('Get One Repository Function Test/',function(){
    afterEach(function(done) {
      gitHubService.getSingleRepository.restore();
      done();
    });
    it('Should Return a Correct Single Pull Repository-HAL Response',function(){

      var mock=sinon.stub(gitHubService,'getSingleRepository',function(username,repository,callback){
        callback(null,replySingleRepository);
      });

      gitHubController.getRepository({params:{name:'lfantone',repo:'glb-nodejs-practice'}},
        {json:function(response){
        expect(response).to.deep.equal(singleRepoHAL);
      }});
    });
  });

  describe('Error Message Getting All Repositories/',function(){
    afterEach(function(done) {
      gitHubService.getRepositoriesByUser.restore();
      done();
    });
    it('Should Return a 404 Error',function(){
      var mock=sinon.stub(gitHubService,'getRepositoriesByUser',function(username,callback){
        callback(errorMessage[3]);
      });

      gitHubController.getRepositories({params:{name:'lala'}},{json:function(response){
        expect(response).to.deep.equal(errorMessage[3]);
      }});

    });
  });

describe('Error Message Getting All Commits/',function(){
    afterEach(function(done) {
      gitHubService.getCommitsByRepository.restore();
      done();
    });
    it('Should Return a 404 Error',function(){
      var mock=sinon.stub(gitHubService,'getCommitsByRepository',function(username,repository,callback){
        callback(errorMessage[4]);
      });

      gitHubController.getCommits({params:{name:'lfantone',repo:'glb-nodejs-practicessss'}},{json:function(response){
        expect(response).to.deep.equal(errorMessage[4]);
      }});

    });
  });
  
describe('Error Message Getting All Pull Requests/',function(){
    afterEach(function(done) {
      gitHubService.getPullRequestByRepository.restore();
      done();
    });
    it('Should Return a 404 Error',function(){
      var mock=sinon.stub(gitHubService,'getPullRequestByRepository',function(username,repository,callback){
        callback(errorMessage[5]);
      });

      gitHubController.getCommits({params:{name:'lfantone',repo:'glb-nodejs-practicessss'}},{json:function(response){
        expect(response).to.deep.equal(errorMessage[5]);
      }});

    });
  });

describe('Error Message Getting One Pull Request/',function(){
    afterEach(function(done) {
      gitHubService.getSinglePullRequest.restore();
      done();
    });
    it('Should Return a 404 Error',function(){
      var mock=sinon.stub(gitHubService,'getSinglePullRequest',function(username,repository,pullnumber,callback){
        callback(errorMessage[2]);
      });

      gitHubController.getOnePullRequest({params:{name:'lfantone',repo:'glb-nodejs-practicessss',number:09120274247}},{json:function(response){
        expect(response).to.deep.equal(errorMessage[2]);
      }});

    });
  });

describe('Error Message Getting One Commit Error/',function(){
    afterEach(function(done) {
      gitHubService.getSingleCommit.restore();
      done();
    });
    it('Should Return a 404 Error',function(){
      var mock=sinon.stub(gitHubService,'getSingleCommit',function(username,repository,sha,callback){
        callback(errorMessage[1]);
      });

      gitHubController.getOneCommit({params:{name:'lfantone',repo:'glb-nodejs-practicesss',sha:'4dff4c82a6e8a7fdf5e63c5513ae581746c404da'}},
        {json:function(response){
        expect(response).to.deep.equal(errorMessage[1]);
      }});

    });
  });

describe('Error Message Getting One Repository/',function(){
    afterEach(function(done) {
      gitHubService.getSingleRepository.restore();
      done();
    });
    it('Should Return a 404 Error',function(){
      var mock=sinon.stub(gitHubService,'getSingleRepository',function(username,repository,callback){
        callback(errorMessage[0]);
      });

      gitHubController.getRepository({params:{name:'MDIAZ88',repo:'angular-labssss'}},
        {json:function(response){
        expect(response).to.deep.equal(errorMessage[0]);
      }});

    });
  });

});

