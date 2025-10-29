export const formatPrice = (value) => {
    return new Intl.NumberFormat('pt-Br', {
        style: 'currency',
        currency: 'BRL',
    }).format(value / 100);
};