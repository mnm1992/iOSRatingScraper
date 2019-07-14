# IOSRatingFetcher
Fetches ratings of ios apps from itunes. Should theoratically also work for anything listed on itunes.

Usage:

```javascript
const IOSRatingFetcher = require('iosratingfetcher');
const ratingFetcher = new IOSRatingFetcher();
//585027354 is the itunes app id
//nl is the countrycode we want to fetch reviews for
ratingFetcher.fetchRatings('585027354', 'nl').then((result) => {
    console.log(result);
});
```

The result will look like:
```javascript
{
    histogram: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    },
    total: 0,
    average: 0
}
```

Supported country codes:<br/>
ae, ag, ai, am, ao, ar, at, au, az, bb, be, bg, bh, bm, bn, bo, br, bs, bw, by, bz, ca, ch, cl, cn, co, cr, cy, cz, de, dk, dm, do, dz, ec, ee, eg, es, fi, fr, gb, gd, gh, gr, gt, gy, hk, hn, hr, hu, id, ie, il, in, is, it, jm, jo, jp, ke, kn, kr, kw, ky, kz, lb, lc, lk, lt, lu, lv, md, mg, mk, ml, mo, ms, mt, mu, mx, my, ne, ng, ni, nl, no, nz, om, pa, pe, ph, pk, pl, pt, py, qa, ro, ru, sa, se, sg, si, sk, sn, sr, sv, tc, th, tn, tr, tt, tw, tz, ug, us, uy, uz, vc, ve, vg, vn, ye, za<br/>
<br/>
How does it work:<br/>
It uses the apple itunes page to get the ratings and histogram for a country.<br/>
An example itunes page is: <br/>
585027354 is the itunes app id<br/>
http://itunes.apple.com/WebObjects/MZStore.woa/wa/customerReviews?s=143444&id=585027354&displayable-kind=11&#8217<br/>
It only works if the following headers are set:<br/>
'User-Agent': 'iTunes/9.2.1 (Macintosh; Intel Mac OS X 10.5.8) AppleWebKit/533.16', (We need to pretend to be itunes or we only get the please open in itunes page)<br/>
'X-Apple-Store-Front': 143452,12, (Store id of the dutch appstore, for a list of all storeids see IOSStores.json)<br/>
"Accept-Language": 'en-us, en;q=0.50'<br/>