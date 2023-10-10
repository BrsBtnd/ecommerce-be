import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';

const product1Id = new mongoose.Types.ObjectId();
const product2Id = new mongoose.Types.ObjectId();

const mockProduct = {
  _id: product1Id,
  name: 'Awesome Cotton Pizza',
  price: 867,
  manufacturer: 'Grady - Cassin',
  description: 'The Football Is Good For Training And Recreational Purposes',
  __v: 0,
  type: 'tablet',
};

describe('ProductsService', () => {
  let productModel: Model<Product>;
  let productsService: ProductsService;

  const productsArray = [
    {
      _id: product1Id,
      name: 'Awesome Cotton Pizza',
      price: 867,
      manufacturer: 'Grady - Cassin',
      description:
        'The Football Is Good For Training And Recreational Purposes',
      __v: 0,
      type: 'tablet',
    },
    {
      _id: product2Id,
      name: 'Gorgeous Steel Pants',
      price: 757,
      manufacturer: 'Stanton, Cummerata and Walsh',
      description:
        'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
      __v: 0,
      type: 'tablet',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockProduct),
            constructor: jest.fn().mockResolvedValue(mockProduct),
            find: jest.fn(),
            findOne: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    productsService = module.get(ProductsService);
    productModel = module.get<Model<Product>>(getModelToken(Product.name));
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
  });

  // Should return all products when findAll() is called
  it('should return all products when findAll() is called', async () => {
    jest.spyOn(productModel, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(productsArray),
    } as any);

    const products = await productsService.findAll();

    expect(products).toEqual(productsArray);
  });

  // Should return a single product when findOne() is called with a valid product ID
  it('should return a single product when findOne() is called with a valid product ID', async () => {
    jest.spyOn(productModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(productsArray[0]),
    } as any);

    const product = await productsService.findOne(productsArray[0]._id);

    expect(product).toEqual(productsArray[0]);
  });

  // Should return an empty array when findAll() is called and there are no products in the database
  it('should return an empty array when findAll() is called and there are no products in the database', async () => {
    jest.spyOn(productModel, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([]),
    } as any);

    const products = await productsService.findAll();

    expect(products).toEqual([]);
    expect(products.length).toEqual(0);
  });

  // Should return null when findOne() is called with an invalid product ID
  it('should return null when findOne() is called with an invalid product ID', async () => {
    jest.spyOn(productModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);

    const product = await productsService.findOne(
      new mongoose.Types.ObjectId(),
    );

    expect(product).toBeNull();
  });

  // Should return null when findOne() is called with no product ID
  it('should return null when findOne() is called with no product ID', async () => {
    const result = await productsService.findOne(null);

    expect(result).toBeNull();
  });
});
