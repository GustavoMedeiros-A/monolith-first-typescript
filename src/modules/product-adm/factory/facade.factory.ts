import { AppDataSource } from "../../@shared/core/datasource";
import ProductAdmFacade from "../facade/product-adm.facade";
import { ProductRepository } from "../repository/product.repository";
import AddProductUseCase from "../useCase/add-product/add-product.usecase";

export default class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepository(AppDataSource);
    const addProductUseCase = new AddProductUseCase(productRepository);
    // const checkStockUseCase = new CheckStockUseCase(productRepository);
    const productFacade = new ProductAdmFacade({
      addProductUseCase: addProductUseCase,
      stockUseCase: undefined,
    });

    return productFacade;
  }
}
