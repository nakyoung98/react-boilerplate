import { BeerAPI } from "@network/apis/beer.api";
import { ApiService } from "@network/services/apiService";
import { GetBeerResponseDTO } from "@network/types/dtos/beer.dto";

export const BeerService = {
  getBeers: async () =>
    await ApiService.fetchData<GetBeerResponseDTO>({
      endpoint: BeerAPI.BEERS,
      method: "GET",
    }),
};
