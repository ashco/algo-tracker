export const schema = {
    "models": {
        "Problem": {
            "name": "Problem",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "url": {
                    "name": "url",
                    "isArray": false,
                    "type": "AWSURL",
                    "isRequired": true,
                    "attributes": []
                },
                "replUrl": {
                    "name": "replUrl",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "notes": {
                    "name": "notes",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "difficulty": {
                    "name": "difficulty",
                    "isArray": false,
                    "type": {
                        "enum": "Difficulty"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "duration": {
                    "name": "duration",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "timestamp": {
                    "name": "timestamp",
                    "isArray": false,
                    "type": "AWSTimestamp",
                    "isRequired": true,
                    "attributes": []
                },
                "algorithms": {
                    "name": "algorithms",
                    "isArray": true,
                    "type": {
                        "enum": "Algorithm"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "dataStructures": {
                    "name": "dataStructures",
                    "isArray": true,
                    "type": {
                        "enum": "DataStructure"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                }
            },
            "syncable": true,
            "pluralName": "Problems",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "allow": "public",
                                "operations": [
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "Difficulty": {
            "name": "Difficulty",
            "values": [
                "EASY",
                "MEDIUM",
                "HARD"
            ]
        },
        "Algorithm": {
            "name": "Algorithm",
            "values": [
                "DYNAMIC_PROGRAMMING",
                "POINTERS",
                "BINARY_SEARCH",
                "DFS",
                "BFS",
                "QUICK_SORT",
                "MERGE_SORT",
                "RECURSION",
                "GREEDY_METHOD"
            ]
        },
        "DataStructure": {
            "name": "DataStructure",
            "values": [
                "ARRAY",
                "STRING",
                "LINKED_LIST",
                "STACK",
                "QUEUE",
                "HASH_TABLE",
                "BINARY_TREE",
                "BINARY_SEARCH_TREE",
                "TRIE",
                "HEAP",
                "GRAPH"
            ]
        }
    },
    "nonModels": {},
    "version": "9d1c1bba31e7345fb331c1b3e7d500e8"
};