import Product from "../domain/product.entity";

export default interface ProductGateway {
  add(procuct: Product): Promise<void>;
  find(id: string): Promise<Product>;
}
