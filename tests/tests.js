var chai=require('chai'),
    expect=require('chai').expect,
    request = require('supertest'),
    nock = require('nock'),
    assert = require("assert"),
    sinon=require("sinon"),
    errorController = require('../src/controllers/errorController.js'),
    gitService=require('../src/services/githubService.js'),
    control=require('../src/controllers/urlParamController.js');

describe('Api Modules Test/', function(){
  
    it('error404 Should be a function', function(){
      assert.equal(typeof errorController.error404, 'function');
    });
   

    it('Should return a string when use MDIAZ88 as user', function(done){
      
      var scope = nock('https://api.github.com/users', {
        reqheaders: {
          'user-agent': 'node.js'
        }
      })
      .get('/MDIAZ88/repos')
      .reply(200);

      gitService.githubService('MDIAZ88', function (req,res) {
        expect(res.body).be.a('string');
        done();
      });


    });

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
   
    it('Should execute the NEXT() function ONCE',function(){
      
      var nextFunction=sinon.spy();
      control.controlParam({params:{name:'MDIAZ88'}},null,nextFunction,null);
      expect(nextFunction.called).to.be.true;
      
    });

    

}); 




