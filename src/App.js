import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CryptocurrencyInfo from './components/CryptocurrencyInfo';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <CryptocurrencyInfo />
      </MuiThemeProvider>
    );
  }
}

export default App;
