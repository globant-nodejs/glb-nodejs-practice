var chai=require('chai'),
expect=require('chai').expect,
sinon=require("sinon"),
controlParam=require('../src/functions/controlParam.js'),
errorFunction=require('../src/functions/errorFunction.js');

describe('Github URL Parameter Test/', function(){

  describe('If The Parameter is True/',function(){
    it('Should Execute The NEXT() Function/',function(){      
      var nextFunction=sinon.spy();
      controlParam.control({params:{name:'MDIAZ88'}},null,nextFunction,null);
      expect(nextFunction.called).to.be.true;      
    });
  });

  describe('If The Parameter is False/',function(){
    afterEach(function(done) {
      errorFunction.error404.restore();
      done();
    });
    it('Shoul Execute The error404() Function/',function(){
      var nextFunction=sinon.spy();
      var mock=sinon.stub(errorFunction,'error404');
      controlParam.control({params:{name:'lala'}},null,nextFunction,null);
      expect(nextFunction.called).to.be.false;
      expect(errorFunction.error404.called).to.be.true;       
    });
  });

}); 






