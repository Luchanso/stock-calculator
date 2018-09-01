// Калькулятор, который расчитывает стоимость портфеля с учётом коммиссий и налогов

const lots = [
  {
    price: 302.7,
    count: 10,
    commission: 99 * 2,
    date: new Date(2017, 8, 23)
  },
  {
    price: 309.05,
    count: 30,
    commission: 99 * 2,
    date: new Date(2017, 9, 8)
  },
];

const dividends = [133.2];
const summaryDividends = dividends.reduce((prev, curr) => prev + curr, 0);

// per month
const profitTarget = 0.2 / 12;
const VAT = 0.13;

const getMontDiff = (lotDate) => {
  const timeDiff = (Date.now() - lotDate.getTime()); // ms
  const monthDiff = (timeDiff / 1000 / 60 / 60 / 24 / 30); // months

  return monthDiff;
};

const getTargetPrice = (profitTarget, lots, summaryDividends) => {
  const summary = lots.map((lot) => {
    const monthDiff = getMontDiff(lot.date);
    const profit = monthDiff * profitTarget;

    const totalPrice = (lot.price * lot.count);
    const resultPrice = totalPrice * (1 + profit);
    const diffPrice = resultPrice - totalPrice;
    const VATCommission = diffPrice / (1 - VAT) - diffPrice;

    return (resultPrice + lot.commission + VATCommission - (summaryDividends / lots.length) * (1 - VAT)) / lot.count;
  });

  console.log(summary);

  const avgPriceSell = summary.reduce((prev, curr) => prev + curr, 0) / summary.length;
  console.log(`Sell price: ${avgPriceSell}`);
};

const getProfitByPrice = (currentPrice, lots, summaryDividends) => {
  const summary = lots.map((lot) => {
    const buyCoast = lot.price * lot.count;
    const totalCoast = currentPrice * lot.count - lot.commission + (summaryDividends / lots.length);

    const profit = ((totalCoast - buyCoast) * (1 - VAT)) / buyCoast;
    return profit;
  });

  console.log(summary);

  const avgProfit = summary.reduce((prev, curr) => prev + curr, 0) / summary.length;

  console.log(`Profit: ${(avgProfit * 100).toFixed(2)}%`);
};

getTargetPrice(profitTarget, lots, summaryDividends);
console.log('-'.repeat(100));
getProfitByPrice(336.37, lots, summaryDividends);;
