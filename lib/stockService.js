const axios = require("axios");

class StockService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://www.alphavantage.co/query?";
  }
  
  async getPriceData(ticker, timeframe) {
    try {
      const timeSeries = getTimeSeries(timeframe);
      const timeSeriesResponse = await axios.get(
        `${this.baseUrl}function=${timeSeries}&symbol=${ticker}&apikey=${this.apiKey}`
      );

      const overviewResponse = await axios.get(
        `${this.baseUrl}function=OVERVIEW&symbol=${ticker}&apikey=${this.apiKey}`
      );

      const timeSeriesData = buildtimeSeriesTableData(timeSeries, timeSeriesResponse.data);

      const output = {
        overview: overviewResponse.data,
        timeSeries: timeSeriesData,
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
    throw new Error(
      "API key invalid - Go to https://www.alphavantage.co to get free key"
    );
  } else if (err.response.status === 404) {
    throw new Error("The API is not responding");
  } else {
    throw new Error(err);
  }
}

function buildTableData(timeSeries, timeSeriesData) {
  const data = {};
  let i = 0;
  let maxInterval = 0;
  switch (timeSeries) {
      case "TIME_SERIES_DAILY":
        maxInterval = 90;
        break;
      case "TIME_SERIES_WEEKLY":
        maxInterval = 52;
        break;
      case "TIME_SERIES_MONTHLY":
        maxInterval = 12;
        break;
      default:
        maxInterval = 10;
  }

  for (date in timeSeriesData) {
    if (i < maxInterval) {
      data[date] = timeSeriesData[date];
      i++;
    } else break;
  }
  return data;
}

function getTimeSeries(timeframe) {
  let timeSeries = "";
  switch (timeframe) {
    case "daily":
      timeSeries = "TIME_SERIES_DAILY";
      break;
    case "weekly":
      timeSeries = "TIME_SERIES_WEEKLY";
      break;
    case "monthly":
      timeSeries = "TIME_SERIES_MONTHLY";
      break;
    default:
      timeSeries = "TIME_SERIES_MONTHLY";
  }
  return timeSeries
}

function buildtimeSeriesTableData(timeSeries, timeSeriesData) {
  let tableData = {};
  switch (timeSeries) {
    case "TIME_SERIES_DAILY":
      tableData = buildTableData(timeSeries, timeSeriesData["Time Series (Daily)"]);
      break;
    case "TIME_SERIES_WEEKLY":
      tableData = buildTableData(timeSeries, timeSeriesData["Weekly Time Series"]);
      break;
    case "TIME_SERIES_WEEKLY":
      tableData = buildTableData(timeSeries, timeSeriesData["Monthly Time Series"]);
      break;
    default:
      tableData = buildTableData(timeSeries, timeSeriesData["Monthly Time Series"]);
  }
  return tableData
}

module.exports = StockService;
