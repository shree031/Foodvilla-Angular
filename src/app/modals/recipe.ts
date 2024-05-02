export interface Recipe {
  id?: number; // Optional property for ID
  name: string;
  description: string;
  likes: number;
  videoUrl?: string; // Optional property for video URL
  thumbnailImageUrl?: string; // Optional property for thumbnail image URL
}
