import React, { Component } from 'react';
import { List, ListItem } from "material-ui/List";
import TextField from 'material-ui/TextField';
import { cryptocurrency } from '../services/criptocurrency';
// import styles from './CryptocurrencyInfo.module.css';

class CryptocurrencyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cachedCryptoInfo: [],
            filteredCryptoInfo: [],
            searchQuery: ''
        }
    }

    onChangeSearchTxt = e => {
        const userInput = e.target.value
        this.setState((prevState) => {
            return {
                searchQuery: userInput
            }
        })
        this.filterBySearchQuery()
    }

    filterBySearchQuery = () => {
        this.setState((prevState) => {
            const { cachedCryptoInfo } = prevState
            var { searchQuery } = prevState
            searchQuery = searchQuery.toLowerCase()
            return {
                filteredCryptoInfo: cachedCryptoInfo.map((currency) => {
                    if (currency.props.primaryText.toLowerCase().includes(searchQuery) ||
                        currency.props.secondaryText.toLowerCase().includes(searchQuery))
                        return currency
                })
            }
        })
    }

    componentDidMount = () => {
        cryptocurrency.All.info().then((response) => {
            this.setState({
                cachedCryptoInfo: response.data().map((currency, i) => {
                    return <ListItem
                        primaryText={`${currency.name} - ${currency.symbol}`}
                        secondaryText={`USD:${currency.price_usd}`}
                        key={i}
                    />
                })
            })
        })
    }

    render() {
        const { cachedCryptoInfo, filteredCryptoInfo } = this.state
        return (
            <div>
                <TextField
                    hintText="Quick Search"
                    onChange={e => this.onChangeSearchTxt(e)}
                />
                < List >
                    {filteredCryptoInfo.length > 0 ? filteredCryptoInfo : cachedCryptoInfo}
                </List >
            </div >
        )
    }
}


export default CryptocurrencyInfo

