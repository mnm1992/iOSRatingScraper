# IOSRatingFetcher
Fetches ratings of ios apps from itunes. Should theoratically also work for anything listed on itunes.

Usage:

```javascript
const IOSRatingFetcher = require('IOSRatingFetcher');
const ratingFetcher = new IOSRatingFetcher();
const result = await ratingFetcher.fetchRatings(<itunes app id>, <country code>);
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

Supported country codes:
ae, ag, ai, am, ao, ar, at, au, az, bb, be, bg, bh, bm, bn, bo, br, bs, bw, by, bz, ca, ch, cl, cn, co, cr, cy, cz, de, dk, dm, do, dz, ec, ee, eg, es, fi, fr, gb, gd, gh, gr, gt, gy, hk, hn, hr, hu, id, ie, il, in, is, it, jm, jo, jp, ke, kn, kr, kw, ky, kz, lb, lc, lk, lt, lu, lv, md, mg, mk, ml, mo, ms, mt, mu, mx, my, ne, ng, ni, nl, no, nz, om, pa, pe, ph, pk, pl, pt, py, qa, ro, ru, sa, se, sg, si, sk, sn, sr, sv, tc, th, tn, tr, tt, tw, tz, ug, us, uy, uz, vc, ve, vg, vn, ye, za
