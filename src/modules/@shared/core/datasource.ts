import { DataSource } from "typeorm";
import { ProductModel } from "../../product-adm/repository/product.model";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  dropSchema: true,
  entities: [ProductModel],
  synchronize: true,
  logging: false,
});
