import { Item } from "./item";

export interface User{
    username: string;
    password: string;
    wallet: number;
    games: Map<String, Date>;
    cart: Map<String, number>;
    image: string;

}