const axios = require("axios");
const Table = require("cli-table");
const dateFormat = require("dateformat");
const chalk = require("chalk");
const { black, gray } = require("colors");

class TableService {
  constructor(data) {
    let tableStyle = {
      top: "═",
      "top-mid": "╤",
      "top-left": "╔",
      "top-right": "╗",
      bottom: "═",
      "bottom-mid": "╧",
      "bottom-left": "╚",
      "bottom-right": "╝",
      left: "║",
      "left-mid": "╟",
      mid: "─",
      "mid-mid": "┼",
      right: "║",
      "right-mid": "╢",
      middle: "│",
    };
    this.timeSeriesTable = new Table({
      head: [
        "Date".yellow,
        "Open".yellow,
        "High".yellow,
        "Low".yellow,
        "Close".yellow,
        "Volume".yellow,
      ],
      chars: tableStyle,
    });

    this.overviewTable = new Table({
      head: [
        "Ticker".yellow,
        "Name".yellow,
        "Market Cap".yellow,
        "PE Ratio".yellow,
        "Beta".yellow,
        "52 Week High".yellow,
        "52 Week Low".yellow,
      ],
      chars: tableStyle,
    });

    this.stockData = data;
  }

  buildTable() {
    const { overview, timeSeries } = this.stockData;

    try {
      for (date in timeSeries) {
        const color = this.getColor(timeSeries[date]["1. open"], timeSeries[date]["4. close"])
        this.timeSeriesTable.push([
          dateFormat(date, "shortDate")[color],
          timeSeries[date]["1. open"][color],
          timeSeries[date]["2. high"][color],
          timeSeries[date]["3. low"][color],
          timeSeries[date]["4. close"][color],
          this.parse(timeSeries[date]["5. volume"])[color],
        ]);
      }
      this.overviewTable.push([
        overview.Symbol.blue,
        overview.Name.blue,
        this.parse(overview.MarketCapitalization).blue,
        overview.PERatio.blue,
        overview.Beta.blue,
        overview["52WeekHigh"].blue,
        overview["52WeekLow"].blue,
      ]);

      return [this.overviewTable.toString(), this.timeSeriesTable.toString()];
    } catch (err) {
      console.log(err);
    }
  }

  parse(str) {
    return parseFloat(str).toLocaleString("en");
  }

  getColor(open, close) {
    const diff = close - open;
    if (diff < 0) {
      return 'red';
    } else if (diff > 0) {
      return 'green';
    } else return 'black';
  }
}
module.exports = TableService;
