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
                
                var email = profile.email.toLowerCase();
                
                credentials.profile = {
                    id: profile.sub, // using such field instead of `UserAccountId` as a temp hack, while userinfo api in progress
                    username: email.split('@').shift(),
                    displayName: profile.name,
                    name: {
                        first: profile.given_name,
                        last: profile.family_name
                    },
                    email: email,
                    raw: profile
                };
                
                return callback();
            });
        }
    };
};
