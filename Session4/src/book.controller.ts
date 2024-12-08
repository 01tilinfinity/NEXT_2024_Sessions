import {
  Controller,
  Param,
  Body,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { PostDto } from './book.model';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllPosts() {
    console.log('모든 책 조회');
    return this.bookService.getAllPosts();
  }

  @Post()
  createPost(@Body() postDto: PostDto) {
    console.log('책 등록');
    this.bookService.createPost(postDto);
    return 'success';
  }

  @Get('/:id')
  getPost(@Param('id') id: string) {
    console.log('책 하나 조회');
    return this.bookService.getPost(id);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    console.log('책 삭제');
    this.bookService.delete(id);
    return 'success';
  }

  @Put('/:id')
  updatePost(@Param('id') id: string, @Body() postDto: PostDto) {
    console.log('책 업데이트', id, postDto);
    return this.bookService.updatePost(id, postDto);
  }
}
