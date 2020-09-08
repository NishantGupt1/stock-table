const fs = require("fs");
const os = require("os");
const path = require("path");

class SaveService {
  constructor(stockData, ticker, timeframe) {
    this.stockData = stockData;
    this.ticker = ticker;
    this.timeframe = timeframe;
    this.savePath = this.buildSavePath(ticker, timeframe);
  }

  saveStockData() {
    try {
      if (fs.existsSync(this.savePath)) {
        console.log('This JSON response have already been saved to the home directory.'.red);
      } else {
        fs.writeFileSync(this.savePath, JSON.stringify(this.stockData));
        console.log('Complete JSON response saved to home directory.'.blue)
      }
    } catch {
      throw new Error("Complete JSON response failed to save.");
    }
  }

  buildSavePath(ticker, timeframe) {
    if (timeframe) {
      return path.resolve(os.homedir(), `${ticker}_${timeframe}.json`);
    } else {
      return path.resolve(os.homedir(), `${ticker}.json`);
    }
  }
}

module.exports = SaveService;
