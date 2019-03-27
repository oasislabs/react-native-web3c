import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Web3c = require('react-native-web3c');
// Replace with your own private key.
const privateKey = '0x61dd03d401599d430b58460366bc6973c96b147c106c2fe61e7369fef2cc7f47';

export class CounterApp extends React.Component {

  constructor() {
    super();

    this.state = {
      myState: 'Deploying a confidential counter contract...',
    };
    this.counter = undefined;

    let web3c = new Web3c('https://web3.oasiscloud.io:443', undefined, {
	  storage: new Storage()
	});

	let acct = web3c.eth.accounts.privateKeyToAccount(privateKey);

	web3c.eth.defaultAccount = acct.address;
	web3c.eth.accounts.wallet.add(acct);
	web3c.oasis.defaultAccount = acct.address;
	web3c.oasis.accounts.wallet.add(acct);

	this.web3c = web3c;
  }

  async sendTransactions() {
    try {
      await this.deployCounterContract();
      await this.getCount();
      await this.incrementCount();
      await this.getCount();
    } catch(err) {
	  console.log(err);
    }
  }

  async deployCounterContract() {
	let estimatedGas = await new this.web3c.oasis.Contract(abi, undefined, {
      from: '0xd52e61555bbca9b6d389025983282cf024fbbd82'
    }).deploy({
      data: bytecode,
      header: {
        confidential:true
      }
    }).estimateGas();

	this.setState({ myState: `estimatedGas = ${estimatedGas}`});

    let counter = await new this.web3c.oasis.Contract(abi, undefined, {
      from: '0xd52e61555bbca9b6d389025983282cf024fbbd82',
	  gas: estimatedGas
    }).deploy({
      data: bytecode,
      header: {
        confidential:true
      }
    }).send();

    this.setState({ myState: `Contract address = ${counter.options.address}` });
    this.counter = counter;
  }

  async getCount() {
	console.log("Getting count");
    let count = await this.counter.methods.getCounter().call();
	console.log("Got count = ", count);
    this.setState({ myState: `Contract count = ${count}` });
  }

  async incrementCount() {
    let receipt = await this.counter.methods.incrementCounter().send();
    receipt = JSON.stringify(receipt);
    this.setState({ myState: `Tx receipt = ${receipt}` });
  }

  render() {
    const myState = JSON.stringify(this.state.myState);
    return (
        <View style={styles.container}>
        <Text>{myState}</Text>
        </View>
    );
  }

}

class Storage {

  constructor() {
    this.db = new Map();
  }

  getItem(key) {
    return this.db.get(key);
  }

  setItem(key, val) {
    this.db.set(key, val);
  }

}

export default class App extends CounterApp {
  componentWillMount() {
    this.sendTransactions();
  }
}

let abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "newCounter",
        "type": "uint256"
      }
    ],
    "name": "Incremented",
    "type": "event",
    "signature": "0x20d8a6f5a693f9d1d627a598e8820f7a55ee74c183aa8f1a30e8d4e8dd9a8d84"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getCounter",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8ada066e"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "incrementCounter",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x5b34b966"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "count",
        "type": "uint256"
      }
    ],
    "name": "incrementCounterManyTimes",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x7531dafc"
  }
];

let bytecode = '0x00736973000100157b22636f6e666964656e7469616c223a747275657d608060405234801561001057600080fd5b506101b3806100206000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635b34b9661461005c5780637531dafc146100735780638ada066e146100a0575b600080fd5b34801561006857600080fd5b506100716100cb565b005b34801561007f57600080fd5b5061009e60048036038101908080359060200190929190505050610116565b005b3480156100ac57600080fd5b506100b561017e565b6040518082815260200191505060405180910390f35b600160008082825401925050819055507f20d8a6f5a693f9d1d627a598e8820f7a55ee74c183aa8f1a30e8d4e8dd9a8d846000546040518082815260200191505060405180910390a1565b60008090505b8181101561017a57600160008082825401925050819055507f20d8a6f5a693f9d1d627a598e8820f7a55ee74c183aa8f1a30e8d4e8dd9a8d846000546040518082815260200191505060405180910390a1808060010191505061011c565b5050565b600080549050905600a165627a7a723058203413fe10ad094f37c1dd02eb9cf73ae136742ccaa094ff18683383af8da23c010029';

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
});
