import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { List, ListItem } from "material-ui/List";
import TextField from 'material-ui/TextField';
import CryptocurrencyInfo from '../CryptocurrencyInfo';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const wrapper = shallow(<CryptocurrencyInfo />)
});

it('should save user input on component state', () => {
    const mockInput = {
        target: { value: 'Bit' }
    }
    const wrapper = shallow(<CryptocurrencyInfo />)
    const searchTxt = wrapper.find(TextField)
    searchTxt.simulate('change', mockInput)
    expect(wrapper.state('searchQuery')).toBe('Bit')
});

it('should render bitcoin info after componentDidMount', (done) => {
    expect.assertions(1)
    const wrapper = shallow(<CryptocurrencyInfo />)
    // we are testing a state change based on a promisse fullfilment, 
    // hence the done() and setImmediate methods
    // https://stackoverflow.com/questions/38308214/react-enzyme-test-componentdidmount-async-call/40875174#40875174
    setImmediate(() => {
        expect(wrapper.update().find(ListItem)).toHaveLength(2)
        done();
    });
});

it('should filter bitcoin info based on user input', () => {
    const mockInput = {
        target: { value: 'Bit' }
    }
    const wrapper = shallow(<CryptocurrencyInfo />)
    const searchTxt = wrapper.find(TextField)
    wrapper.setState({
        cachedCryptoInfo: [<ListItem
            primaryText={`Bitcoin - BTC`}
            secondaryText={`10782.7`}
            key={1}
        />, <ListItem
            primaryText={`Ethereum - ETH`}
            secondaryText={`USD:881.15`}
            key={2}
        />]
    })
    searchTxt.simulate('change', mockInput)
    expect(wrapper.find(ListItem)).toHaveLength(1)
});

it('should render bitcoin info after componentDidMount', (done) => {
    expect.assertions(1)
    const wrapper = shallow(<CryptocurrencyInfo />)
    // we are testing a state change based on a promisse fullfilment, 
    // hence the done() and setImmediate methods
    setImmediate(() => {
        expect(wrapper.update().find(ListItem)).toHaveLength(2)
        done();
    });
});