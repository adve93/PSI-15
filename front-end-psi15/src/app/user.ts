import { Item } from "./item";

export interface User{
    username: string;
    password: string;
    wallet: number;
    games: Map<String, Date>;
    cart: Map<string, number>;
    image: string;

}