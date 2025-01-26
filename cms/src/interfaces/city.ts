import { ICountry } from "./country";

export interface ICity {
    id: string;
    name: string
}

export interface ICities {
    country: ICountry;
    cities: ICity[]
}