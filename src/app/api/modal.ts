interface Category {
  id: string
  name: string
  grado : number
  children : Category[]
  models : Model[]
}
export interface Tag {
  id: string
  name: string
}
export interface Admin {
  id: string
  username: string
  email : string
  check: boolean;
  products: Product[];
  sentMessages: Message[];
}

export interface SupportRequest {
  id: string
  subject: string
  message: string
  status: string;
  user : User;
  createdAt: Date;
  messages: Message[]
}

export interface Message {
  id: string
  content: string;
  userSender: User;
  adminSender: Admin;
  createdAt: Date;
  supportRequest: SupportRequest;
}

export interface Address {
  id: string
  userId : string
  indirizzo1: string
  indirizzo2: string
  comune: string
  stato : string
  CAP : number
  civico : string
  telefono : number
  provincia: string
  regione: string
}

export interface Model {
  id: string
  name: string
  categoryId : string
}
export interface Size {
  id: string
  name: string
  price : number
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
  price : number
}

export interface User {
  id: string
  username: string
  email : string
  
  carts : cart[]
  addresses : Address[],
  orders: order[]
}
export interface cart{
  id : string
  userId : string
  productId : string
  size : string
  color : string
  variente : string,
  quantity : number
  totale : number
  product : Product
}
export interface payment{
  id : string
  amount : number
  method : string
  status : string
}

export interface shipment{
  id : string
  trackingNumber : string
  carrier : string
  status : string
  address : Address
}
export interface order{
  id : string
  userId : string
  totalAmount : number
  status : string
  carts : cart[]
  shipment : shipment
  payment : payment
  user : User
  createdAt : Date
}
export interface Sale{
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
  numberSerial : string;
  price: number; 
  stock: number;
  models : Model[];
  medias : Media[]
  category : Category[]
  tags : Tag[]
  colors : Color[]
  sizes : Size[]
  varients: Varient[]
  sale : Sale
}
export default Category



