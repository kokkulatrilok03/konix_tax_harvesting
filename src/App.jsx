import React, { useState } from "react";
import "./App.css";

const holdingsData = [
  {
    id: 1,
    asset: "Bitcoin",
    symbol: "BTC",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    amount: 0.63776,
    amountFiat: 55230.15,
    shortTerm: -1200,
    shortTermQty: 0.388,
    longTerm: 2400,
    longTermQty: 0.32,
  },
  {
    id: 2,
    asset: "Ethereum",
    symbol: "ETH",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    amount: 5.6736,
    amountFiat: 9324.21,
    shortTerm: 55320.15,
    shortTermQty: 2.352,
    longTerm: 8239.29,
    longTermQty: 3.346,
  },
  {
    id: 3,
    asset: "Tether",
    symbol: "USDT",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
    amount: 3096.54,
    amountFiat: 3142.21,
    shortTerm: -1200,
    shortTermQty: 2011.23,
    longTerm: 802,
    longTermQty: 902.47,
  },
  {
    id: 4,
    asset: "Polygon",
    symbol: "MATIC",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
    amount: 2210,
    amountFiat: 4672.12,
    shortTerm: -1200,
    shortTermQty: 802,
    longTerm: 0,
    longTermQty: 0,
  },
  {
    id: 5,
    asset: "Ethereum",
    symbol: "ETH",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    amount: 5.6736,
    amountFiat: 9324.21,
    shortTerm: 55320.15,
    shortTermQty: 2.352,
    longTerm: 8239.29,
    longTermQty: 3.346,
  },
  {
    id: 6,
    asset: "Tether",
    symbol: "USDT",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
    amount: 3096.54,
    amountFiat: 3142.21,
    shortTerm: -1200,
    shortTermQty: 2011.23,
    longTerm: 802,
    longTermQty: 902.47,
  },
  {
    id: 7,
    asset: "Solana",
    symbol: "SOL",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
    amount: 98.3,
    amountFiat: 17840.65,
    shortTerm: 1340,
    shortTermQty: 32.1,
    longTerm: 7840,
    longTermQty: 66.2,
  },
  {
    id: 8,
    asset: "Ripple",
    symbol: "XRP",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
    amount: 3420,
    amountFiat: 1500.77,
    shortTerm: -300,
    shortTermQty: 1120,
    longTerm: 620,
    longTermQty: 2300,
  },
  {
    id: 9,
    asset: "Cardano",
    symbol: "ADA",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
    amount: 5400,
    amountFiat: 2140.45,
    shortTerm: -150,
    shortTermQty: 3200,
    longTerm: 920,
    longTermQty: 2200,
  },
  {
    id: 10,
    asset: "Dogecoin",
    symbol: "DOGE",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
    amount: 8900,
    amountFiat: 798.34,
    shortTerm: -50,
    shortTermQty: 4000,
    longTerm: 200,
    longTermQty: 4900,
  },
  {
    id: 11,
    asset: "Avalanche",
    symbol: "AVAX",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png",
    amount: 112.4,
    amountFiat: 3824.93,
    shortTerm: 1400,
    shortTermQty: 40.6,
    longTerm: 2000,
    longTermQty: 71.8,
  },
];


const disclaimerList = [
  "Price Source Disclaimer: Please note that the current price of your coins may differ from the prices listed on specific exchanges. This is because we use CoinGecko as our default price source for certain exchanges, rather than fetching prices directly from the exchange.",
  "Country-specific Availability: Tax loss harvesting may not be supported in all countries. We strongly recommend consulting with your local tax advisor or accountant before performing any related actions on your exchange.",
  "Utilization of Losses: Tax loss harvesting typically allows you to offset capital gains. However, if you have zero or no applicable crypto capital gains, the usability of these harvested losses may be limited. Kindly confirm with your tax advisor how such losses can be applied in your situation.",
];



