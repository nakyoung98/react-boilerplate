import { BeerAPI } from "@network/apis/beer.api";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["beer"],
    queryFn: BeerAPI.getBeers,
  });

  return (
    <div>
      {data?.data.map((beer) => (
        <div key={beer.id}>{beer.name}</div>
      ))}
    </div>
  );
}
