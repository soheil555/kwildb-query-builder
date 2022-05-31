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





### QueryBuilder

```typescript
query(tableName: string, schemaName?: string, sync = false)
```

#### example

```typescript
const kwildb = new KwilDB({
  host: "test-db.kwil.xyz",
  protocol: "https",
  moat: "testdemo",
  privateKey: privateKey,
  secret,
});


// for read
await kwildb.query("users", "testSchema").select("name").whereNull("age").execute()


await kwildb.query("users").insert([
    {
        name: "test1",
    },
    {
        name: "test2",
    },
]);

```





# License

Available under the MIT license. See the `LICENSE` file for more info.