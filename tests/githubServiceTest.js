var chai=require('chai'),
expect=require('chai').expect,
nock = require('nock'),
replyReposJson=require('./reply/repositoriesList.json'),
//replyCommitJson=require('./reply/commits.json'),
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
//this test if the service list all the user repositories
  describe('Get Repostories By User Test/',function(){
    it('Should List all the MDIAZ88 (username) repositorires  ', function(done){      
      var scope = nock('https://api.github.com', {
        reqheaders: {
          'user-agent': 'node.js'
        }
      })
      .get('/users/MDIAZ88/repos')
      .reply(200,replyReposJson);

      gitHubService.getRepositoriesByUser('MDIAZ88', function (error,objJSON) {
        expect(objJSON).to.deep.equal(replyReposJson);
        done();
      });
    });
  });



}); 

