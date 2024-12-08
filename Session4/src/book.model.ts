export interface PostDto {
  id: string;
  title: string;
  author: string;
  isAvailable: boolean;
  createdDt?: Date;
}
