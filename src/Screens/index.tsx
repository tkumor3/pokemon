export type RootStackParamList = {
  PokemonIndex: undefined;
  Pokemon: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
