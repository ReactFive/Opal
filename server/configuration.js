var path = require('path');
var rootPath = path.normalize(__dirname +'/../');

module.exports = {
  development: {
    rootPath: rootPath,
    database: 'mongodb://vancamp:test1@ds043971.mongolab.com:43971/testapp',
    port: process.env.PORT || 3000
  },
  production: {
    rootPath: rootPath,
    database: 'mongodb://vancamp:test1@ds043971.mongolab.com:43971/testapp',
    port: process.env.PORT || 80
  },
  'facebookAuth' : {
    'clientID'      : '399450483593443', // your App ID
    'clientSecret'  : 'db3d8e352738f359f83d283b2ee99e52', // your App Secret
    'callbackURL'   : 'http://localhost:3000/api/facebook/callback'
  },

  'twitterAuth' : {
    'consumerKey'       : 'V9ZwRs4zZhTSKyps9cfHayVur',
    'consumerSecret'    : '9XaFdHCfdxIBl4fDFMFSKVjOdYqKytjhpnXw8dsVLXzZdvipC6',
    'callbackURL'       : 'http://localhost:3000/api/twitter/callback'
  },

  'googleAuth' : {
    'clientID'      : '708183920553-ai84a1rsgfhq3a8srcl0o82dpnbeao1m.apps.googleusercontent.com',
    'clientSecret'  : '7rmDtlJTTsuvaUEqn0c9VAy5',
    'callbackURL'   : 'http://localhost:3000/api/google/callback'
  }
};

// var path = require('path');
// var rootPath = path.normalize(__dirname +'/../');

// module.exports = {
//   development: {
//     rootPath: rootPath,
//     database: 'mongodb://vancamp:test1@ds043971.mongolab.com:43971/testapp',
//     port: process.env.PORT || 3000
//   },
//   production: {
//     rootPath: rootPath,
//     database: 'mongodb://vancamp:test1@ds043971.mongolab.com:43971/testapp',
//     port: process.env.PORT || 80
//   },
//   'facebookAuth' : {
//     'clientID'      : '399450483593443', // your App ID
//     'clientSecret'  : 'db3d8e352738f359f83d283b2ee99e52', // your App Secret
//     'callbackURL'   : 'https://lesson-links.herokuapp.com/api/facebook/callback'
//   },

//   'twitterAuth' : {
//     'consumerKey'       : 'V9ZwRs4zZhTSKyps9cfHayVur',
//     'consumerSecret'    : '9XaFdHCfdxIBl4fDFMFSKVjOdYqKytjhpnXw8dsVLXzZdvipC6',
//     'callbackURL'       : 'https://lesson-links.herokuapp.com/api/twitter/callback'
//   },

//   'googleAuth' : {
//     'clientID'      : '708183920553-ai84a1rsgfhq3a8srcl0o82dpnbeao1m.apps.googleusercontent.com',
//     'clientSecret'  : '7rmDtlJTTsuvaUEqn0c9VAy5',
//     'callbackURL'   : 'https://lesson-links.herokuapp.com/api/google/callback'
//   }
// };

