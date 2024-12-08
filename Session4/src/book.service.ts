import { PostDto } from './book.model';

export class BookService {
  books: PostDto[] = [
    {
      id: '1',
      title: '대머리가 되는 법',
      author: '주호민',
      isAvailable: true,
      createdDt: new Date(),
    },
    {
      id: '2',
      title: '나는 왜 개천재일까',
      author: '이병건',
      isAvailable: true,
      createdDt: new Date(),
    },
  ];

  getAllPosts() {
    return this.books;
  }

  createPost(postDto: PostDto) {
    const id = this.books.length + 1;
    this.books.push({ id: id.toString(), ...postDto, createdDt: new Date() });
  }

  getPost(id: string) {
    const post = this.books.find((post) => post.id === id);
    return post;
  }

  delete(id: string) {
    const filteredPosts = this.books.filter((post) => post.id !== id);
    this.books = [...filteredPosts];
  }

  updatePost(id: string, postDto: PostDto) {
    const updateIndex = this.books.findIndex((post) => post.id === id);
    const updatePost = { id, ...postDto, updatedDt: new Date() };
    this.books[updateIndex] = updatePost;
    return updatePost;
  }
}
