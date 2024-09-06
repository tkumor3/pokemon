import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Button,
} from "react-native";
import usePokemon from "../hooks/usePokemon";
import { POKEMON_TYPE_COLORS } from "../constants";
import Error from "@components/Error";
import LikeButton from "@components/LikeButton";
import RotatingImage from "@components/RotatingImage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import capitalize from "lodash/capitalize";
import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { ExtendedTheme } from "@constants/themes";

type Props = NativeStackScreenProps<RootStackParamList, "Pokemon">;

const Pokemon = ({ route, navigation }: Props) => {
  const { colors } = useTheme();
  const styles = useMemo(() => genStyles(colors), [colors]);
  const { name } = route.params;

  const { pokemon, loading, error } = usePokemon(name);
  const defaultType = pokemon?.types?.[0];

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || !pokemon) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          {
            backgroundColor: defaultType
              ? POKEMON_TYPE_COLORS[defaultType]
              : colors.backgroundColor,
          },
          styles.topContainer,
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{name}</Text>
          <LikeButton pokemonId={pokemon.id} />
        </View>
        <View style={styles.imageContainer}>
          <RotatingImage imageUri={pokemon.imageUri} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.gap}>
          <Text style={styles.boldText}>Evolutions:</Text>
          {pokemon.evolutions
            ?.filter((evolution) => evolution.name !== pokemon.name)
            .map((evolution) => (
              <Pressable
                style={styles.pressable}
                onPress={() => {
                  navigation.push("Pokemon", { name: evolution.name });
                }}
                key={evolution.id}
              >
                <Text style={styles.regularCapitalizeText}>
                  {capitalize(evolution.name)}
                </Text>
              </Pressable>
            ))}
          <Button
            title="Statistics"
            onPress={() => {
              navigation.navigate("StatisticsModal", { name: pokemon.name });
            }}
          />
          <Button
            title="Location"
            onPress={() => {
              navigation.navigate("Location");
            }}
          />
        </View>
      </View>
    </View>
  );
};

const genStyles = (colors: ExtendedTheme["colors"]) =>
  StyleSheet.create({
    gap: { gap: 8 },
    topContainer: {
      flex: 2,
      padding: 16,
      justifyContent: "space-between",
    },
    boldText: { fontSize: 18, fontWeight: "bold", color: colors.colorRevert },
    regularCapitalizeText: { fontSize: 16 },
    header: { flexDirection: "row", justifyContent: "space-between" },
    bottomContainer: {
      flex: 3,
      backgroundColor: colors.backgroundColor,
      padding: 16,
    },
    container: { flex: 1 },
    pressable: {
      paddingVertical: 12,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      backgroundColor: colors.buttonGrey,
    },
    title: {
      textTransform: "capitalize",
      color: colors.colorRevert,
      fontWeight: "bold",
      fontSize: 24,
    },
    imageContainer: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default Pokemon;
