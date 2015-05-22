var chai=require('chai'),
    expect=require('chai').expect,
    sinon=require("sinon"),
    controlParam=require('../src/functions/controlParam.js');

describe('controlParam Function Test/', function(){
    it('Should execute the NEXT() function ONCE',function(){      
      var nextFunction=sinon.spy();
      controlParam.control({params:{name:'MDIAZ88'}},null,nextFunction,null);
      expect(nextFunction.called).to.be.true;      
    });
}); 




