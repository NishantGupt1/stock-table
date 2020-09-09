<p align="center">
  <img src="https://image.flaticon.com/icons/svg/791/791788.svg" height="64">
  <h3 align="center">stock-table</h3>
  <p align="center">Display stock data as a table directly in your terminal!<p>
  <p align="center">
</p>
</p>
<p align="center"><img src="https://i.imgur.com/WLDT7ir.png" alt="PNG"></p>

## Features

* Use any stock ticker 
* Display monthly, weekly, or daily stock data
* Supports multiple APIs
* Save full JSON response to home directory

## Install

```
npm install stock-table
```

## Usage

```bash
Usage: stock [options] [command]

Options:
  -V, --version                        output the version number
  -h, --help                           display help for command

Commands:
  key                                  Configure API key from https://www.alphavantage.co
  table|t <ticker> [timeframe] [save]  Get the stock price
  help [command]                       display help for command
```

## Get Started
You must provide your free API key from the alpha vantage API and set it using 
```bash
stock key set 
```

Additional key options:
```
$ stock key -h
Usage: stock-key [options] [command]

Options:
  -h, --help      display help for command

Commands:
  set             Set API key - get one at https://www.alphavantage.co
  show            Show API key
  remove          Remove API key
  help [command]  display help for command
```

## Example
```bash
stock table AAPL monthly
```

You may substitute the timeframe with either `monthly`, `weekly` or `daily`

To save full JSON response to your home directory append `save` to the command

```bash
stock table AAPL daily save
```

## Supported APIs

Currently, `stock-table` supports the following APIs:

- [TIME_SERIES_MONTHLY](https://www.alphavantage.co/documentation/#monthly)
- [TIME_SERIES_WEEKLY](https://www.alphavantage.co/documentation/#weekly)
- [TIME_SERIES_DAILY](https://www.alphavantage.co/documentation/#daily)


## License

[MIT](https://opensource.org/licenses/MIT)