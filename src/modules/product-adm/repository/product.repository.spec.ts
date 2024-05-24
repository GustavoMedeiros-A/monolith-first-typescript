import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import { ProductRepository } from "./product.repository";
import { AppDataSource } from "../../@shared/core/datasource";
import { DataSource } from "typeorm";

// const productArray: ProductModel = [
//   {
//     id: new Id("1"),
//     name: "product1",
//     description: "Product 1 description",
//     purchasePrice: 100,
//     stock: 10,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];

describe("ProductRepository test", () => {
  let productRepository: ProductRepository;
  let dataSource: DataSource;
  beforeEach(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [ProductModel],
      synchronize: true,
      logging: false,
    });
    await dataSource.initialize();
  });

  afterEach(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  });

  test("should create a product", async () => {
    const productProps = {
      id: new Id("1"),
      name: "product1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    };

    const product = new Product(productProps);
    productRepository = new ProductRepository(dataSource); // Can be defined in the BEFORE EACH to avoid duplication
    await productRepository.add(product);

    const productDb = await dataSource.getRepository(ProductModel).findOne({
      where: { id: productProps.id.getId },
    });

    expect(productProps.id.getId).toEqual(productDb?.id);
    expect(productProps.name).toEqual(productDb?.name);
    expect(productProps.description).toEqual(productDb?.description);
    expect(productProps.purchasePrice).toEqual(productDb?.purchasePrice);
    expect(productProps.stock).toEqual(productDb?.stock);
  });

  test("should find a product", async () => {
    const productProps = {
      id: new Id("1"),
      name: "product1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    };

    productRepository = new ProductRepository(dataSource);
    await productRepository.add(new Product(productProps));

    const product = await productRepository.find("1");
    expect(product.id.getId).toBe("1");
    expect(product.name).toBe("product1");
    expect(product.description).toBe("Product 1 description");
    expect(product.purchasePrice).toBe(100);
    expect(product.stock).toBe(10);
  });
});
