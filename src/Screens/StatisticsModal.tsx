import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { RootStackParamList } from "./types";
import usePokemon from "../hooks/usePokemon";
import Error from "@components/Error";
import ProgressBar from "@components/ProgressBar";

type Props = NativeStackScreenProps<RootStackParamList, "StatisticsModal">;

const StatisticsModal = ({ route }: Props) => {
  const { name } = route.params;
  const { pokemon, loading, error } = usePokemon(name);

  if (loading) {
    return <ActivityIndicator />;
  }
  const { statistics } = pokemon ?? {};

  if (error || !statistics) {
    return <Error />;
  }
  return (
    <View style={styles.container}>
      {statistics.map((statistic) => {
        return (
          <View key={statistic.name}>
            <View style={styles.statisticTop}>
              <Text>{statistic.name}</Text>
              <Text>{statistic.value}</Text>
            </View>
            <ProgressBar progress={statistic.value} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", gap: 8, padding: 16 },
  statisticTop: { flexDirection: "row", justifyContent: "space-between" },
});

export default StatisticsModal;
