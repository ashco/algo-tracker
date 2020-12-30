// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Difficulty = {
  "EASY": "EASY",
  "MEDIUM": "MEDIUM",
  "HARD": "HARD"
};

const Algorithm = {
  "DYNAMIC_PROGRAMMING": "DYNAMIC_PROGRAMMING",
  "POINTERS": "POINTERS",
  "BINARY_SEARCH": "BINARY_SEARCH",
  "DFS": "DFS",
  "BFS": "BFS",
  "QUICK_SORT": "QUICK_SORT",
  "MERGE_SORT": "MERGE_SORT",
  "RECURSION": "RECURSION",
  "GREEDY_METHOD": "GREEDY_METHOD"
};

const DataStructure = {
  "ARRAY": "ARRAY",
  "STRING": "STRING",
  "LINKED_LIST": "LINKED_LIST",
  "STACK": "STACK",
  "QUEUE": "QUEUE",
  "HASH_TABLE": "HASH_TABLE",
  "BINARY_TREE": "BINARY_TREE",
  "BINARY_SEARCH_TREE": "BINARY_SEARCH_TREE",
  "TRIE": "TRIE",
  "HEAP": "HEAP",
  "GRAPH": "GRAPH"
};

const { Problem } = initSchema(schema);

export {
  Problem,
  Difficulty,
  Algorithm,
  DataStructure
};