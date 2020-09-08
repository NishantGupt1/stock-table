const KeyManager = require('../lib/KeyManager');
const stockService = require('../lib/stockService');
const tableService = require('../lib/tableService');
const saveService = require('../lib/saveService');

const check = {
  async price(ticker, timeframe, save) {
    try {
      keyManager = new KeyManager();
      const key = keyManager.getKey();

      const api = new stockService(key);
      const priceOutputData = await api.getPriceData(ticker, timeframe);

      const table = new tableService(priceOutputData);

      const tables = table.buildTable();

      tables.forEach(table => {
        console.log(table);
      });
      
      if(save === 'save') {
        const save = new saveService(priceOutputData, ticker, timeframe);
        save.saveStockData();
      }
      
    } catch (err) {
      console.error(err.message.red);
    }
  }
};

module.exports = check;