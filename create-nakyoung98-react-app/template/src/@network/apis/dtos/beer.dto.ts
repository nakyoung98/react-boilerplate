export type GetBeerResponseDTO = Array<BeerInfo>;

type BeerInfo = {
    id: number;
    price: string;
    name: string;
    rating: rating;
    image: string;
}

type rating = {
    average: number;
    reviews: number;
}