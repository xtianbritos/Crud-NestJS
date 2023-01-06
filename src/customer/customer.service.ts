import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CustomerDto } from './customer.dto';

@Injectable()
export class CustomerService {

    private customers: CustomerDto[] = [
        {
          id: '0',
          name: 'Christian',
          adress: 'Su dirección',
        },
        {
          id: '1',
          name: 'Laura',
          adress: 'Su dirección',
        },
        {
          id: '2',
          name: 'Sylvia',
          adress: 'Su dirección',
        }
      ];
    

    getAll(): CustomerDto[] {
        return this.customers;
    }

    getById(id: string): CustomerDto {
        let index: number = this.customers.findIndex(c => c.id == id);
        return this.customers[index];
    }

    insert(customer: CustomerDto): CustomerDto {
        if(customer.id == null) {
            customer.id = randomUUID();
        }
        this.customers.push(customer);
        return customer;
    }
    
    update(id: string, body: CustomerDto): CustomerDto {

        let index: number = this.customers.findIndex(c => c.id == id);
        this.customers[index].name = body.name;
        this.customers[index].adress = body.adress;
        
        return this.customers[index];
    }

    patch(id: string, body: CustomerDto): CustomerDto {
        let index: number = this.customers.findIndex(c => c.id == id);
        
        if(body.name != null) {
            this.customers[index].name = body.name;
        }
        if(body.adress != null) {
            this.customers[index].adress = body.adress;
        }

        return this.customers[index];
    }
    
    delete(id: string): boolean {
        let index: number = this.customers.findIndex(c => c.id == id);
        
        if(index != -1) {
            this.customers.splice(index, 1);
            return true;
        }
        return false;
    }
}
