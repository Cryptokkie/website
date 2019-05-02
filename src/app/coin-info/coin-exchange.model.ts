export interface CoinExchange {
    coinId: string;
    base: string;
    target: string;
    exchangeName: string;
    exchangeIdentifier: string;
    lastPriceBtc: number;
    lastPriceUsd: number;
    volumeBtc: number;
    volumeUsd: number;
    isStale: boolean;
    url: string;
    imageUrl: string;
}
