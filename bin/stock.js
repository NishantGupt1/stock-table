#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package.json');
const check = require('../commands/check');

program.version(pkg.version)

program
  .command('key', 'Configure API key from https://www.alphavantage.co')

program
  .command('table <ticker> [timeframe] [save]')
  .alias('t')
  .description('Get the stock price')
  .action((ticker, timeframe, save) => {
    check.price(ticker, timeframe, save)});


program.parse(process.argv);
