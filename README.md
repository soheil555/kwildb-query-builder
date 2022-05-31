# KwilDB-Query-Builder

A SQL query builder for KwilDB.

Built on top of [Knex.js](https://knexjs.org/).







> Readme is under development. Please come back later.





### Installation

```shell
npm install kwildb-query-builder
```



### Initialization

```typescript
import { readFileSync } from "fs";
import { KwilDB } from "kwildb-query-builder";

let privateKey = JSON.parse(readFileSync("./privateKey.json").toString());
let secret = "LT|UllzAI~.V-10!ITC&nf#IV;KJV6Tk";

const kwildb = new KwilDB({
  host: "test-db.kwil.xyz",
  protocol: "https",
  moat: "testdemo",
  privateKey: privateKey,
  secret,
});
```





### Documentation

browse [Documentation](https://soheil555.github.io/kwildb-query-builder/)



### QueryBuilder

```typescript
query(tableName: string, schemaName?: string, sync = false)
```



#### Example

```typescript
const kwildb = new KwilDB({
  host: "test-db.kwil.xyz",
  protocol: "https",
  moat: "testdemo",
  privateKey: privateKey,
  secret,
});


// for read queries, you have to end the method chain with execute() method.
const result = await kwildb.query("users", "testSchema").select("name").whereNull("age").execute()


await kwildb.query("users").insert([
    {
        name: "test1",
    },
    {
        name: "test2",
    },
]);

```



#### Supported methods

list of all available methods is available at  [query builder documentation page](https://soheil555.github.io/kwildb-query-builder/classes/KwilDBQueryBuilder.html)

#### Syntax

Synx of all available methods is the same as knex.js query builder syntax. 

you can find knex.js query builder documentation page at http://knexjs.org/guide/query-builder



# License

Available under the MIT license. See the `LICENSE` file for more info.