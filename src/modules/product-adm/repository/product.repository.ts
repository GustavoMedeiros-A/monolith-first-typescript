import { DataSource, Repository } from "typeorm";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./product.model";
import { AppDataSource } from "../../@shared/core/datasource";
import Id from "../../@shared/domain/value-object/id.value-object";

export class ProductRepository implements ProductGateway {
  private ormRepository: Repository<ProductModel>;

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(ProductModel);
  }

  async add(product: Product): Promise<void> {
    const productEntity = this.ormRepository.create({
      id: product.id.getId,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.ormRepository.save(productEntity);
  }

  async find(id: string): Promise<Product> {
    const product = await this.ormRepository.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new Error("Not found product");
    }

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  }
}
