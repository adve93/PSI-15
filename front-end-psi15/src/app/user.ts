import { Item } from "./item";

export interface User{
    username: string;
    password: string;
    wallet: number;
    games: Map<Item, Date>;
    cart: Map<Item, number>;
    image: string;
}