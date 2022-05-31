# KwilDB-Query-Builder

- A SQL query builder for [KwilDB](https://kwil.com/).
- Built on top of [Knex.js](https://knexjs.org/).
- Built-in typescript support

## Installation

```shell
npm install kwildb-query-builder
```

## Initialization

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

## Documentation

browse [Documentation](https://soheil555.github.io/kwildb-query-builder/)

## Schema and Table builder

```typescript
// create and drop schema

kwildb.createSchema(schemaName: string, sync = true)

kwildb.dropSchema(schemaName: string, cascade?: boolean, sync = true)

kwildb.dropSchemaIfExists(
    schemaName: string,
    cascade?: boolean,
    sync = true
  )


// create and drop table

kwildb.createTable(
    tableName: string,
    builder: (tableBuilder: Knex.CreateTableBuilder) => any,
    schemaName?: string,
    sync = true
  )

kwildb.dropTable(tableName: string, sync = true)

kwildb.dropTableIfExists(tableName: string, sync = true)

```

### Example

```typescript
const kwildb = new KwilDB({
  host: "test-db.kwil.xyz",
  protocol: "https",
  moat: "testdemo",
  privateKey: privateKey,
  secret,
});

// create a table
// second argument is a callback function to modify the table's structure using the knex.js schema-building commands.
await kwildb.createTable(
  "users",
  (builder) => {
    builder.increments("id"), builder.string("name"), builder.integer("age");
  },
  "testSchema"
);

// drop a schema
await kwildb.dropSchema("testSchema");
```

look at [knex.js Schema Builder page](http://knexjs.org/guide/schema-builder.html) for more info

## QueryBuilder

```typescript
kwildb.query(tableName: string, schemaName?: string, sync = false)
```

### Example

```typescript
const kwildb = new KwilDB({
  host: "test-db.kwil.xyz",
  protocol: "https",
  moat: "testdemo",
  privateKey: privateKey,
  secret,
});

// For read queries except execute() and first() methods you have to end the method chain with execute() method to run it.
const result = await kwildb
  .query("users", "testSchema")
  .select("name")
  .whereNull("age")
  .execute();

await kwildb.query("users").insert(
  [
    {
      name: "test1",
    },
    {
      name: "test2",
    },
  ],
  true
);
```

### Supported methods

list of all available methods **except execute() and first() methods** are available at [query builder documentation page](https://soheil555.github.io/kwildb-query-builder/classes/KwilDBQueryBuilder.html)

### Syntax

Syntax of all available methods is the same as knex.js query builder syntax.

you can find knex.js query builder documentation page at http://knexjs.org/guide/query-builder

### execute and first Query builder methods

#### execute

```typescript
execute(sync?: boolean)
```

For read queries except first() , you have to end the method chain with execute() method to run it.

```typescript
const result = await kwildb.query("users").max("age as a").execute();
```

#### first

The select queries always return an array of objects, even when the query is intended to fetch a single row. However, using the `first` method will give you the first row or null (when there are no rows).

```typescript
const user = await kwildb.query("users").where("id", 1).first();
if (user) {
  console.log(user);
}
```

## Raw Query

```typescript
kwildb.rawQuery(query: string, sync = false)
kwildb.preparedStatement(query: string, values: any[], sync = false)
```

# License

Available under the MIT license. See the `LICENSE` file for more info.
