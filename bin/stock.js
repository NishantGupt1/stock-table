#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package.json');
const check = require('../commands/check');

program.version(pkg.version)

program
  .command('key', 'Manage API Key -- https://www.alphavantage.co')
  .command('check', 'Check Stock Price Info')

program
  .command('table <ticker> [timeframe] [save]')
  .alias('p')
  .description('Get the stock price')
  .action((ticker, timeframe, save) => {
    check.price(ticker, timeframe, save)});


program.parse(process.argv);
