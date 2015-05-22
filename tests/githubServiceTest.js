var chai=require('chai'),
    expect=require('chai').expect,
    nock = require('nock'),
    replyJson=require('./reply/repos.json');
    gitHubService=require('../src/services/githubService.js');

describe('githubService Service Test/', function(){
    
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
  
    it('Should be equal to Angular-lab', function(done){      
      var scope = nock('https://api.github.com/users', {
        reqheaders: {
          'user-agent': 'node.js'
        }
      })
      .get('/MDIAZ88/repos')
      .reply(200,replyJson);

      gitHubService.getReposByUser('MDIAZ88', function (error,objJSON) {
        expect(objJSON).to.deep.equal(replyJson);
        done();
      });
    });
  
  

}); 

