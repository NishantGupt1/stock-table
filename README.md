<p align="center">
  <img src="https://image.flaticon.com/icons/svg/791/791788.svg" height="64">
  <h3 align="center">stock-table</h3>
  <p align="center">Display stock data as a table directly in your terminal!<p>
  <p align="center">
</p>
</p>

## Features

* Use any stock ticker 
* Display monthly, weekly, or daily stock data
* Supports multiple APIs
* Autosave full JSON response

## Install

```
npm install --global stock-table

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

## Supported APIs

Currently, `stock-table` supports the following APIs:

- [TIME_SERIES_MONTHLY](https://www.alphavantage.co/documentation/#monthly)
- [TIME_SERIES_WEEKLY](https://www.alphavantage.co/documentation/#weekly)
- [TIME_SERIES_DAILY](https://www.alphavantage.co/documentation/#daily)


## License

[MIT](https://opensource.org/licenses/MIT)