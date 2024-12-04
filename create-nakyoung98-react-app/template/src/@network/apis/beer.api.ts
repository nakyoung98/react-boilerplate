import { ApiService } from "@network/services/apiService";
import { GetBeerResponseDTO } from "@network/types/dtos/beer.dto";

export const BeerAPI = {
  getBeers: async () =>
    await ApiService.fetchData<GetBeerResponseDTO>({
      endpoint: "beers",
      method: "GET",
    }),
};
