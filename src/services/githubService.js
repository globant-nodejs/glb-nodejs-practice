var request = require('request');

module.exports={
  githubService:function(username,callback){
    request({url:'https://api.github.com/users/' +username +
    '/repos', headers: {'user-agent': 'node.js'}},callback);      
  }  
};