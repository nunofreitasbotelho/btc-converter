#!/usr/bin/env node

/**
 * Module dependencies.
 */

const program = require('commander');
const pkg = require('../package.json');
const convertBTC = require('./ConvertBTC.js');

program
  .version(pkg.version)
  .description('Convert bitcoin to any currency defined')
  .option('-C --currency <currency>', 'Currency to be converted. (Default is USD)')
  .option('-A --amount <amount>', 'Amount to be converted. (Default is 1)')
  .parse(process.argv);

convertBTC(program.currency, program.amount);
