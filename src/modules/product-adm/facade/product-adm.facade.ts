import UseCaseInterface from "../../@shared/useCase/use-case.interface";
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadaOutputDto,
  CheckStockFacadeInputDto,
} from "./product-adm.facade.interface";

export interface UseCaseProps {
  addProductUseCase: UseCaseInterface;
  stockUseCase?: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addProductUseCase: UseCaseInterface;
  private _checkStockUseCase?: UseCaseInterface;

  constructor(useCasesProps: UseCaseProps) {
    (this._addProductUseCase = useCasesProps.addProductUseCase),
      (this._checkStockUseCase = useCasesProps.stockUseCase);
  }

  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    // caso o dto do caso se uso for != da facade, deve-se converter o dto da facade para o dto do caso de uso
    return this._addProductUseCase.execute(input);
  }

  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadaOutputDto> {
    if (!this._checkStockUseCase) {
      throw new Error("Not defined");
    }
    return this._checkStockUseCase.execute(input);
  }
}
