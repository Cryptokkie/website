

export interface Description {
    en: string;
}

export interface ReposUrl {
    github: any[];
    bitbucket: any[];
}

export interface Links {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: number;
    telegram_channel_identifier: string;
    subreddit_url?: any;
    repos_url: ReposUrl;
}

export interface Image {
    thumb: string;
    small: string;
    large: string;
}

export interface CurrentPrice {
    btc: number;
    eur: number;
    usd: number;
}

export interface Ath {
    btc: number;
    eur: number;
    usd: number;
}

export interface AthChangePercentage {
    btc: number;
    eur: number;
    usd: number;
}

export interface MarketCap {
    btc: number;
    eur: number;
    usd: number;
}

export interface TotalVolume {
    btc: number;
    eur: number;
    usd: number;
}

export interface High24h {
    btc: number;
    eur: number;
    usd: number;
}

export interface Low24h {
    btc: number;
    eur: number;
    usd: number;
}

export interface PriceChange24hInCurrency {
    btc: number;
    eur: number;
    usd: number;
}

export interface PriceChangePercentage1hInCurrency {
    btc: number;
    eur: number;
    usd: number;
}

export interface PriceChangePercentage24hInCurrency {
    btc: number;
    eur: number;
    usd: number;
}

export interface PriceChangePercentage7dInCurrency {
    btc: number;
    eur: number;
    usd: number;
}

export interface PriceChangePercentage14dInCurrency {
    btc: number;
    eur: number;
    usd: number;
}

export interface PriceChangePercentage30dInCurrency {
    btc: number;
    eur: number;
    usd: number;
}

export interface PriceChangePercentage60dInCurrency {
    btc: number;
    eur: number;
    usd: number;
}

export interface PriceChangePercentage200dInCurrency {
    btc: number;
    eur: number;
    usd: number;
}

export interface PriceChangePercentage1yInCurrency {
    btc: number;
    eur: number;
    usd: number;
}

export interface MarketCapChange24hInCurrency {
    btc: number;
    eur: number;
    usd: number;
}

export interface MarketCapChangePercentage24hInCurrency {
    btc: number;
    eur: number;
    usd: number;
}

export interface Sparkline7d {
    price: number[];
}

export interface MarketData {
    current_price: CurrentPrice;
    roi?: any;
    ath: Ath;
    ath_change_percentage: AthChangePercentage;
    ath_date: any;
    market_cap: MarketCap;
    market_cap_rank: number;
    total_volume: TotalVolume;
    high_24h: High24h;
    low_24h: Low24h;
    price_change_24h: string;
    price_change_percentage_24h: string;
    price_change_percentage_7d: string;
    price_change_percentage_14d: string;
    price_change_percentage_30d: string;
    price_change_percentage_60d: string;
    price_change_percentage_200d: string;
    price_change_percentage_1y: string;
    market_cap_change_24h: string;
    market_cap_change_percentage_24h: string;
    price_change_24h_in_currency: PriceChange24hInCurrency;
    price_change_percentage_1h_in_currency: PriceChangePercentage1hInCurrency;
    price_change_percentage_24h_in_currency: PriceChangePercentage24hInCurrency;
    price_change_percentage_7d_in_currency: PriceChangePercentage7dInCurrency;
    price_change_percentage_14d_in_currency: PriceChangePercentage14dInCurrency;
    price_change_percentage_30d_in_currency: PriceChangePercentage30dInCurrency;
    price_change_percentage_60d_in_currency: PriceChangePercentage60dInCurrency;
    price_change_percentage_200d_in_currency: PriceChangePercentage200dInCurrency;
    price_change_percentage_1y_in_currency: PriceChangePercentage1yInCurrency;
    market_cap_change_24h_in_currency: MarketCapChange24hInCurrency;
    market_cap_change_percentage_24h_in_currency: MarketCapChangePercentage24hInCurrency;
    total_supply: number;
    circulating_supply: string;
    sparkline_7d: Sparkline7d;
    last_updated: Date;
}

export interface CommunityData {
    facebook_likes: number;
    twitter_followers: number;
    reddit_average_posts_48h: number;
    reddit_average_comments_48h: number;
    reddit_subscribers: number;
    reddit_accounts_active_48h: number;
    telegram_channel_user_count?: any;
}

export interface DeveloperData {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    commit_count_4_weeks: number;
}

export interface PublicInterestStats {
    alexa_rank: number;
    bing_matches: number;
}

export interface Market {
    name: string;
    identifier: string;
    has_trading_incentive: boolean;
}

export interface ConvertedLast {
    btc: string;
    eth: string;
    usd: string;
}

export interface ConvertedVolume {
    btc: string;
    eth: string;
    usd: string;
}

export interface Ticker {
    base: string;
    target: string;
    market: Market;
    last: number;
    converted_last: ConvertedLast;
    volume: number;
    converted_volume: ConvertedVolume;
    timestamp: Date;
    is_anomaly: boolean;
    is_stale: boolean;
    coin_id: string;
}

export interface CoinDetails {
    id: string;
    symbol: string;
    name: string;
    block_time_in_minutes: number;
    categories: string[];
    description: Description;
    links: Links;
    image: Image;
    country_origin: string;
    genesis_date: string;
    market_cap_rank: number;
    coingecko_rank: number;
    coingecko_score: number;
    developer_score: number;
    community_score: number;
    liquidity_score: number;
    public_interest_score: number;
    market_data: MarketData;
    community_data: CommunityData;
    developer_data: DeveloperData;
    public_interest_stats: PublicInterestStats;
    status_updates: any[];
    last_updated: Date;
    tickers: Ticker[];
}

