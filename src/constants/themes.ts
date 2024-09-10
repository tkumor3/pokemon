import { createTheme } from "@fast-styles/react";
import {
  Theme,
  DefaultTheme,
  DarkTheme as DefaultDarkTheme,
} from "@react-navigation/native";

export type ExtendedTheme = {
  colors: Theme["colors"] & {
    backgroundColor: string;
    color: string;
    colorRevert: string;
    backgroundOpacity: string;
    buttonGrey: string;
  };
} & Pick<Theme, "dark">;

export const LightTheme: ExtendedTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor: "#fff",
    color: "#000",
    colorRevert: "#fff",
    backgroundOpacity: "#ffffff4f",
    buttonGrey: "#f0f0f0",
  },
} as const;

export const DarkTheme: ExtendedTheme = {
  dark: true,
  colors: {
    ...DefaultDarkTheme.colors,
    backgroundColor: "#111",
    color: "#fff",
    colorRevert: "#111",
    backgroundOpacity: "#0000004f",
    buttonGrey: "#393939",
  },
} as const;

declare module "@react-navigation/native" {
  export function useTheme(): ExtendedTheme;
}

export const lightTheme = createTheme({
  colors: {
    backgroundColor: "#fff",
    color: "#000",
    colorRevert: "#fff",
    backgroundOpacity: "#ffffff4f",
    buttonGrey: "#f0f0f0",
  },
});

export const darkTheme = createTheme({
  colors: {
    backgroundColor: "#fff",
    color: "#000",
    colorRevert: "#fff",
    backgroundOpacity: "#ffffff4f",
    buttonGrey: "#f0f0f0",
  },
});
