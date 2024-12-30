import { useApiMutation } from "@commons/hooks/useApiMutation";
import { useApiQuery } from "@commons/hooks/useApiQuery";
import { AuthService } from "@domains/auth/services/authService";
import { useAuthStore } from "@domains/auth/stores/authStore";
import { BeerService } from "@domains/beer/services/beerService";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const { data } = useApiQuery({
    queryKey: ["beer"],
    queryFn: BeerService.getBeers,
  });

  const { mutate } = useApiMutation({
    mutationFn: AuthService.refresh,
    onSuccess: (data) => {
      setAccessToken(data.data.accessToken);
    },
  });

  return (
    <div>
      <button
        onClick={() => {
          mutate(null);
        }}
      >
        refresh
      </button>
      <button
        onClick={() => {
          navigate("/sign-in");
        }}
      >
        signin
      </button>
      {data?.data.map((beer) => (
        <div key={beer.id}>{beer.name}</div>
      ))}
    </div>
  );
}
