import { useApiQuery } from "@commons/hooks/useApiQuery";
import { BeerAPI } from "@network/apis/beer.api";

export default function Home() {
  const { data } = useApiQuery({
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
