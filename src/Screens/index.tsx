export type RootStackParamList = {
  PokemonIndex: undefined;
  Pokemon: { name: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
