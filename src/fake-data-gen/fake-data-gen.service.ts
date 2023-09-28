import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

@Injectable()
export class FakeDataGenService {
  generateRandomProducts() {
    const products = [];

    for (let i = 0; i < 50; i++) {
      const product = {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        manufacturer: faker.company.name(),
        description: faker.commerce.productDescription(),
      };

      products.push(product);
    }

    return products;
  }
}

// {
//   userId: random UI rol
//
//
//
//   products: [
//
//   ]
//
//
// }
