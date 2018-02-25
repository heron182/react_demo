import forge from 'mappersmith';

export const cryptocurrency = forge({
    clientId: 'cryptocurrency',
    host: 'https://api.coinmarketcap.com',
    resources: {
        All: {
            info: { path: '/v1/ticker/' }
        }
    }
})