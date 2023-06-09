import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { AuthJwt } from 'src/util/decorator/auth.decorator';
import { User } from 'src/util/decorator/user.decorator';
import { FindLinkDto } from './dto/find-link.dto';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @AuthJwt()
  @Post()
  create(@Body() createLinkDto: CreateLinkDto, @User() user) {
    return this.linkService.create(createLinkDto, user);
  }

  @AuthJwt()
  @Get()
  findAll(@User() user) {
    return this.linkService.findAll(user);
  }

  @AuthJwt()
  @Post('search')
  findMany(@Body() dto: FindLinkDto, @User() user) {
    return this.linkService.findMany(dto, user);
  }

  @AuthJwt()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linkService.findOne(+id);
  }

  @AuthJwt()
  @Post(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linkService.update(+id, updateLinkDto);
  }

  @AuthJwt()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(id);
  }
}
