import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { Model } from 'mongoose';
import { Cart } from './schemas/cart.schema';
import mongoose from 'mongoose';
import { ProductsService } from '../products/products.service';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from '../products/schemas/product.schema';
import { mockProduct } from '../products/products.service.spec';
import { CreateCartDto } from './dtos/create-cart.dto';

const cart1Id = new mongoose.Types.ObjectId();
const cart2Id = new mongoose.Types.ObjectId();

const mockCart = {
  id: cart1Id,
  userId: 'random123',
  products: [
    {
      name: 'Awesome Cotton Pizza',
      price: 867,
      manufacturer: 'Grady - Cassin',
      description:
        'The Football Is Good For Training And Recreational Purposes',
      type: 'tablet',
    },
    {
      name: 'Gorgeous Steel Pants',
      price: 757,
      manufacturer: 'Stanton, Cummerata and Walsh',
      description:
        'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
      type: 'tablet',
    },
    {
      name: 'Awesome Frozen Keyboard',
      price: 310,
      manufacturer: 'Lueilwitz Group',
      description:
        'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
      type: 'laptop',
    },
    {
      name: 'Generic Fresh Soap',
      price: 7,
      manufacturer: 'Keebler, Larson and Roob',
      description:
        'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
      type: 'phone',
    },
  ],
};

describe('MyCartService', () => {
  let cartModel: Model<Cart>;
  let cartService: CartService;
  let productService: ProductsService;
  // let productModel: Model<Product>;

  const mockCartsArray = [
    { ...mockCart },
    {
      id: cart2Id,
      userId: 'random',
      products: [
        {
          name: 'Awesome Cotton Pizza',
          price: 867,
          manufacturer: 'Grady - Cassin',
          description:
            'The Football Is Good For Training And Recreational Purposes',
          type: 'tablet',
        },
        {
          name: 'Gorgeous Steel Pants',
          price: 757,
          manufacturer: 'Stanton, Cummerata and Walsh',
          description:
            'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
          type: 'tablet',
        },
        {
          name: 'Awesome Frozen Keyboard',
          price: 310,
          manufacturer: 'Lueilwitz Group',
          description:
            'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
          type: 'laptop',
        },
        {
          name: 'Unbranded Granite Bike',
          price: 170,
          manufacturer: 'Kerluke Inc',
          description:
            'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
          type: 'laptop',
        },
      ],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        ProductsService,
        {
          provide: getModelToken(Cart.name),
          useValue: {
            new: jest.fn().mockReturnValue(mockCart),
            constructor: jest.fn().mockResolvedValue(mockCart),
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
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

    cartService = module.get<CartService>(CartService);
    productService = module.get<ProductsService>(ProductsService);
    cartModel = module.get<Model<Cart>>(getModelToken(Cart.name));
    // productModel = module.get<Model<Product>>(getModelToken(Product.name));
  });

  it('should be defined', () => {
    expect(cartService).toBeDefined();
    expect(productService).toBeDefined();
  });

  it('should return an array of carts when findAll is called', async () => {
    jest.spyOn(cartModel, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockCartsArray),
    } as any);

    const carts = await cartService.findAll();

    expect(carts).toEqual(mockCartsArray);
    expect(cartModel.find).toHaveBeenCalledTimes(1);
    expect(cartModel.find).toHaveBeenCalledWith();
  });

  // findOne returns a cart
  it('should return a cart when findOne is called with a valid cartId', async () => {
    jest.spyOn(cartModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockCart),
    } as any);

    const cart = await cartService.findOne(cart1Id.toString());

    expect(cart).toEqual(mockCart);
    expect(cartModel.findOne).toHaveBeenCalledTimes(1);
    expect(cartModel.findOne).toHaveBeenCalledWith({ _id: cart1Id.toString() });
  });

  // findByUser returns a cart
  it('should return a cart when findByUser is called with a valid userId', async () => {
    jest.spyOn(cartModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockCart),
    } as any);

    const cart = await cartService.findByUser('random123');

    expect(cart).toEqual(mockCart);
    expect(cartModel.findOne).toHaveBeenCalledTimes(1);
    expect(cartModel.findOne).toHaveBeenCalledWith({ userId: 'random123' });
  });

  // create returns a cart
  it('should return a cart when create is called with a valid CreateCartDto', async () => {
    const mockCreateCartDto: CreateCartDto = { userId: 'random2' };
    const mockCreateCart = { userId: 'random2', products: [] };

    jest.spyOn(cartService, 'findByUser').mockResolvedValueOnce(null);
    jest.spyOn(cartModel, 'create').mockReturnValue(mockCreateCart as any);

    const cart = await cartService.create(mockCreateCartDto);

    expect(cart).toEqual(mockCreateCart);
    expect(cartService.findByUser).toHaveBeenCalledTimes(1);
    expect(cartService.findByUser).toHaveBeenCalledWith(
      mockCreateCartDto.userId,
    );
    expect(cartModel.create).toHaveBeenCalledTimes(1);
    expect(cartModel.create).toHaveBeenCalledWith({
      userId: mockCreateCartDto.userId,
      products: [],
    });
  });

  // findAll returns an empty array when there are no carts
  it('should return an empty array when findAll is called and there are no carts', async () => {
    jest.spyOn(cartModel, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([]),
    } as any);

    const carts = await cartService.findAll();

    expect(carts).toEqual([]);
    expect(cartModel.find).toHaveBeenCalledTimes(1);
    expect(cartModel.find).toHaveBeenCalledWith();
  });

  // findOne returns null when cartId is falsy
  it('should return null when findOne is called with a falsy cartId', async () => {
    const cart = await cartService.findOne('');

    expect(cart).toBeNull();
    expect(cartModel.findOne).not.toHaveBeenCalled();
  });

  // findByUser returns null when userId is falsy
  it('should return null when findByUser is called with a falsy userId', async () => {
    const cart = await cartService.findByUser('');

    expect(cart).toBeNull();
    expect(cartModel.findOne).not.toHaveBeenCalled();
  });

  // create returns null when user already has a cart
  it('should return null when create is called and the user already has a cart', async () => {
    const mockCreateCartDto: CreateCartDto = { userId: 'random123' };
    jest.spyOn(cartService, 'findByUser').mockResolvedValueOnce(mockCart);
    jest.spyOn(cartModel, 'create').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);

    const cart = await cartService.create(mockCreateCartDto);

    expect(cart).toBeNull();
    expect(cartService.findByUser).toHaveBeenCalledTimes(1);
    expect(cartService.findByUser).toHaveBeenCalledWith(
      mockCreateCartDto.userId,
    );
    expect(cartModel.create).not.toHaveBeenCalled();
  });
});
