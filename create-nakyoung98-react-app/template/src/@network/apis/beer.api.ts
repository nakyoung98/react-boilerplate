import ApiService from "@network/services/apiService";
import { GetBeerResponseDTO } from "./dtos/beer.dto";

const BeerAPI = {
  getBeers: async () => {
    const apiService = new ApiService();

    return await apiService.fetchData<GetBeerResponseDTO>({
      endpoint: "beers/ale",
      method: "GET",
    });
  },
};

export default BeerAPI;
