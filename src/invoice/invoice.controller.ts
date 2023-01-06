import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceDto } from './invoice.dto';
import { InvoiceDetailDto } from './invoice-detail.dto';

@Controller('invoice')
export class InvoiceController {
    constructor(private readonly service: InvoiceService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getInvoices(): InvoiceDto[] {
        return this.service.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getInvoiceById(@Param('id') id: string): InvoiceDto {
        return this.service.getById(id);
    }

    @Get(':id/:idDetail')
    @HttpCode(HttpStatus.OK)
    getInvoiceDetailById(@Param('id') id: string, @Param('idDetail') idDetail: string): InvoiceDetailDto {
        return this.service.getDetailById(id, idDetail);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    postInvoice(@Body() body: InvoiceDto): InvoiceDto {
        return this.service.insert(body);
    }

    @Post(':id')
    @HttpCode(HttpStatus.CREATED)
    postInvoiceDetail(@Param('id') id: string, @Body() body: InvoiceDetailDto): InvoiceDetailDto {
        return this.service.insertDetail(id, body);
    }

}
