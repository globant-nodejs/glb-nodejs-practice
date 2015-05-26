var chai=require('chai'),
expect=require('chai').expect,
nock = require('nock'),
replyReposJson=require('./reply/repos.json'),
replyCommitJson=require('./reply/commits.json'),
gitHubService=require('../src/services/githubService.js');

describe('Github Service Tests/', function(){
  beforeEach(function(done) {
    scope = null;
    nock.cleanAll();
    nock.disableNetConnect();
    done();
  });

  afterEach(function(done) {
    if (scope) {
      scope.done();
    }
    nock.enableNetConnect();
    nock.cleanAll();
    done();
  });
  describe('Get Repostories By User Test/',function(){
    it('Should be equal to Angular-lab repository', function(done){      
      var scope = nock('https://api.github.com', {
        reqheaders: {
          'user-agent': 'node.js'
        }
      })
      .get('/users/MDIAZ88/repos')
      .reply(200,replyReposJson);

      gitHubService.getReposByUser('MDIAZ88', function (error,objJSON) {
        expect(objJSON).to.deep.equal(replyReposJson);
        done();
      });
    });



  });

  describe('Get Commits By Repostories Test/',function(){
    it('Should Be Equal To  Angular-lab Commit', function(done){      
      var scope = nock('https://api.github.com', {
        reqheaders: {
          'user-agent': 'node.js'
        }
      })
      .get('/repos/MDIAZ88/angular-lab/commits')
      .reply(200,replyCommitJson);

      gitHubService.getCommitsByRepo('MDIAZ88','angular-lab', function (error,objJSON) {
        expect(objJSON).to.deep.equal(replyCommitJson);
        done();
      });
    });
  });

}); 

