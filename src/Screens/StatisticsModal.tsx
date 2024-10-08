import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, ActivityIndicator } from "react-native";
import { RootStackParamList } from "./types";
import usePokemon from "../hooks/usePokemon";
import Error from "@components/Error";
import ProgressBar from "@components/ProgressBar";
import { createStyleSheet, useStylesWithTheme } from "../stylesheet";

type Props = NativeStackScreenProps<RootStackParamList, "StatisticsModal">;

const StatisticsModal = ({ route }: Props) => {
  const styles = useStylesWithTheme(stylesheet);
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
              <Text style={styles.text}>{statistic.name}</Text>
              <Text style={styles.text}>{statistic.value}</Text>
            </View>
            <ProgressBar progress={statistic.value} />
          </View>
        );
      })}
    </View>
  );
};

const stylesheet = createStyleSheet((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    gap: 8,
    padding: 16,
  },
  text: { color: colors.text },
  statisticTop: { flexDirection: "row", justifyContent: "space-between" },
}));

export default StatisticsModal;
