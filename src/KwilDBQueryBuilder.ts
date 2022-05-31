import { Knex } from "knex";

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

export class KwilDBQueryBuilder {
  private queryBuilder: Knex.QueryBuilder;

  constructor(
    private kwildb: any,
    knex: Knex,
    tableName: string,
    schemaName?: string,
    private sync = false
  ) {
    this.queryBuilder = schemaName
      ? knex(tableName).withSchema(schemaName)
      : knex(tableName);
  }

  public async execute(sync = this.sync) {
    return await this.kwildb.query(this.queryBuilder.toString(), sync);
  }

  public async first(sync = this.sync) {
    this.queryBuilder.limit(1);
    const result = await this.execute(sync);
    return result.rows[0] || null;
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

  public whereBetween(columnName: string | number | symbol, range: [any, any]) {
    this.queryBuilder.whereBetween(columnName, range);
    return this;
  }

  public andWhereBetween(
    columnName: string | number | symbol,
    range: [any, any]
  ) {
    return this.whereBetween(columnName, range);
  }

  public orWhereBetween(
    columnName: string | number | symbol,
    range: [any, any]
  ) {
    this.queryBuilder.orWhereBetween(columnName, range);
    return this;
  }

  public whereNotBetween(
    columnName: string | number | symbol,
    range: [any, any]
  ) {
    this.queryBuilder.whereNotBetween(columnName, range);
    return this;
  }

  public andWhereNotBetween(
    columnName: string | number | symbol,
    range: [any, any]
  ) {
    return this.whereNotBetween(columnName, range);
  }

  public orWhereNotBetween(
    columnName: string | number | symbol,
    range: [any, any]
  ) {
    this.queryBuilder.orWhereNotBetween(columnName, range);
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

  public orderBy(columnName: string | number | symbol, direction?: any) {
    this.queryBuilder.orderBy(columnName, direction);
    return this;
  }

  public limit(value: number) {
    this.queryBuilder.limit(value);
    return this;
  }

  // Truncate Query
  public async truncate(sync = this.sync) {
    this.queryBuilder.truncate();
    const result = await this.execute(sync);
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

  public async insert(columns: any, sync = this.sync) {
    this.queryBuilder.insert(columns);
    const result = await this.execute(sync);
    return result;
  }

  // Update Query

  public async update(data: any, returning: any, sync = this.sync) {
    this.queryBuilder.update(data, returning);
    const result = await this.execute(sync);
    return result;
  }

  // Delete Query

  public async del(returning?: string | string[], sync = this.sync) {
    returning ? this.queryBuilder.del(returning) : this.queryBuilder.del();
    const result = await this.execute(sync);
    return result;
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
