export interface AddProductFacadeInputDto {
  id?: string;
  name: string;
  description?: string;
  purchasePrice: number;
  stock: number;
}
export interface CheckStockFacadeInputDto {
  productId: string;
}

export interface CheckStockFacadaOutputDto {
  productId: string;
  stock: number;
}

export default interface ProductAdmFacadeInterface {
  addProduct(input: AddProductFacadeInputDto): Promise<void>;
  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadaOutputDto>;
}
