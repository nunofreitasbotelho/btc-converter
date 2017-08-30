const nock = require('nock');
const chalk = require('chalk');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const expect = chai.expect;
chai.use(sinonChai);

const convertBTC = require('../src/ConvertBTC.js');

describe('ConvertBTC', () => {
  let consoleStub;

  const responseMock = {
    "price": 4612.2,
    "time": "2017-08-30 04:44:02",
    "success": true
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
  });

  it('should use USD as default currency and 1 as default amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
    .get('/convert/global')
    .query({ from: 'BTC', to: 'USD', amount: '1' })
    .reply(200, responseMock);

    convertBTC();

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.blue(1)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(4612.2)}`);
      done();
    }, 300);
  });

  it('should use USD as currency and 10 as amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
    .get('/convert/global')
    .query({ from: 'BTC', to: 'USD', amount: '10' })
    .reply(200, responseMock);

    convertBTC('USD', 10);

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.blue(10)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(4612.2)}`);
      done();
    }, 300);
  });

  it('should use EUR as currency and 1 as amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
    .get('/convert/global')
    .query({ from: 'BTC', to: 'EUR', amount: '1' })
    .reply(200, responseMock);

    convertBTC('EUR');

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.blue(1)} BTC to ${chalk.cyan('EUR')} = ${chalk.yellow(4612.2)}`);
      done();
    }, 300);
  });

  it('should use EUR as currency and 1 as amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
    .get('/convert/global')
    .query({ from: 'BTC', to: 'EUR', amount: '1' })
    .replyWithError('Erro');

    convertBTC('EUR');

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(chalk.red('Something went wrong'));
      done();
    }, 300);
  });
});
