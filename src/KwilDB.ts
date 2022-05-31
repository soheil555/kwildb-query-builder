import { KwilDBQueryBuilder } from "./KwilDBQueryBuilder";
import { knex, Knex } from "knex";

const KwilDBAPI = require("kwildb");

type Config = {
  host: string;
  protocol: string;
  moat: string;
  privateKey: string;
  secret: string;
};

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

  public query(tableName: string, schemaName?: string, sync = false) {
    return new KwilDBQueryBuilder(
      this.kwildb,
      this.knex,
      tableName,
      schemaName,
      sync
    );
  }

  // create and drop schema

  public async createSchema(schemaName: string, sync = true) {
    const schemaBuilder = this.knex.schema.createSchema(schemaName);
    const result = await this.kwildb.query(schemaBuilder.toString(), sync);
    return result;
  }

  public async dropSchema(schemaName: string, cascade?: boolean, sync = true) {
    const schemaBuilder = this.knex.schema.dropSchema(schemaName, cascade);

    const result = await this.kwildb.query(schemaBuilder.toString(), sync);
    return result;
  }

  public async dropSchemaIfExists(
    schemaName: string,
    cascade?: boolean,
    sync = true
  ) {
    const schemaBuilder = this.knex.schema.dropSchemaIfExists(
      schemaName,
      cascade
    );

    const result = await this.kwildb.query(schemaBuilder.toString(), sync);
    return result;
  }

  // create and drop table

  public async createTable(
    tableName: string,
    builder: (tableBuilder: Knex.CreateTableBuilder) => any,
    schemaName?: string,
    sync = true
  ) {
    const schemaBuilder = schemaName
      ? this.knex.schema.withSchema(schemaName).createTable(tableName, builder)
      : this.knex.schema.createTable(tableName, builder);

    const result = await this.kwildb.query(schemaBuilder.toString(), sync);
    return result;
  }

  public async dropTable(tableName: string, sync = true) {
    const schemaBuilder = this.knex.schema.dropTable(tableName);
    const result = await this.kwildb.query(schemaBuilder.toString(), sync);
    return result;
  }

  public async dropTableIfExists(tableName: string, sync = true) {
    const schemaBuilder = this.knex.schema.dropTableIfExists(tableName);
    const result = await this.kwildb.query(schemaBuilder.toString(), sync);
    return result;
  }

  // raw queries

  public async rawQuery(query: string, sync = false) {
    const result = await this.kwildb.query(query, sync);
    return result;
  }

  public async preparedStatement(query: string, values: any[], sync = false) {
    const result = await this.kwildb.preparedStatement(query, values, sync);
    return result;
  }
}
