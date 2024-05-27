import { DataSource } from "typeorm";
import { ProductModel } from "../repository/product.model";
import { ProductRepository } from "../repository/product.repository";
import AddProductUseCase from "../useCase/add-product/add-product.usecase";
import ProductAdmFacade from "./product-adm.facade";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import { AppDataSource } from "../../@shared/core/datasource";

describe("ProductAdmFacade test", () => {
  let productRepository: ProductRepository;
  let dataSource: DataSource;
  beforeEach(async () => {
    // dataSource = new DataSource({
    //   type: "sqlite",
    //   database: ":memory:",
    //   dropSchema: true,
    //   entities: [ProductModel],
    //   synchronize: true,
    //   logging: false,
    // });
    dataSource = AppDataSource;
    await dataSource.initialize();
    productRepository = new ProductRepository(dataSource);
  });

  // afterEach(async () => {
  //   if (dataSource.isInitialized) {
  //     await dataSource.destroy();
  //   }
  // });

  test("should create a product", async () => {
    // const addProductUseCase = new AddProductUseCase(productRepository);
    // const productFacade = new ProductAdmFacade({
    //   addProductUseCase: addProductUseCase,
    //   stockUseCase: undefined,
    // });
    const input = {
      id: "1",
      name: "product1",
      description: "Product 1 desc",
      purchasePrice: 100,
      stock: 10,
    };

    const productFacade = ProductAdmFacadeFactory.create();

    await productFacade.addProduct(input);
    const product = await dataSource.getRepository(ProductModel).findOne({
      where: { id: input.id },
    });

    expect(product).toBeDefined();
    // expect(product?.id?).toBe(input.id);
    expect(product?.name).toBe(input.name);
    expect(product?.description).toBe(input.description);
    expect(product?.purchasePrice).toBe(input.purchasePrice);
    expect(product?.stock).toBe(input.stock);
  });
});