export default function App() {
  const [selected, setSelected] = useState([]);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  
  
  // Helper to sum up pre-harvesting stats for checked items
  function summarize(rows) {
    let stProfit = 0,
      stLoss = 0,
      stNet = 0;
    let ltProfit = 0,
      ltLoss = 0,
      ltNet = 0;

    rows.forEach((r) => {
      stProfit += r.shortTerm > 0 ? r.shortTerm : 0;
      stLoss += r.shortTerm < 0 ? Math.abs(r.shortTerm) : 0;
      stNet += r.shortTerm;

      ltProfit += r.longTerm > 0 ? r.longTerm : 0;
      ltLoss += r.longTerm < 0 ? Math.abs(r.longTerm) : 0;
      ltNet += r.longTerm;
    });

    return {
      shortTerm: { profit: stProfit, loss: stLoss, net: stNet },
      longTerm: { profit: ltProfit, loss: ltLoss, net: ltNet },
      realised: stNet + ltNet,
    };
  }

  // Harvesting calculation (e.g. double losses for demo)
  function summarizeAfterHarvest(rows) {
    let stProfit = 0,
      stLoss = 0,
      stNet = 0;
    let ltProfit = 0,
      ltLoss = 0,
      ltNet = 0;

    rows.forEach((r) => {
      stProfit += r.shortTerm > 0 ? r.shortTerm : 0;
      stLoss += r.shortTerm < 0 ? Math.abs(r.shortTerm * 2) : 0;
      stNet += r.shortTerm > 0 ? r.shortTerm : r.shortTerm * 2;

      ltProfit += r.longTerm > 0 ? r.longTerm : 0;
      ltLoss += r.longTerm < 0 ? Math.abs(r.longTerm * 2) : 0;
      ltNet += r.longTerm > 0 ? r.longTerm : r.longTerm * 2;
    });

    return {
      shortTerm: { profit: stProfit, loss: stLoss, net: stNet },
      longTerm: { profit: ltProfit, loss: ltLoss, net: ltNet },
      realised: stNet + ltNet,
    };
  }

  const selectedRows = holdingsData.filter((row) => selected.includes(row.id));
  const pre = summarize(selectedRows);
  const after = summarizeAfterHarvest(selectedRows);

  // Calculate savings; zero if none selected
  const savings =
    selectedRows.length > 0 ? pre.realised - after.realised : 0;

  const toggleSelected = (id) =>
    setSelected((sel) =>
      sel.includes(id) ? sel.filter((i) => i !== id) : [...sel, id]
    );

  return (
    <div className="taxloss-app">
      {/* Header */}
      <header className="taxloss-header">
        <img
          src="https://res.cloudinary.com/dzdcwy4m5/image/upload/v1747817043/Screenshot_2025-05-21_141210_ktwf2v.png  "
          alt="KoinX Logo"
          style={{ height: 38, marginRight: 8 }}
        />
        <br/>
        <h1 className="taxloss-title">Tax Harvesting</h1>
        <br/>
        <a href="#" className="taxloss-header-link">
          How it works?
        </a>
      </header>

      {/* Disclaimer */}
      <div className="taxloss-disclaimer-box">
        <button
          className="taxloss-disclaimer-trigger"
          onClick={() => setDisclaimerOpen((x) => !x)}
        >
          <span className="taxloss-disclaimer-info">ⓘ</span>{" "}
          Important Notes & Disclaimers
          <span style={{ float: "right" }}>{disclaimerOpen ? "▾" : "▸"}</span>
        </button>
        {disclaimerOpen && (
          <ul className="taxloss-disclaimer">
            {disclaimerList.map((line, i) => (
              <li key={i} style={{ marginBottom: 4 }}>
                {line}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Summary Section */}
      <div className="taxloss-summary-row">
        {/* Pre Harvesting */}
        <div className="taxloss-card">
          <div className="taxloss-card-title">Pre Harvesting</div>
          <div className="taxloss-card-cols">
            <div>
              <div className="taxloss-label">Short-term</div>
              <div>Profits: <span>${pre.shortTerm.profit}</span></div>
              <div>Losses: <span>~ ${pre.shortTerm.loss}</span></div>
              <div>Net Capital Gains: <span>${pre.shortTerm.net}</span></div>
            </div>
            <div>
              <div className="taxloss-label">Long-term</div>
              <div>Profits: <span>${pre.longTerm.profit}</span></div>
              <div>Losses: <span>~ ${pre.longTerm.loss}</span></div>
              <div>Net Capital Gains: <span>${pre.longTerm.net}</span></div>
            </div>
          </div>
          <div className="taxloss-card-footer">
            Realised Capital Gains:{" "}
            <span className="taxloss-bignum">${pre.realised}</span>
          </div>
        </div>
        {/* After Harvesting */}
        <div className="taxloss-card taxloss-card-gradient">
          <div className="taxloss-card-title">After Harvesting</div>
          <div className="taxloss-card-cols">
            <div>
              <div className="taxloss-label">Short-term</div>
              <div>Profits: <span>${after.shortTerm.profit}</span></div>
              <div>Losses: <span>- ${after.shortTerm.loss}</span></div>
              <div>Net Capital Gains: <span>${after.shortTerm.net}</span></div>
            </div>
            <div>
              <div className="taxloss-label">Long-term</div>
              <div>Profits: <span>${after.longTerm.profit}</span></div>
              <div>Losses: <span>- ${after.longTerm.loss}</span></div>
              <div>Net Capital Gains: <span>${after.longTerm.net}</span></div>
            </div>
          </div>
          <div className="taxloss-card-footer">
            Effective Capital Gains:
            <span className="taxloss-bignum taxloss-bignum-blue">
              ${after.realised}
            </span>
            <div className="taxloss-savemsg">
              💡 You are going to save up to <b>${savings}</b>
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="taxloss-table-wrap">
        <div className="taxloss-table-rowhead">
          <span className="taxloss-table-title">Holdings</span>
          <a href="#" className="taxloss-viewall">
            View all
          </a>
        </div>
        <table className="taxloss-table">
          <thead>
            <tr>
              <th />
              <th className="left">Asset</th>
              <th>Holdings</th>
              <th>Total Current Value</th>
              <th>Short-term</th>
              <th>Long-Term</th>
              <th>Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {holdingsData.map((row) => (
              <tr
                key={row.id}
                className={
                  selected.includes(row.id)
                    ? "taxloss-tr taxloss-tr-selected"
                    : "taxloss-tr"
                }
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(row.id)}
                    onChange={() => toggleSelected(row.id)}
                  />
                </td>
                <td>
                  <span className="taxloss-row-asset">
                    <img
                      src={row.logo}
                      alt={row.asset}
                      className="taxloss-row-logo"
                    />
                    <span>
                      <span className="taxloss-row-assetname">
                        {row.asset}
                      </span>
                      <span className="taxloss-row-assetsym">
                        {row.symbol}
                      </span>
                    </span>
                  </span>
                </td>
                <td>
                  <div className="taxloss-holdingmain">
                    {row.amount} {row.symbol}
                  </div>
                  <div className="taxloss-holdingrate">
                    @ ${ (row.amountFiat / row.amount).toFixed(2) }/{row.symbol}
                  </div>
                </td>
                <td>${row.amountFiat.toLocaleString()}</td>
                <td>
                  <span
                    className={
                      row.shortTerm > 0
                        ? "taxloss-short-green"
                        : "taxloss-short-red"
                    }
                  >
                    {row.shortTerm > 0 ? "+" : ""}
                    {row.shortTerm.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <div className="taxloss-qtycell">
                    {row.shortTermQty} {row.symbol}
                  </div>
                </td>
                <td>
                  <span
                    className={
                      row.longTerm > 0
                        ? "taxloss-short-green"
                        : "taxloss-short-red"
                    }
                  >
                    {row.longTerm > 0 ? "+" : ""}
                    {row.longTerm.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <div className="taxloss-qtycell">
                    {row.longTermQty} {row.symbol}
                  </div>
                </td>
                <td>
                  {row.amount !== 0
                    ? row.amount.toLocaleString() + " " + row.symbol
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}