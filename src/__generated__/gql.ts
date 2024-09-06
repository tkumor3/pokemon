/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query liked_pokemons($offset: Int, $limit: Int, $ids: [Int!]) {\n    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: {id: {_in: $ids}}) {\n      id\n      name\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"other\")\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          name\n        }\n      }\n    }\n  }\n": types.Liked_PokemonsDocument,
    "\n  query pokemon($name: String) {\n    pokemon_v2_pokemon(where: {name: {_eq: $name}}) {\n      id\n      name\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"other\")\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          name\n        }\n      }\n      pokemon_v2_pokemonspecy {\n        pokemon_v2_evolutionchain {\n          pokemon_v2_pokemonspecies {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n": types.PokemonDocument,
    "\n  query pokemons($offset: Int, $limit: Int, $like: String) {\n    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: {name: {_ilike: $like}}) {\n      id\n      name\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"other\")\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          name\n        }\n      }\n    }\n  }\n": types.PokemonsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query liked_pokemons($offset: Int, $limit: Int, $ids: [Int!]) {\n    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: {id: {_in: $ids}}) {\n      id\n      name\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"other\")\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query liked_pokemons($offset: Int, $limit: Int, $ids: [Int!]) {\n    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: {id: {_in: $ids}}) {\n      id\n      name\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"other\")\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query pokemon($name: String) {\n    pokemon_v2_pokemon(where: {name: {_eq: $name}}) {\n      id\n      name\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"other\")\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          name\n        }\n      }\n      pokemon_v2_pokemonspecy {\n        pokemon_v2_evolutionchain {\n          pokemon_v2_pokemonspecies {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query pokemon($name: String) {\n    pokemon_v2_pokemon(where: {name: {_eq: $name}}) {\n      id\n      name\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"other\")\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          name\n        }\n      }\n      pokemon_v2_pokemonspecy {\n        pokemon_v2_evolutionchain {\n          pokemon_v2_pokemonspecies {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query pokemons($offset: Int, $limit: Int, $like: String) {\n    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: {name: {_ilike: $like}}) {\n      id\n      name\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"other\")\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query pokemons($offset: Int, $limit: Int, $like: String) {\n    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: {name: {_ilike: $like}}) {\n      id\n      name\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"other\")\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          name\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;