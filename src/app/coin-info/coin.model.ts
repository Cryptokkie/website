export interface Links {
    explorer: string;
    homepage: string;
    github: string;
    bitbucket?: any;
}

export interface MarketData {
    dailyChangePercentageBtc: number;
    dailyChangePercentageUsd: number;
    dailyHighBtc: number;
    dailyHighUsd: number;
    dailyLowBtc: number;
    dailyLowUsd: number;
    dailyVolumeBtc: number;
    dailyVolumeUsd: number;
    lastPriceBtc: number;
    lastPriceUsd: number;
    marketcapBtc: number;
    marketcapRank: number;
    marketcapUsd: number;
    totalSupply: number;
    circulatingSupply: number;
}

export interface Social {
    bitcointalkLink: string;
    facebookLikes: string;
    redditSubscribers: string;
    twitterFollowers: string;
    twitterLink: string;
    redditLink: string;
    facebookLink: string;
    telegramLink: string;
    telegramUserCount: string;
    discordLink?: any;
}

export interface Coin {
    id: string;
    links: Links;
    marketData: MarketData;
    marketcapRank: number;
    name: string;
    social: Social;
    ticker: string;
    imageUrlSmall: string;
    imageUrlThumbnail: string;
}
