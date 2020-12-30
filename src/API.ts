/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProblemInput = {
  id?: string | null,
  title: string,
  url: string,
  replUrl: string,
  notes: string,
  difficulty: Difficulty,
  duration: string,
  timestamp: number,
  algorithms: Array< Algorithm >,
  dataStructures: Array< DataStructure >,
  _version?: number | null,
};

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


export type ModelProblemConditionInput = {
  title?: ModelStringInput | null,
  url?: ModelStringInput | null,
  replUrl?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  difficulty?: ModelDifficultyInput | null,
  duration?: ModelStringInput | null,
  timestamp?: ModelIntInput | null,
  algorithms?: ModelAlgorithmListInput | null,
  dataStructures?: ModelDataStructureListInput | null,
  and?: Array< ModelProblemConditionInput | null > | null,
  or?: Array< ModelProblemConditionInput | null > | null,
  not?: ModelProblemConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelDifficultyInput = {
  eq?: Difficulty | null,
  ne?: Difficulty | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelAlgorithmListInput = {
  eq?: Array< Algorithm | null > | null,
  ne?: Array< Algorithm | null > | null,
  contains?: Algorithm | null,
  notContains?: Algorithm | null,
};

export type ModelDataStructureListInput = {
  eq?: Array< DataStructure | null > | null,
  ne?: Array< DataStructure | null > | null,
  contains?: DataStructure | null,
  notContains?: DataStructure | null,
};

export type UpdateProblemInput = {
  id: string,
  title?: string | null,
  url?: string | null,
  replUrl?: string | null,
  notes?: string | null,
  difficulty?: Difficulty | null,
  duration?: string | null,
  timestamp?: number | null,
  algorithms?: Array< Algorithm > | null,
  dataStructures?: Array< DataStructure > | null,
  _version?: number | null,
};

export type DeleteProblemInput = {
  id?: string | null,
  _version?: number | null,
};

export type ModelProblemFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  url?: ModelStringInput | null,
  replUrl?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  difficulty?: ModelDifficultyInput | null,
  duration?: ModelStringInput | null,
  timestamp?: ModelIntInput | null,
  algorithms?: ModelAlgorithmListInput | null,
  dataStructures?: ModelDataStructureListInput | null,
  and?: Array< ModelProblemFilterInput | null > | null,
  or?: Array< ModelProblemFilterInput | null > | null,
  not?: ModelProblemFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type CreateProblemMutationVariables = {
  input: CreateProblemInput,
  condition?: ModelProblemConditionInput | null,
};

export type CreateProblemMutation = {
  createProblem:  {
    __typename: "Problem",
    id: string,
    title: string,
    url: string,
    replUrl: string,
    notes: string,
    difficulty: Difficulty,
    duration: string,
    timestamp: number,
    algorithms: Array< Algorithm >,
    dataStructures: Array< DataStructure >,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateProblemMutationVariables = {
  input: UpdateProblemInput,
  condition?: ModelProblemConditionInput | null,
};

export type UpdateProblemMutation = {
  updateProblem:  {
    __typename: "Problem",
    id: string,
    title: string,
    url: string,
    replUrl: string,
    notes: string,
    difficulty: Difficulty,
    duration: string,
    timestamp: number,
    algorithms: Array< Algorithm >,
    dataStructures: Array< DataStructure >,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteProblemMutationVariables = {
  input: DeleteProblemInput,
  condition?: ModelProblemConditionInput | null,
};

export type DeleteProblemMutation = {
  deleteProblem:  {
    __typename: "Problem",
    id: string,
    title: string,
    url: string,
    replUrl: string,
    notes: string,
    difficulty: Difficulty,
    duration: string,
    timestamp: number,
    algorithms: Array< Algorithm >,
    dataStructures: Array< DataStructure >,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type SyncProblemsQueryVariables = {
  filter?: ModelProblemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncProblemsQuery = {
  syncProblems:  {
    __typename: "ModelProblemConnection",
    items:  Array< {
      __typename: "Problem",
      id: string,
      title: string,
      url: string,
      replUrl: string,
      notes: string,
      difficulty: Difficulty,
      duration: string,
      timestamp: number,
      algorithms: Array< Algorithm >,
      dataStructures: Array< DataStructure >,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type GetProblemQueryVariables = {
  id: string,
};

export type GetProblemQuery = {
  getProblem:  {
    __typename: "Problem",
    id: string,
    title: string,
    url: string,
    replUrl: string,
    notes: string,
    difficulty: Difficulty,
    duration: string,
    timestamp: number,
    algorithms: Array< Algorithm >,
    dataStructures: Array< DataStructure >,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListProblemsQueryVariables = {
  filter?: ModelProblemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProblemsQuery = {
  listProblems:  {
    __typename: "ModelProblemConnection",
    items:  Array< {
      __typename: "Problem",
      id: string,
      title: string,
      url: string,
      replUrl: string,
      notes: string,
      difficulty: Difficulty,
      duration: string,
      timestamp: number,
      algorithms: Array< Algorithm >,
      dataStructures: Array< DataStructure >,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type OnCreateProblemSubscriptionVariables = {
  owner: string,
};

export type OnCreateProblemSubscription = {
  onCreateProblem:  {
    __typename: "Problem",
    id: string,
    title: string,
    url: string,
    replUrl: string,
    notes: string,
    difficulty: Difficulty,
    duration: string,
    timestamp: number,
    algorithms: Array< Algorithm >,
    dataStructures: Array< DataStructure >,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateProblemSubscriptionVariables = {
  owner: string,
};

export type OnUpdateProblemSubscription = {
  onUpdateProblem:  {
    __typename: "Problem",
    id: string,
    title: string,
    url: string,
    replUrl: string,
    notes: string,
    difficulty: Difficulty,
    duration: string,
    timestamp: number,
    algorithms: Array< Algorithm >,
    dataStructures: Array< DataStructure >,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteProblemSubscriptionVariables = {
  owner: string,
};

export type OnDeleteProblemSubscription = {
  onDeleteProblem:  {
    __typename: "Problem",
    id: string,
    title: string,
    url: string,
    replUrl: string,
    notes: string,
    difficulty: Difficulty,
    duration: string,
    timestamp: number,
    algorithms: Array< Algorithm >,
    dataStructures: Array< DataStructure >,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};
