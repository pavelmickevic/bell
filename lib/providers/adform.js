'use strict';

// Load modules

const Crypto = require('crypto');


exports = module.exports = function (options) {

    return {
        protocol: 'oauth2',
        auth: 'https://id.adform.com/sts/connect/authorize',
        token: 'https://id.adform.com/sts/connect/token',
        scope: ['openid', 'profile'],

        profile: function (credentials, params, get, callback) {

            get('https://id.adform.com/sts/connect/userinfo', {}, function(profile) {
                
                // { "sub": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                // , "preferred_username": "n.surname@adform.com"
                // , "name": "Name Surname"
                // , "email": "n.surname@adform.com"
                // , "zoneinfo": "Europe/Copenhagen"
                // , "locale": "en-US"
                // , "updated_at": "1354889283"
                // , "azureGroup": ["A", "B", "C", "..."]
                // }
                
                var email = profile.email.toLowerCase();
                var names = profile.name.split(' ');
                
                credentials.profile = {
                    id: profile.sub, 
                    username: email.split('@').shift(), // n.surname
                    displayName: profile.name,
                    name: {
                        first: names.shift(),
                        last: names.pop()
                    },
                    email: email,
                    raw: profile
                };
                
                return callback();
            });
        }
    };
};
