export interface Item{
  type: string;
  description: string;
  platform: string;
  languages: string[]; 
  price: number;
  classification: number;
  title: string;
  image: string;
  optional_links: string[]; 
}