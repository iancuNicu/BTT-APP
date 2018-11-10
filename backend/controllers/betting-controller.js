const axios = require('axios');

const BettingController = {

    betfairLogin: () => {
        const headers = {
          'Accept': 'application/json',
          'X-Application': process.env.BETFAIR_KEY,
          'Content-type' : 'application/json',
        };
       const loginOptions = {
           method: 'POST',
           url: 'https://identitysso.betfair.com/api/login',
           data: {
               username: process.env.BETFAIR_USERNAME,
               password: process.env.BETFAIR_PASS,
        },
        headers
    };

       return axios(loginOptions).then(res => {
           console.log(res.data);
           return res.data;
       })
                                 .catch(e => e);
    },

    getBettfairData: async function () {
        const login = await this.betfairLogin();
        return login;
    }



};

module.exports = BettingController;
