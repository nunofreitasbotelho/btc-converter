#!/usr/bin/env node
'use strict';

/**
 * Module dependencies.
 */

var program = require('commander');
var pkg = require('../package.json');
var convertBTC = require('./ConvertBTC.js');

program.version(pkg.version).description('Convert bitcoin to any currency defined').option('-C --currency <currency>', 'Currency to be converted. (Default is USD)').option('-A --amount <amount>', 'Amount to be converted. (Default is 1)').parse(process.argv);

convertBTC(program.currency, program.amount);