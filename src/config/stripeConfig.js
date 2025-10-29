import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
    'pk_test_51RnnaaQ0J0a5LdH6ufhW8YPHwYVxmExNi3HScLJgDtnMfogTATcUyGk3QmGzquflV1zfh0sPtfh8c4afoi3GDHqB00gcRs0iOA'
);

export default stripePromise; 