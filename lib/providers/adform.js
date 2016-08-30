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
                
                var email = profile.email;
                var name  = profile.name;
                var parts = name.split(' ');
                
                credentials.profile = {
                    id: email, // using `email` instead of `UserAccountId` as a temp hack, while userinfo api in progress
                    username: email.split('@').shift(),
                    displayName: name,
                    name: {
                        first: parts.shift(),
                        last: parts.pop()
                    },
                    email: email.toLowerCase(),
                    raw: profile
                };
                
                return callback();
            });
        }
    };
};
