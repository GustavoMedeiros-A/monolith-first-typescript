import Product from "../../domain/product.entity";
import { AddProductInputDto } from "./add-product.dto";
import AddProductUseCase from "./add-product.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add Product usecase unit test", () => {
  test("should add a product", async () => {
    // repositorio
    // const productRepository = new ProductRepository();
    const productRepository = MockRepository();

    // usecase

    const usecase = new AddProductUseCase(productRepository);
    const input: AddProductInputDto = {
      name: "product1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    };
    const result = await usecase.execute(input);

    // input
    expect(productRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.description).toBe(input.description);
    expect(result.purchasePrice).toBe(input.purchasePrice);
    expect(result.stock).toBe(input.stock);
    // output
  });
});
