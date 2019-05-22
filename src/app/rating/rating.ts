export class Rating {
    coinId: string;
    userId: string;

    teamRating: number;
    communityRating: number;
    walletRating: number;
    productRating: number;

    // average of the above 4
    averageRating: number;
}
