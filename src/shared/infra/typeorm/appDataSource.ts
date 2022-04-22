import { DataSource } from "typeorm";

import { dataSourceConfig } from "@config/dataSourceConfig";

export const appDataSource = new DataSource(dataSourceConfig);
