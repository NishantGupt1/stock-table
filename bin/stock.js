#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package.json');
const check = require('../commands/check');

program.version(pkg.version)

program
  .command('key', 'Manage API Key -- https://www.alphavantage.co')
  .command('check', 'Check Stock Price Info')

program
  .command('table <ticker> [timeframe]')
  .alias('p')
  .description('Get the stock price')
  .action((ticker, timeframe) => {
    check.price(ticker, timeframe)});


program.parse(process.argv);
