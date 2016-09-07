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
                
                // { sub: 'n.surname@adform.com',
                //   name: 'Name Surname',
                //   given_name: 'Name',
                //   family_name: 'Surname',
                //   nickname: 'name.surname',
                //   preferred_username: 'n.surname@adform.com',
                //   email: 'Name.Surname@adform.com',
                //   phone_number: '+370 5 123 4567',
                //   locale: 'LT',
                //   updated_at: '1467884482' }
                
                var email = profile.email.toLowerCase();
                var sub = profile.sub;
                
                credentials.profile = {
                    id: sub, // using such field instead of `UserAccountId` as a temp hack, while userinfo api in progress
                    username: sub.split('@').shift(), // n.surname
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
