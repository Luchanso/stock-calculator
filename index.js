const YF = require('yahoo-finance');
const fs = require('fs');

const dataString = fs.readFileSync('./symbols.txt', { encoding: 'utf-8' });
const symbols = dataString.split(',').map(item => item.trim());

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
        const PEMargin = ((1 / summaryDetail.trailingPE) * defaultKeyStatistics.profitMargins).toFixed(3);

        console.log(`symbol = ${symbolKey}, margin = ${margin}, P/E = ${PE}, (1 / (P/E)) * margin = ${PEMargin}`);
    }
}

const idealPE = 72 / 6;
const idealMargin = 0.2;
const idealPEMargin = ((1 / idealPE) * idealMargin).toFixed(3);

console.log(`Ideal: (1 / (P/E)) * margin = ${idealPEMargin}`);

start();