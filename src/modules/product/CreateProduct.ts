import { Product } from '../../entity/Product';
import { createResolver } from '../shared/CreateResolver';
import { CreateProductInput } from './createProduct/CreateProductInput';

export const CreateProductResolver = createResolver(
  'Product',
  Product,
  CreateProductInput,
  Product
);
