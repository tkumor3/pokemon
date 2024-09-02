import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";

export type TabStackParamList = {
  Search: undefined;
  Liked: undefined;
};

export type RootStackParamList = {
  Tab: NavigatorScreenParams<TabStackParamList>;
  Pokemon: { name: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof TabStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
