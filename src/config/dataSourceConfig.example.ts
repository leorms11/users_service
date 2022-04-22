import { DataSourceOptions } from "typeorm";

export const dataSourceConfig: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: "",
  username: "",
  password: "",
  synchronize: false,
  logging: true,
  entities: ["src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: ["src/shared/infra/typeorm/migrations/*.ts"],
};
