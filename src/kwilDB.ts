const KwilDBAPI = require("kwildb");
import { knex, Knex } from "knex";
import { Exception } from "@poppinss/utils";

type Config = {
  host: string;
  protocol: string;
  moat: string;
  privateKey: string;
  secret: string;
};

type ClearStatements =
  | "with"
  | "select"
  | "columns"
  | "hintComments"
  | "where"
  | "union"
  | "using"
  | "join"
  | "group"
  | "order"
  | "having"
  | "limit"
  | "offset"
  | "counter"
  | "counters";

export class KwilDB {
  private kwildb: any;
  private knex: Knex;

  constructor(config: Config) {
    this.kwildb = KwilDBAPI.createConnector(
      {
        host: config.host,
        protocol: config.protocol,
        moat: config.moat,
        privateKey: config.privateKey,
      },
      config.secret
    );
    this.knex = knex({ client: "pg" });
  }

  query(tableName: string) {
    return new KwilDBQueryBuilder(this.kwildb, this.knex, tableName);
  }
}

export class KwilDBQueryBuilder {
  private queryBuilder: Knex.QueryBuilder;

  constructor(private kwildb: any, knex: Knex, tableName: string) {
    this.queryBuilder = knex(tableName);
  }

  public async execute(sync = false) {
    return await this.kwildb.query(this.queryBuilder.toString(), sync);
  }

  //TODO: do we need sync in first and firstOrFail
  public async first(sync = false) {
    this.queryBuilder.limit(1);
    const result = await this.execute(sync);
    return result[0] || null;
  }

  public async firstOrFail(sync = false) {
    const row = this.first(sync);
    if (!row) {
      throw new Exception("Row not found", 404, "ROW_NOT_FOUND");
    }

    return row;
  }

  // Select

  public select(...args: any[]) {
    this.queryBuilder.select(...args);
    return this;
  }

  // Where Methods

  public where(key: any, operator?: any, value?: any) {
    this.queryBuilder.where(key, operator, value);
    return this;
  }

  public whereNotNull(columnName: string | number | symbol) {
    this.queryBuilder.whereNotNull(columnName);
    return this;
  }

  public whereNull(columnName: string | number | symbol) {
    this.queryBuilder.whereNull(columnName);
    return this;
  }

  public andWhere(key: any, operator?: any, value?: any) {
    return this.where(key, operator, value);
  }

  public whereIn(columnName: string | number | symbol, values: any[]) {
    this.queryBuilder.whereIn(columnName, values);
    return this;
  }

  public whereLike(key: any, value: any) {
    this.queryBuilder.whereLike(key, value);
    return this;
  }

  public andWhereLike(key: any, value: any) {
    return this.whereLike(key, value);
  }

  public orWhereLike(key: any, value: any) {
    this.queryBuilder.orWhereLike(key, value);
    return this;
  }

  public whereILike(key: any, value: any) {
    this.queryBuilder.whereILike(key, value);
    return this;
  }

  public andWhereILike(key: any, value: any) {
    return this.whereILike(key, value);
  }

  public orWhereILike(key: any, value: any) {
    this.queryBuilder.orWhereILike(key, value);
    return this;
  }

  // Join Methods

  public join(table: any, first: any, operator?: any, second?: any) {
    this.queryBuilder.join(table, first, operator, second);
    return this;
  }

  public innerJoin(table: any, first: any, operator?: any, second?: any) {
    this.queryBuilder.innerJoin(table, first, operator, second);
    return this;
  }

  public leftJoin(table: any, first: any, operator?: any, second?: any) {
    this.queryBuilder.leftJoin(table, first, operator, second);
    return this;
  }

  public rightJoin(table: any, first: any, operator?: any, second?: any) {
    this.queryBuilder.rightJoin(table, first, operator, second);
    return this;
  }

  // Insert Query

  public insert(columns: any) {
    this.queryBuilder.insert(columns);
    return this;
  }

  // Update Query

  public update(data: any, returning: any) {
    this.queryBuilder.update(data, returning);
    return this;
  }

  // Delete Query

  public del(returning?: string | string[]) {
    returning ? this.queryBuilder.del(returning) : this.queryBuilder.del();
    return this;
  }

  public delete(returning?: string | string[]) {
    return this.del(returning);
  }

  // Aggregators

  public count(columns: any, alias?: any) {
    this.queryBuilder.count(columns, alias);
    return this;
  }

  public min(columns: any, alias?: any) {
    this.queryBuilder.min(columns, alias);
    return this;
  }

  public max(columns: any, alias?: any) {
    this.queryBuilder.max(columns, alias);
    return this;
  }

  public sum(columns: any, alias?: any) {
    this.queryBuilder.sum(columns, alias);
    return this;
  }

  public avg(columns: any, alias?: any) {
    this.queryBuilder.avg(columns, alias);
    return this;
  }

  // Clear

  public clear(statement: ClearStatements) {
    this.queryBuilder.clear(statement);
    return this;
  }
}

let db = new KwilDB({
  host: "",
  protocol: "",
  moat: "",
  privateKey: "",
  secret: "",
});

db.query("users").select("*").where("name", "soheil");
