import { ApiService } from "@network/services/apiService";
import { GetBeerResponseDTO } from "@network/types/dtos/beer.dto";

const BeerAPI = {
  getBeers: async () =>
    await ApiService.fetchData<GetBeerResponseDTO>({
      endpoint: "beers/ale",
      method: "GET",
    }),
};

export default BeerAPI;
