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
                
                var name = profile.name.split(' ');
                
                credentials.profile = {
                    id: profile.UserAccountId,
                    username: profile.email.split('@').shift(),
                    displayName: name,
                    name: {
                        first: name.shift(),
                        last: name.pop()
                    },
                    email: profile.email.toLowerCase(),
                    raw: profile
                };
                
                return callback();
            });
        }
    };
};
