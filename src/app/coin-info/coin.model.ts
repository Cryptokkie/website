export interface Links {
    explorer: string;
    homepage: string;
    github: string;
    bitbucket?: any;
}

export interface MarketData {
    changePercentage1hBtc: number;
    changePercentage1hUsd: number;

    changePercentage24hBtc: number;
    changePercentage24hUsd: number;

    changePercentage7dBtc: number;
    changePercentage7dUsd: number;

    changePercentage14dBtc: number;
    changePercentage14dUsd: number;

    changePercentage30dBtc: number;
    changePercentage30dUsd: number;

    changePercentage60dBtc: number;
    changePercentage60dUsd: number;

    changePercentage200dBtc: number;
    changePercentage200dUsd: number;

    changePercentage1yBtc: number;
    changePercentage1yUsd: number;

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
    alltimeHighBtc: number;
    alltimeHighUsd: number;
    alltimeHighPercentageBtc: number;
    alltimeHighPercentageUsd: number;
    alltimeHighDateBtc: string;
    alltimeHighDateUsd: string;
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
    description: string;
    rating: number;
    social: Social;
    ticker: string;
    imageUrlSmall: string;
    imageUrlThumbnail: string;
}
