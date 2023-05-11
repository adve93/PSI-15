import { Item } from "./item";

export interface User{
    username: string;
    password: string;
    pfpPic: string;
    wallet: number;
    cart: Map<Item, number>;
}