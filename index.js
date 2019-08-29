/*jslint es6:true*/

const storeMap = require('./iOSStores');
const Request = require('request-promise');
const parse = require('node-html-parser').parse;

module.exports = class IOSRatingFetcher {

    constructor() {
        this.emptyResponse ={
            histogram: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0
            },
            total: 0,
            average: 0
        };
    }

    async fetchRatings(appId, country) {
        const options = {
            url: 'http://itunes.apple.com/WebObjects/MZStore.woa/wa/customerReviews?s=143444&id=' + appId + '&displayable-kind=11&#8217',
            headers: {
                'User-Agent': 'iTunes/9.2.1 (Macintosh; Intel Mac OS X 10.5.8) AppleWebKit/533.16',
                'X-Apple-Store-Front': storeMap[country],
                "Accept-Language": 'en-us, en;q=0.50'
            }
        };
        try {
          const result = await Request(options);
          const json = parse(result);
          const map = {};
          map[country] = this.jsonToHistogram(json, country);
          return map;
        } catch (error) {
            throw new Error('Error while fetching ratings for %s: ' + error, country);
            /*const map = {};
            map[country] = this.emptyResponse;
            return map;*/
        }
    }

    averageFromHistogram(histogram) {
        if(!histogram || histogram.size < 5) {
            return {
                amount: 0,
                average: 0
            };
        }

        const amountOfReviews = histogram['1'] + histogram['2'] + histogram['3'] + histogram['4'] + histogram['5'];
        const totalReviewScore = (1 * histogram['1']) + (2 * histogram['2']) + (3 * histogram['3']) + (4 * histogram['4']) + (5 * histogram['5']);
        const saveDivider = amountOfReviews === 0 ? 1 : amountOfReviews;
        return {
            amount: amountOfReviews,
            average: (totalReviewScore / saveDivider)
        };
    }

    walkJsonTree(path, json) {
        if(!json || !path) {
            return null;
        }
        const pathComponents = path.split('/');
        let currentView = json;
        for (let i = 0; i < pathComponents.length; i++) {
            if (currentView[pathComponents[i]]) {
                currentView = currentView[pathComponents[i]];
            } else {
                return null;
            }
        }
        return currentView;
    }
    

    jsonToHistogram(json, country) {
		const parent = json.childNodes[2].childNodes[3].childNodes[1].childNodes[2].childNodes;

        const amountOf5Stars = parseInt(parent[5].rawAttrs.split(',')[1]);
        const amountOf4Stars = parseInt(parent[7].rawAttrs.split(',')[1]);
        const amountOf3Stars = parseInt(parent[9].rawAttrs.split(',')[1]);
        const amountOf2Stars = parseInt(parent[11].rawAttrs.split(',')[1]);
        const amountOf1Stars = parseInt(parent[13].rawAttrs.split(',')[1]);

        if(isNaN(amountOf5Stars) || isNaN(amountOf4Stars) || isNaN(amountOf3Stars) || isNaN(amountOf2Stars) || isNaN(amountOf1Stars)) {
            console.error('Not enough ratings for %s or apple changed the page layout', country);
            return this.emptyResponse;
        }
        const histogram = {
            1: amountOf1Stars,
            2: amountOf2Stars,
            3: amountOf3Stars,
            4: amountOf4Stars,
            5: amountOf5Stars
        };
        const averageSet = this.averageFromHistogram(histogram);
        return {
            histogram: histogram,
            total: averageSet.amount,
            average: averageSet.average
        };
    }
};
