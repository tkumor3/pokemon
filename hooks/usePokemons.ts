import fetcher from "@/src/utils/fetcher";
import { useInfiniteQuery } from "@tanstack/react-query";

const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon" as const;

export type PokemonIndexResponse = {
  counter: number;
  next: string;
  previous: string;
  results: { url: string; name: string }[];
};

const fetchPokemons = async ({ pageParam }: { pageParam: string }) =>
  fetcher<PokemonIndexResponse>(pageParam);

const usePokemons = () => {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
    initialPageParam: DEFAULT_URL,
    getNextPageParam: (lastPage) => lastPage?.next,
  });

  return {
    data,
    fetchNextPage,
  };
};

export default usePokemons;
