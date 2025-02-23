interface Category {
  id: string
  name: string
  
}
export interface Tag {
  id: string
  name: string
}
export interface Size {
  id: string
  name: string
}

export interface Media {
  id: string
  mediaType: string
  url:string
}
export interface Color {
  id: string
  name: string
  cod: string
}
interface Sale{
  id : string
  discountPercentage : number
  startDate : Date
  endDate : Date
}
export interface Varient {
  id: string
  name: string
  image: string
  price: number,
  stock : number
}
export interface Product {
  
  id: string; 
  name: string; 
  image: string; 
  description: string; 
  price: number; 
  stock: number;
  model : string;
  medias : Media[]
  category : Category
  tags : Tag[]
  colors : Color[]
  sizes : Size[]
  varients: Varient[]
  sale : Sale
}
export default Category



