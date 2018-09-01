const YF = require('yahoo-finance');
const fs = require('fs');

const dataString = fs.readFileSync('./symbols.txt', { encoding: 'utf-8' });
const symbols = dataString.split(',');

const modules = ['price', 'summaryDetail', 'defaultKeyStatistics'];

const requiestData = {
    modules,
    symbols
};

const start = async () => {
    const result = await YF.quote(requiestData);

    const values = Object.values(result);

    for (const symbol of values) {
        const { price, summaryDetail, defaultKeyStatistics } = symbol;
        const margin = (defaultKeyStatistics.profitMargins * 100).toFixed(3);
        const PE = summaryDetail.trailingPE.toFixed(3);
        const { symbol: symbolKey } = price;

        console.log(`symbol: ${symbolKey}, margin: ${margin}, P/E: ${PE}`);
    }
}
