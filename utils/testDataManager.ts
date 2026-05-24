import loginUsers from '../test-data/loginUsers.json';
import { LoginUser, Product} from './types';
import products from '../test-data/products.json';


export const getLoginUser = (

    userType: 'validUser' | 'invalidUser'

): LoginUser => {
    const users = loginUsers as Record<'validUser' | 'invalidUser', LoginUser>;

    return users[userType];
};

export const getProduct = (

    productType: 'backpack' | 'bikeLight'

): Product => {

    const productData = products as Record<
        'backpack' | 'bikeLight',
        Product
    >;

    return productData[productType];
};