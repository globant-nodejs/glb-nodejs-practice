var chai=require('chai'),
expect=require('chai').expect,
nock = require('nock'),
replyReposJson=require('./reply/repositoriesList.json'),
replyCommitJson=require('./reply/commitList.json'),
replyPullRequestsJson=require('./reply/pullrequestsList.json'),
replySingleRepository=require('./reply/singleRepository.json'),
replySingleCommit=require('./reply/singleCommit.json'),
replySinglePullRequest=require('./reply/singlePullRequest.json'),
errorMessage=require('./reply/errors.json'),
gitHubService=require('../src/services/githubService.js');

describe('API glb-nodejs-practice Service Tests/', function(){
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

  describe('Get a Single Repositories By User Function Test/',function(){
    it('Should Return a Single lfantone glb-nodejs-practice Repository', function(done){      
      var scope = nock('https://api.github.com', {
        reqheaders: {
          'user-agent': 'node.js'
        }
      })
      .get('/repos/lfantone/glb-nodejs-practice')
      .reply(200,replySingleRepository);

      gitHubService.getSingleRepository('lfantone','glb-nodejs-practice', function (error,objJSON) {
        expect(objJSON).to.deep.equal(replySingleRepository);
        done();
      });
    });
    it('Should Return Error When You Write The Wrong Repository', function(done){      
      var scope = nock('https://api.github.com', {
        reqheaders: {
          'user-agent': 'node.js'
        }
      })
      .get('/repos/lfantone/glb-nodejs-practicessss')
      .reply(200,errorMessage[0]);

      gitHubService.getSingleRepository('lfantone','glb-nodejs-practicessss', function (error,objJSON) {
        expect(objJSON).to.deep.equal(errorMessage[0]);
        done();
      });
    });
  });

  describe('Get a Single Commits By Repository Function Test/',function(){
    it('Should Return a Single MDIAZ88 angular-lab Commit', function(done){      
      var scope = nock('https://api.github.com', {
        reqheaders: {
          'user-agent': 'node.js'
        }
      })
      .get('/repos/MDIAZ88/angular-education/commits/4dff4c82a6e8a7fdf5e63c5513ae581746c404da')
      .reply(200,replySingleCommit);

      gitHubService.getSingleCommit('MDIAZ88','angular-education',
        '4dff4c82a6e8a7fdf5e63c5513ae581746c404da', function (error,objJSON) {
        expect(objJSON).to.deep.equal(replySingleCommit);
        done();
      });
    });
    it('Should Return Error When You Write The Wrong Sha', function(done){      
      var scope = nock('https://api.github.com', {
        reqheaders: {
          'user-agent': 'node.js'
        }
      })
      .get('/repos/MDIAZ88/angular-education/commits/12121434')
      .reply(200,errorMessage[1]);

      gitHubService.getSingleCommit('MDIAZ88','angular-education','12121434', function (error,objJSON) {
        expect(objJSON).to.deep.equal(errorMessage[1]);
        done();
      });
    });
  });

  describe('Get a Single Pull Request By Repository Function Test/',function(){
    it('Should Return a Single lfantone glb-nodejs-practice Pull Request', function(done){      
      var scope = nock('https://api.github.com', {
        reqheaders: {
          'user-agent': 'node.js'
        }
      })
      .get('/repos/lfantone/glb-nodejs-practice/pulls/3')
      .reply(200,replySinglePullRequest);

      gitHubService.getSinglePullRequest('lfantone','glb-nodejs-practice','3', function (error,objJSON) {
        expect(objJSON).to.deep.equal(replySinglePullRequest);
        done();
      });
    });

    it('Should Return Error When You Write The Wrong Pull Request Number', function(done){      
      var scope = nock('https://api.github.com', {
        reqheaders: {
          'user-agent': 'node.js'
        }
      })
      .get('/repos/lfantone/glb-nodejs-practice/pulls/3721312893943940394031782')
      .reply(200,errorMessage[2]);

      gitHubService.getSinglePullRequest('lfantone','glb-nodejs-practice','3721312893943940394031782', function (error,objJSON) {
        expect(objJSON).to.deep.equal(errorMessage[2]);
        done();
      });
    });
  });

  describe('Get Repositories By User Function Test/',function(){
    it('Should return the MDIAZ88 repositories', function(done){      
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
    it('Should Return Error When You Write The Wrong Username', function(done){      
      var scope = nock('https://api.github.com', {
        reqheaders: {
          'user-agent': 'node.js'
        }
      })
      .get('/users/------/repos')
      .reply(200,errorMessage[3]);

      gitHubService.getRepositoriesByUser('------', function (error,objJSON) {
        expect(objJSON).to.deep.equal(errorMessage[3]);
        done();
      });
    });
  });

  describe('Get Commits By Repostories Function Test/',function(){
    it('Should return the MDIAZ88/angular-lab Commits', function(done){      
      var scope = nock('https://api.github.com', {
        reqheaders: {
          'user-agent': 'node.js'
        }
      })
      .get('/repos/MDIAZ88/angular-lab/commits')
      .reply(200,replyCommitJson);

      gitHubService.getCommitsByRepository('MDIAZ88','angular-lab', function (error,objJSON) {
        expect(objJSON).to.deep.equal(replyCommitJson);
        done();
      });
    });
    it('Should Return Error When You Write The Wrong Repository', function(done){      
      var scope = nock('https://api.github.com', {
        reqheaders: {
          'user-agent': 'node.js'
        }
      })
      .get('/repos/MDIAZ88/angular-labsss/commits')
      .reply(200,errorMessage[4]);

      gitHubService.getCommitsByRepository('MDIAZ88','angular-labsss', function (error,objJSON) {
        expect(objJSON).to.deep.equal(errorMessage[4]);
        done();
      });
    });
  });

  describe('Get Pull Requests By Repostories Function Test/',function(){
    it('Should return the lfantone/glb-nodejs-practice Pull Requests', function(done){      
      var scope = nock('https://api.github.com', {
        reqheaders: {
          'user-agent': 'node.js'
        }
      })
      .get('/repos/lfantone/glb-nodejs-practice/pulls')
      .reply(200,replyPullRequestsJson);

      gitHubService.getPullRequestByRepository('lfantone','glb-nodejs-practice',
       function (error,objJSON) {
        expect(objJSON).to.deep.equal(replyPullRequestsJson);
        done();
      });
    });
    it('Should Return Error When You Write The Wrong Repository', function(done){      
      var scope = nock('https://api.github.com', {
        reqheaders: {
          'user-agent': 'node.js'
        }
      })
      .get('/repos/lfantone/glb-nodejs-practicesss/pulls')
      .reply(200,errorMessage[5]);

      gitHubService.getPullRequestByRepository('lfantone','glb-nodejs-practicesss', function (error,objJSON) {
        expect(objJSON).to.deep.equal(errorMessage[5]);
        done();
      });
    });
  });

}); 

