import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import usePokemon from "../hooks/usePokemon";
import { POKEMON_TYPE_COLORS } from "../constants";
import Error from "@components/Error";
import LikeButton from "@components/LikeButton";
import RotatingImage from "@components/RotatingImage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

type Props = NativeStackScreenProps<RootStackParamList, "Pokemon">;

const Pokemon = ({ route, navigation }: Props) => {
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
              : "#fff",
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
                  {evolution.name}
                </Text>
              </Pressable>
            ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gap: { gap: 8 },
  topContainer: {
    flex: 2,
    padding: 16,
    justifyContent: "space-between",
  },
  boldText: { fontSize: 18, fontWeight: "bold" },
  regularCapitalizeText: { fontSize: 16 },
  header: { flexDirection: "row", justifyContent: "space-between" },
  bottomContainer: { flex: 3, backgroundColor: "#fff", padding: 16 },
  container: { flex: 1 },
  pressable: {
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  title: {
    textTransform: "capitalize",
    color: "#fff",
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
