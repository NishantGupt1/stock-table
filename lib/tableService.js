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
    this.monthlyTable = new Table({
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
    const { overview, monthly } = this.stockData;

    try {
      for (month in monthly) {
        const color = this.getColor(monthly[month]["1. open"], monthly[month]["4. close"])
        this.monthlyTable.push([
          dateFormat(month, "shortDate")[color],
          monthly[month]["1. open"][color],
          monthly[month]["2. high"][color],
          monthly[month]["3. low"][color],
          monthly[month]["4. close"][color],
          this.parse(monthly[month]["5. volume"])[color],
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

      return [this.overviewTable.toString(), this.monthlyTable.toString()];
    } catch (err) {
      console.log(err);
    }
  }

  parse(str) {
    return parseFloat(str).toLocaleString("en");
  }

  getColor(open, close) {
    let color = '';
    const diff = close - open;
    if (diff < 0) {
      return 'red';
    } else if (diff > 0) {
      return 'green';
    } else return 'black';
  }
}
module.exports = TableService;
