import { ChangeEventHandler } from "react";

export interface InputProps {
    className?: string;
    text?: string;
    name: string
    value?: string 
    placeholder?: string;
    type?: string
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  }


export interface responseData{
  perfumeID: string;
  name: string;
  brand: string;
  fragrance: string;
  volumeML: number;
  price: number;
  stock: number;
  rating: number;
  gender: string;
  description: string;
  imageURL: string;
  public_id: string;
}


export interface responseApiSuccess {
    data: responseData[];
    status: number
    message: string;
}



export interface responseError {
  message: string
  name: string
  code: string  //'ERR_NETWORK',
}