import forge from 'mappersmith';
import { install, mockClient } from 'mappersmith/test'

const cryptocurrency = forge({
    clientId: 'cryptocurrency',
    host: 'https://api.coinmarketcap.com',
    resources: {
        All: {
            info: { path: '/v1/ticker/' }
        }
    }
})

// jest.mock complains about not finding this module,
// so I mocked it on the same file
if (process.env.NODE_ENV === 'test') {
    install()
    mockClient(cryptocurrency)
        .resource('All')
        .method('info')
        .response([
            {
                "id": "bitcoin",
                "name": "Bitcoin",
                "symbol": "BTC",
                "rank": "1",
                "price_usd": "10782.7"
            },
            {
                "id": "ethereum",
                "name": "Ethereum",
                "symbol": "ETH",
                "rank": "2",
                "price_usd": "881.15"
            }])
}

export default cryptocurrency