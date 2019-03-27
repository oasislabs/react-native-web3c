import 'react-native';
import React from 'react';
import { CounterApp } from '../App';
import renderer from 'react-test-renderer';

const assert = require('assert');

it('deploys a confidential counter and increments its count to 1', async (done) => {
  jest.setTimeout(120000);

  let app = renderer.create(<CounterApp />);

  let instance = app.getInstance();

  await instance.sendTransactions();

  // Check the label to see if we have successfully deployed and incremented the
  // confidentialc ounter.
  const tree = app.toJSON();
  let label = tree.children[0].children[0];

  assert.equal(label, '\"Contract count = 1\"');

  // Stop the HDWalletProvider from polling eth_getBlock so that we can end the test
  // and shut down.
  instance.provider.engine.stop();
  done();
});

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
