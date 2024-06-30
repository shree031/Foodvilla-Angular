export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  rating: number;
  status: string;
  type: 'Vegetables' | 'Fruits' | 'Ingredients';
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  likes: number;
  videoUrl?: string;
  thumbnailImageUrl?: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  userType: string;
  address: string;
}
