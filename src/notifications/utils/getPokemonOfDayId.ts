import { getData, storeData } from "@/src/utils";

const getRandomInt = () => {
  return Math.floor(Math.random() * 361);
};
const POKEMON_OF_DAY_ID_KEY = "pokemon_of_day_id";

type PokemonRecord = {
  id: number;
  expireOn: string;
};
const getCurrentDayEnd = () => {
  const today = new Date();
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59,
    999
  ).toISOString();
  return endOfDay;
};

const storePokemonRecord = async () => {
  const randId = getRandomInt();
  await storeData(POKEMON_OF_DAY_ID_KEY, {
    id: randId,
    expireOn: getCurrentDayEnd(),
  });
  return randId;
};

const getPokemonOfDayId = async () => {
  const pokemon = await getData<PokemonRecord>(POKEMON_OF_DAY_ID_KEY);

  if (!pokemon) {
    return storePokemonRecord();
  }

  if (new Date().getTime() < Date.parse(pokemon.expireOn)) {
    return pokemon.id;
  } else {
    return storePokemonRecord();
  }
};

export default getPokemonOfDayId;
