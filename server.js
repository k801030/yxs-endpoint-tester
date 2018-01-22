var api = require('api-quick').init(8080);
var endpoints = {};
endpoints.date = function() {
  return {date: new Date().toUTCString()};
};

endpoints.name = function() {
  return {name: "Vison Li"};
};


api.addEndpoints(endpoints);