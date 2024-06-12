export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  rating: number;
}

export interface Recipe {
  id?: number; // Optional property for ID
  name: string;
  description: string;
  likes: number;
  videoUrl?: string; // Optional property for video URL
  thumbnailImageUrl?: string; // Optional property for thumbnail image URL
}

export interface IUser {
  username: string;
  password: string;
  email: string;
  userType: string;
  address: string;
}
