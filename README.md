# KwilDB-Query-Builder

A SQL query builder for KwilDB.

Built on top of [Knex.js](https://knexjs.org/).



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



