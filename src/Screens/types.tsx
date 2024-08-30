import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import type { StackScreenProps } from "@react-navigation/stack";

export type SearchStackParamList = {
  PokemonIndex: undefined;
  Pokemon: { name: string };
};

export type RootTabParamsList = {
  Search: NavigatorScreenParams<SearchStackParamList>;
  Liked: undefined;
};

export type RootTabScreenProps<T extends keyof RootTabParamsList> =
  BottomTabScreenProps<RootTabParamsList, T>;

export type SearchScreenProps<T extends keyof SearchStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<SearchStackParamList, T>,
    RootTabScreenProps<keyof RootTabParamsList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamsList {}
  }
}
