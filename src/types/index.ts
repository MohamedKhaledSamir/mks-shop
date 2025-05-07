export interface brand {
  _id: number;
  name: string;
  image: string;
}
export interface category {
  _id: string;
  name: string;
  image: string;
}

export interface product {
  images: string[];
  imageCover: string;
  id: string;
  title: string;
  sold: number;
  quantity: number;
  description: string;
  price: 191;
  category: {
    name: string;
  };
  brand: {
    name: string;
  };
  ratingsAverage: number;
  ratingsNumber: number;
}
