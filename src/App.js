import { Alchemy, Network } from 'alchemy-sdk';
import React, { useEffect, useState } from 'react';

import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockInfo, setBlockInfo] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        // Get the current block number
        const currentBlockNumber = await alchemy.core.getBlockNumber();
        setBlockNumber(currentBlockNumber);

        // Get information about a specific block (e.g., the latest block)
        const block = await alchemy.core.getBlockWithTransactions(currentBlockNumber);

        // Set block information to state
        setBlockInfo(block);

        // Log block information
        console.log("Block Information:", block);

        // Loop through transactions in the block
        if (block && block.transactions) {
          for (const transaction of block.transactions) {
            // Access transaction properties
            console.log("affichage de transaction",transaction);
            const {
              hash,
              from,
              to,
              value,
              gasPrice,
              // Add more properties as needed
            } = transaction;

            // Perform actions with transaction properties
            console.log("Transaction Hash:", hash);
            console.log("From:", from);
            console.log("To:", to);
            console.log("Value:", value);
            console.log("Gas Price:", gasPrice);
            console.log("------------------------");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once on mount
return (
  <div className="App">
  <div>Block Number: {blockNumber}</div>
  {blockInfo && (
    <div>
      <h2>Block Information:</h2>
      <div>
        <strong>Block Hash:</strong> {blockInfo.hash}
      </div>
      <div>
        <strong>Timestamp:</strong> {blockInfo.timestamp}
      </div>
      <div>
        <strong>Miner:</strong> {blockInfo.miner}
      </div>
      <div>
        <strong>Gas Limit:</strong> {blockInfo.gasLimit.toString()}
      </div>
      <div>
        <strong>Gas Used:</strong> {blockInfo.gasUsed.toString()}
      </div>

      <h2>Transactions:</h2>
      <ul>
        {blockInfo.transactions.map((transaction, index) => (
          <li key={index}>
            <div>
              <strong>Transaction Hash:</strong> {transaction.hash}
            </div>
            <div>
              <strong>From:</strong> {transaction.from}
            </div>
            <div>
              <strong>To:</strong> {transaction.to}
            </div>
            <div>
              <strong>Value:</strong> {transaction.value.toString()} {/* Convert to string */}
            </div>
            
            <div>
              <strong>Gas Price:</strong> {transaction.gasPrice.toString()} {/* Convert to string */}
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  )}
</div>
);
}

export default App;
