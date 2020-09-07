const KeyManager = require('../lib/KeyManager');
const stockService = require('../lib/stockService');
const tableService = require('../lib/tableService');

const check = {
  async price(ticker) {
    try {
      keyManager = new KeyManager();
      const key = keyManager.getKey();

      const api = new stockService(key);
      const priceOutputData = await api.getPriceData(ticker);

      const table = new tableService(priceOutputData);

      table.buildTable().forEach(table => {
        console.log(table);
      });
      
    } catch (err) {
      console.error(err.message.red);
    }
  }
};

module.exports = check;