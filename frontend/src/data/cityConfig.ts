import { delhiMarketplaces }
    from './cities/delhi/marketplaces';
import { delhiCategories }
    from './cities/delhi/categories';
import { delhiShops }
    from './cities/delhi/shops';
import { delhiShopDetails }
    from './cities/delhi/shopDetails';
import { meerutMarketplaces }
    from './cities/meerut/marketplaces';
import { meerutCategories }
    from './cities/meerut/categories';
import { meerutShops }
    from './cities/meerut/shops';
import { meerutShopDetails }
    from './cities/meerut/shopDetails';
export const cityConfig = {
    Delhi: {
        marketplaces: delhiMarketplaces,
        categories: delhiCategories,
        shops: delhiShops,
        shopDetails: delhiShopDetails,
    },
    Meerut: {
        marketplaces: meerutMarketplaces,
        categories: meerutCategories,
        shops: meerutShops,
        shopDetails: meerutShopDetails,
    },
} as const;