import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from "@aws-amplify/datastore";

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export enum Algorithm {
  DYNAMIC_PROGRAMMING = "DYNAMIC_PROGRAMMING",
  POINTERS = "POINTERS",
  BINARY_SEARCH = "BINARY_SEARCH",
  DFS = "DFS",
  BFS = "BFS",
  QUICK_SORT = "QUICK_SORT",
  MERGE_SORT = "MERGE_SORT",
  RECURSION = "RECURSION",
  GREEDY_METHOD = "GREEDY_METHOD",
}

export enum DataStructure {
  ARRAY = "ARRAY",
  STRING = "STRING",
  LINKED_LIST = "LINKED_LIST",
  STACK = "STACK",
  QUEUE = "QUEUE",
  HASH_TABLE = "HASH_TABLE",
  BINARY_TREE = "BINARY_TREE",
  BINARY_SEARCH_TREE = "BINARY_SEARCH_TREE",
  TRIE = "TRIE",
  HEAP = "HEAP",
  GRAPH = "GRAPH",
}

export declare class Problem {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly replUrl: string;
  readonly notes: string;
  readonly difficulty: Difficulty;
  readonly duration: string;
  readonly timestamp: number;
  readonly algorithms: Algorithm[];
  readonly dataStructures: DataStructure[];
  constructor(init: ModelInit<Problem>);
  static copyOf(
    source: Problem,
    mutator: (draft: MutableModel<Problem>) => MutableModel<Problem> | void
  ): Problem;
}
