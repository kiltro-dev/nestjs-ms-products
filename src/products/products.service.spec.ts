import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates and lists products', () => {
    // arrange
    const created = service.create({ name: 'Keyboard', price: 49.99 });
    // act
    const all = service.findAll();
    // assert
    expect(all).toHaveLength(1);
    expect(all[0]?.id).toBe(created.id);
  });

  it('removes a product so findAll no longer contains it', () => {
    // arrange
    const created = service.create({ name: 'Mouse', price: 25 });
    // act
    const removed = service.remove(created.id);
    // assert
    expect(removed.id).toBe(created.id);
    expect(service.findAll()).toHaveLength(0);
  });

  it('throws NotFoundException for unknown id', () => {
    expect(() =>
      service.findOne('00000000-0000-4000-8000-000000000000'),
    ).toThrow(NotFoundException);
  });

  it('throws NotFoundException when removing unknown id', () => {
    expect(() =>
      service.remove('00000000-0000-4000-8000-000000000000'),
    ).toThrow(NotFoundException);
  });
});
