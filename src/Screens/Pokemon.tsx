import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import usePokemon from "../hooks/usePokemon";
import { POKEMON_TYPE_COLORS } from "../constants";
import Error from "@components/Error";

type Props = NativeStackScreenProps<RootStackParamList, "Pokemon">;

const Pokemon = ({ route, navigation }: Props) => {
  const { name } = route.params;
  const { pokemon, loading, error } = usePokemon(name);
  const defaultType = pokemon?.types?.[0];

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
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
            flex: 2,
            padding: 16,
            justifyContent: "space-between",
          },
        ]}
      >
        <Text style={styles.title}>{name}</Text>
        <View style={styles.imageContainer}>
          <Image
            width={200}
            height={200}
            source={{
              uri: pokemon.imageUri,
            }}
          />
        </View>
      </View>
      <View style={{ flex: 3, backgroundColor: "#fff", padding: 16 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Evolutions:</Text>
          {pokemon.evolutions
            ?.filter((evolution) => evolution.name !== pokemon.name)
            .map((evolution) => (
              <Pressable
                style={styles.pressable}
                onPress={() => {
                  navigation.navigate("Pokemon", { name: evolution.name });
                }}
                key={evolution.id}
              >
                <Text style={{ textTransform: "capitalize", fontSize: 16 }}>
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
