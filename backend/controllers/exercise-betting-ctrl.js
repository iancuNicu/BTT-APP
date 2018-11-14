const axios = require('axios');
const { fromJS } = require('immutable');

const exerciseApiKey = process.env.BET_EXERCISE_KEY;
const sportsUrl = `https://api.the-odds-api.com/v3/sports/?apiKey=${exerciseApiKey}`;

const oddsUrl = `https://api.the-odds-api.com/v3/odds?sport=soccer_epl&region=uk&mkt=h2h&apiKey=${exerciseApiKey}`;

const BettingExerciseController = {

    getSports: () => {
      return axios.get(sportsUrl).then(res => {
            return res.data;
      })
                                 .catch(e => ({
                                     error: e
                                 }));
    },

    getBettData:  () => {
       return axios({
           method: 'get',
           url:oddsUrl,
           headers: {
               'Accept': 'application/json'
           }
       }).then(res => res.data)
         .catch(e => ({error: e}));
    },

    getOdds: async function(){
        const betData = await this.getBettData();
        if(betData.error){
            return {
                error: betData.error
            }
        }
        else {
           let OddsList = await this.returnOddsList(betData);
           return OddsList;
        }

    },

    returnOddsList: async function(betData){
        let OddsList = [];
        for(data of betData.data) {
            let record = await this.getRecord(data);
            if(record){
                OddsList.push(record);
            }
        }
        return OddsList;
    },

    getRecord: function(data) {
        const dataObj = Object.create(data);
        const exchange = this.extractExchange(dataObj.sites);
        const bookies = this.extractBookies(dataObj.sites);
        if(!exchange){
            return null;
        }
        const BookedSite  = this.getSiteData(bookies, exchange);
        const betType = [dataObj.teams[0], 'equal', dataObj.teams[1]];
        return {
            date_time: new Date(dataObj.commence_time).toLocaleDateString(),
            sport: dataObj.sport_key,
            name: `${dataObj.teams[0]} vs ${dataObj.teams[1]}`,
            bet: betType[BookedSite.rating_index],
            rating: BookedSite.rating,
            back_odds: BookedSite.bookie.odds["h2h"][BookedSite.rating_index],
            bookie: BookedSite.bookie.site_nice,
            exchange: exchange.site_nice,
            exchange_odds: exchange.odds.h2h[BookedSite.rating_index],
            exchange_commision:5
        }
    },

    extractExchange: (sites) => {
        return sites.find(site => site.site_key === "betfair");
    },

    extractBookies: (sites) => {
        return sites.filter(site => site.site_key !== "betfair");
    },

    getSiteData: function(bookies, exchange){
        let bestOdds = {
            rating: 0,
            rating_index: 0,
            bookie: null
        };
        bookies.forEach(bookie => {
            let maxRating = 0;
            let betIndex = 0;
            if(bookie.odds) {
                for (let i = 0; i < 3; i++) {
                    if (maxRating < this.calculateRating(bookie.odds.h2h[i], exchange.odds.h2h[i], 5)) {
                        maxRating = this.calculateRating(bookie.odds.h2h[i], exchange.odds.h2h[i], 5);
                        betIndex = i;
                    }
                }
                if (maxRating > bestOdds.rating) {
                    bestOdds.rating = maxRating;
                    bestOdds.rating_index = betIndex;
                    bestOdds.bookie = bookie
                }
            }
        });
        return bestOdds;
    },

    calculateRating: (bOdds, eOdds, commission) => (bOdds/eOdds - ((bOdds/eOdds)* commission)/100)

};

module.exports = BettingExerciseController;