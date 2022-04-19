import React from 'react';
import { Header } from './components/Header';
import { CurrencyBlock } from './components/CurrencyBlock'
import './App.css';

export class App extends React.Component {
  state = {
    EUR: 0,
    USD: 0,
    UAH: 1,
    sale: 0,
    buy: 0,
    titles: ['EUR', 'USD', 'UAH'],
    selectedCur1: 'USD',
    selectedCur2: 'UAH'
  }

  getCurrencyRate = (array, currencyName) => (
    array.find(currency => currency.cc === currencyName).rate
  )

  // returns an object with already changed fields after conversion
  converting = (type, value, cur1, cur2) => {
    if (type === 'sale') {
      return {
        sale: value,
        buy: (value * (this.state[cur1] / this.state[cur2])).toFixed(2)
      }
    } else {
      return {
        buy: value,
        sale: (value * (this.state[cur1] / this.state[cur2])).toFixed(2)
      }
    }
  }

  changeValue = (event) => {
    const { name, value } = event.target;
    
    let valueCopy = value.toLowerCase().replace(/\,/g, '.');

    if (valueCopy.match(/[a-z]/) || valueCopy.includes(' ')) {
      return;
    }

    if (!value.length) {
      valueCopy = 0;
    }

    if (value.length > 1 && value[0] === '0' && value[value.length - 1] !== '.') {
      valueCopy = value.slice(1);

      if (!valueCopy.length) {
        valueCopy = 0;
      }
    }

    let dotCounter = 0;

    `${valueCopy}`.split('').forEach(symbol => {
      if (symbol === '.') {
        ++dotCounter;
      }
    });
    
    if (dotCounter > 1) {
      return;
    }

    const { selectedCur1, selectedCur2 } = this.state;

    this.setState(() => {
      if (name === 'sale') {
        return this.converting('sale', valueCopy, selectedCur1, selectedCur2)
      } else {
        return this.converting('buy', valueCopy, selectedCur2, selectedCur1)
      }
    })
  }

  changeCurrency = (event, index) => {
    const { sale, buy } = this.state;
    const { value } = event.target;

    this.setState(() => {
      if (index === 1) {
        return {
          [`selectedCur${index}`]: value,
          ...this.converting('sale', sale, value, this.state.selectedCur2)
        } 
      } else {
        return {
          [`selectedCur${index}`]: value,
          ...this.converting('buy', buy, value, this.state.selectedCur1)
        }
      }
    });
  }

  async componentDidMount() {
    await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20191021&json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          EUR: this.getCurrencyRate(data, 'EUR'),
          USD: this.getCurrencyRate(data, 'USD')
        });
      })
  }

  render() {
    return (
      <div className="App">
        <Header
          USD={this.state.USD}
          EUR={this.state.EUR}
        />
        <main>
          <div className='container'>
            <div className='converter'>
              <CurrencyBlock
                index={1}
                titles={this.state.titles}
                selectedCur={this.state.selectedCur1}
                changeValue={this.changeValue}
                changeCurrency={this.changeCurrency}
                assignment='sale'
                value={this.state.sale}
              />
              <CurrencyBlock
                index={2}
                titles={this.state.titles}
                selectedCur={this.state.selectedCur2}
                changeValue={this.changeValue}
                changeCurrency={this.changeCurrency}
                assignment='buy'
                value={this.state.buy}
              />
            </div>
          </div>
        </main>
      </div>
    )
  }
}
