import { useState } from 'react';
import './App.css';
import { Keypair } from '@solana/web3.js';
import { Buffer } from 'buffer';

function App() {
  const [wallets, setWallets] = useState([]);
  const [jumlah, setJumlah] = useState(1); // Mengganti nama variabel untuk menghindari kebingungan

  function generateWallets() {
    let generatedWallets = [];

    for (let index = 0; index < jumlah; index++) {
      const keypair = Keypair.generate();
      const publicKey = keypair.publicKey.toString();
      const secretKey = Buffer.from(keypair.secretKey).toString('hex');

      generatedWallets.push({
        publicKey: publicKey,
        secretKey: secretKey
      });
    }

    setWallets(generatedWallets);
  }

  function copyToClipboard() {
    const walletData = wallets.map((wallet,index) => 
      `${index+1}\nPublic Key: ${wallet.publicKey}\nSecret Key: ${wallet.secretKey}`).join('\n\n');
    navigator.clipboard.writeText(walletData).then(() => {
      alert('Wallet data copied to clipboard');
    });
  }
  console.log(`wallets`, wallets);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between"}}>
        <button onClick={generateWallets}>Generate Wallets</button>
        <input type="number" value={jumlah} onChange={(e) => setJumlah(parseInt(e.target.value, 10))} placeholder="Jumlah Wallet" />
      </div>
      <div  style={{ display: "flex", justifyContent: "space-between" }}>
        <button style={{ display: "flex", justifyContent: "end", marginTop: 20 }} onClick={() => copyToClipboard(wallets)}>Copy Secret Key</button>
        <button style={{ display: "flex", justifyContent: "end", marginTop: 20 }} onClick={() => setWallets(null)}>Hapus</button>
      </div>

      {wallets?.map((wallet, index) => (
        <div key={index}>
          <div className='d-flex' style={{ textAlign: "start" }}>
            <p>{index + 1}. Public Key / wallet: <span style={{ color: "red" }}>{wallet.publicKey}</span></p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
