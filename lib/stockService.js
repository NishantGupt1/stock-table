const axios = require("axios");
const colors = require("colors");

class StockService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://www.alphavantage.co/query?";
  }
  
  async getPriceData(ticker) {
    try {
      const monthlyResponse = await axios.get(
        `${this.baseUrl}function=TIME_SERIES_MONTHLY&symbol=${ticker}&apikey=${this.apiKey}`
      );

      const overviewResponse = await axios.get(
        `${this.baseUrl}function=OVERVIEW&symbol=${ticker}&apikey=${this.apiKey}`
      );

      const monthly = buildMonthlyData(
        monthlyResponse.data["Monthly Time Series"]
      );

      const output = {
        overview: overviewResponse.data,
        monthly: monthly
      };

      return output;
    } catch (err) {
      console.log(err);
      handleAPIError(err);
    }
  }
}

function handleAPIError(err) {
  if (err.response.status === 401) {
    throw new Error("Your API key is invalid - Go to https://www.alphavantage.co");
  } else if (err.response.status === 404) {
    throw new Error("Your API is not responding");
  } else {
    throw new Error("Something is not working");
  }
}

function buildMonthlyData(monthlyData) {
  const data = {};
  let i = 0;
    for (month in monthlyData) {
      if (i < 12) {
        data[month] = monthlyData[month];
        i++;
      } else break;
    }
    return data;
}

module.exports = StockService;
