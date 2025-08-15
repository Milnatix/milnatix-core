interface ProductDetailsResponseDTOProps {
  id: string
  name: string
  description: string | null
  salePrice: number
  costPrice: number
  isAvailable: boolean
}

export class ProductDetailsResponseDTO implements ProductDetailsResponseDTOProps {
  public readonly id: string
  public readonly name: string
  public readonly description: string | null
  public readonly salePrice: number
  public readonly costPrice: number
  public readonly isAvailable: boolean

  constructor(props: ProductDetailsResponseDTOProps) {
    this.id = props.id
    this.name = props.name
    this.description = props.description
    this.salePrice = props.salePrice
    this.costPrice = props.costPrice
    this.isAvailable = props.isAvailable
  }

}