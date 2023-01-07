import { Injectable } from '@nestjs/common';
import { InvoiceDto } from './invoice.dto';
import { randomUUID } from 'crypto';
import { InvoiceDetailDto } from './invoice-detail.dto';


function totalCalculator(invoice: InvoiceDto[]): void {
    invoice.forEach(i => {
        let subTotal: number = 0;
        i.details.forEach(p => {
            subTotal += p.price*p.quantity
        });
        i.total = subTotal;
    })
}

let invoices: InvoiceDto[] = [
    {
        id: '0',
        details: [
            {
                idDetail: randomUUID(),
                product: 'rice',
                price: 12,
                quantity: 1,
            }
        ],
        total: 0
    },
    {
        id: '1',
        details: [
            {
                idDetail: randomUUID(),
                product: 'chocolate',
                price: 20,
                quantity: 2,
            },
            {
                idDetail: randomUUID(),
                product: 'pencil',
                price: 7,
                quantity: 3,
            }
        ],
        total: 0
    }
];

totalCalculator(invoices);


@Injectable()
export class InvoiceService {
    

    getAll(): InvoiceDto[] {
        return invoices;
    }

    getById(id: string): InvoiceDto {
        let index: number = invoices.findIndex(i => i.id == id);
        return invoices[index];
    }

    getDetailById(id: string, idDEtail: string): InvoiceDetailDto {
        let index: number = invoices.findIndex(i => i.id == id);
        let indexDetail: number = invoices[index].details.findIndex(d => d.idDetail == idDEtail);

        return invoices[index].details[indexDetail];
    }

    insert(invoice: InvoiceDto): InvoiceDto {
        if(invoice.id == null) {
            invoice.id = randomUUID();
        }
        if(invoice.details == null) {
            invoice.details = [];
        }
        invoices.push(invoice);
        totalCalculator(invoices);

        return invoice;
    }
    
    insertDetail(id: string, invoiceDetail: InvoiceDetailDto): InvoiceDetailDto {
        if(invoiceDetail.idDetail == null) {
            invoiceDetail.idDetail = randomUUID();
        }
        if(invoiceDetail.product == null) {
            invoiceDetail.product = 'undefined';
        }
        if(invoiceDetail.price == null) {
            invoiceDetail.price = 0;
        }
        if(invoiceDetail.quantity == null) {
            invoiceDetail.quantity = 1;
        }

        let index: number = invoices.findIndex(i => i.id == id);

        invoices[index].details.push(invoiceDetail);
        totalCalculator(invoices);
        
        return invoiceDetail;
    }

    update(id: string, body: InvoiceDto): InvoiceDto {
        let index: number = invoices.findIndex(i => i.id == id);

        if(body.details == null) {
            body.details = [];
        }else{
            body.details.forEach(d => {
                if(d.idDetail == null) {
                    d.idDetail = randomUUID();
                }
                if(d.product == null) {
                    d.product = 'undefined';
                }
                if(d.price == null) {
                    d.price = 0;
                }
                if(d.quantity == null) {
                    d.quantity = 1;
                }
            })
        }
        invoices[index].details = body.details;
        invoices[index].total = body.total;

        totalCalculator(invoices);
        
        return invoices[index];
    }

    updateDetail(id: string, idDetail: string, body: InvoiceDetailDto): InvoiceDetailDto {
        let index: number = invoices.findIndex(i => i.id == id);
        let indexDetail: number = invoices[index].details.findIndex(d => d.idDetail == idDetail)

        if(body.product == null) {
            body.product = 'undefined';
        }
        if(body.price == null) {
            body.price = 0;
        }
        if(body.quantity == null) {
            body.quantity = 1;
        }

        invoices[index].details[indexDetail].product = body.product;
        invoices[index].details[indexDetail].price = body.price;
        invoices[index].details[indexDetail].quantity = body.quantity;

        totalCalculator(invoices);
        
        return invoices[index].details[indexDetail];
    }

    // patch(id: string, body: CustomerDto): CustomerDto {
    //     let index: number = this.customers.findIndex(c => c.id == id);
        
    //     if(body.name != null) {
    //         this.customers[index].name = body.name;
    //     }
    //     if(body.adress != null) {
    //         this.customers[index].adress = body.adress;
    //     }

    //     return this.customers[index];
    // }
    
    // delete(id: string): boolean {
    //     let index: number = this.customers.findIndex(c => c.id == id);
        
    //     if(index != -1) {
    //         this.customers.splice(index, 1);
    //         return true;
    //     }
    //     return false;
    // }
}
