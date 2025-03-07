import {  VaultData } from '@/lib/data';
import {  backendApi, proxyAbi, proxyByteCode, v2 } from '@/lib/web3Config';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, ethers } from 'ethers';

import { useState } from 'react';
import  axios  from 'axios';

function AdminPage() {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider }: { walletProvider: any } =
    useAppKitProvider('eip155');
    const [pass,SetPass]=useState('')

  const [formData, setFormData] = useState<VaultData>({
    title: '',
    type: '',
    image: '',
    vaultName: '',
    points: 0,
    isAirdropIncentivised: false,
    yieldGenerated: 0,
    proxyaddress: '',
    tokenAddress: '',
    stats: {
      earnings: '',
      newAPR: '',
      lockedInPeriod: '',
    },
    yieldUnit: '',
    timeLock: 0,
    backingRatio: 0,
    backingPercentage: 0,
    vaultClosesIn: '',
    vaultInfo: {
      amount: 0,
      pricePerUnit: 0,
      currency: '',
      nftLimitPerAddress: 0,
    },
    vaultSupply: {
      current: 0,
      total: 0,
    },
    balance: 0,
    depositAmount: 0,
    claimOpensIn: '',
    nftAddress:''
  });

  async function deployContract(wallet: ethers.JsonRpcSigner, data: VaultData) {
    console.log('Deploying contract...');

    // Create a contract factory
    const ContractFactory = new ethers.ContractFactory(
      proxyAbi,
      proxyByteCode,
      wallet
    );

    // Deploy the contract
    console.log(
      v2,
      (data.vaultInfo.pricePerUnit * 10 ** 18).toString(),
      data.vaultInfo.nftLimitPerAddress,
      address,
      data.tokenAddress,
      data.vaultInfo.amount,
      data.vaultClosesIn,
      data.claimOpensIn
    );
    const contract = await ContractFactory.deploy(
      v2,
      (data.vaultInfo.pricePerUnit * 10 ** 18).toString(),
      data.vaultInfo.nftLimitPerAddress,
      address,
      data.tokenAddress,
      data.vaultInfo.amount,
      data.vaultClosesIn,
      data.claimOpensIn
    );

    // Wait for deployment to complete
    const conf = await contract.deploymentTransaction()?.wait();
    if (conf) {
      console.log('Contract deployed at:', contract.target);
      data.proxyaddress = contract.target.toString();
      alert(`deployed at ,${data.proxyaddress}`);
      return data;
    } else {
      return false;
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      if (name.includes('.')) {
        const [parentKey, childKey] = name.split('.');

        return {
          ...prev,
          [parentKey]: {
            ...(prev[parentKey as keyof typeof prev] as Record<string, any>), // Ensure it's treated as an object
            [childKey]: type === 'checkbox' ? checked : value,
          },
        };
      } else {
        return {
          ...prev,
          [name]: type === 'checkbox' ? checked : value,
        };
      }
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Vault Data Form</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full rounded border p-2"
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          className="w-full rounded border p-2"
          type="text"
          name="type"
          placeholder="Type"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <input
          className="w-full rounded border p-2"
          type="url"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <input
          className="w-full rounded border p-2"
          type="text"
          name="vaultName"
          placeholder="Vault Name"
          value={formData.vaultName}
          onChange={handleChange}
          required
        />
        <h3 className="text-xl font-semibold">Points</h3>
        <input
          className="w-full rounded border p-2"
          type="number"
          name="points"
          placeholder="Points"
          value={formData.points}
          onChange={handleChange}
          required
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isAirdropIncentivised"
            checked={formData.isAirdropIncentivised}
            onChange={handleChange}
            className="mr-2"
          />{' '}
          Airdrop Incentivized
        </label>
        {/* <input className="w-full p-2 border rounded" type="number" step="0.01" name="yieldGenerated" placeholder="Yield Generated" value={formData.yieldGenerated} onChange={handleChange} /> */}
        {/* {/* <input className="w-full p-2 border rounded" type="text" name="proxyaddress" placeholder="Proxy Address" value={formData.proxyaddress} onChange={handleChange} required /> */}
        <input
          className="w-full rounded border p-2"
          type="text"
          name="tokenAddress"
          placeholder="Token Address"
          value={formData.tokenAddress}
          onChange={handleChange}
          required
        />

        <h3 className="text-xl font-semibold">Stats</h3>
        <input
          className="w-full rounded border p-2"
          type="text"
          name="stats.earnings"
          placeholder="Earnings"
          value={formData.stats.earnings}
          onChange={handleChange}
          required
        />
        <input
          className="w-full rounded border p-2"
          type="text"
          name="stats.newAPR"
          placeholder="New APR"
          value={formData.stats.newAPR}
          onChange={handleChange}
          required
        />
        <input
          className="w-full rounded border p-2"
          type="text"
          name="stats.lockedInPeriod"
          placeholder="Locked-in Period"
          value={formData.stats.lockedInPeriod}
          onChange={handleChange}
          required
        />

        <h3 className="text-xl font-semibold">Total Amount</h3>
        <input
          className="w-full rounded border p-2"
          type="number"
          step="0.01"
          name="vaultInfo.amount"
          placeholder="Amount"
          value={formData.vaultInfo.amount}
          onChange={handleChange}
        />
        <h3 className="text-xl font-semibold">Price Per Unit</h3>
        <input
          className="w-full rounded border p-2"
          type="number"
          step="0.01"
          name="vaultInfo.pricePerUnit"
          placeholder="Price Per Unit"
          value={formData.vaultInfo.pricePerUnit}
          onChange={handleChange}
        />
        <h3 className="text-xl font-semibold">backing Ratio</h3>
        <input
          className="w-full rounded border p-2"
          type="number"
          step="0.01"
          name="backingRatio"
          placeholder="backingRatio"
          value={formData.backingRatio}
          onChange={handleChange}
        />
        <h3 className="text-xl font-semibold">backing percentage</h3>
        <input
          className="w-full rounded border p-2"
          type="number"
          step="0.01"
          name="backingPercentage"
          placeholder="backingPercentage"
          value={formData.backingPercentage}
          onChange={handleChange}
        />
        <h3 className="text-xl font-semibold">nftLimitPerAddress</h3>
        <input
          className="w-full rounded border p-2"
          type="number"
          step="0.01"
          name="vaultInfo.nftLimitPerAddress"
          placeholder="nftLimitPerAddress"
          value={formData.vaultInfo.nftLimitPerAddress}
          onChange={handleChange}
        />

        <input
          className="w-full rounded border p-2"
          type="text"
          name="vaultInfo.currency"
          placeholder="Currency: Eth/Mon/Bera/Usdc"
          value={formData.vaultInfo.currency}
          onChange={handleChange}
        />
        <h3 className="text-xl font-semibold">Joining Period</h3>
        <input
          className="w-full rounded border p-2"
          type="number"
          step="0.01"
          name="vaultClosesIn"
          placeholder="vaultClosesIn days"
          value={formData.vaultClosesIn}
          onChange={handleChange}
        />
        <h3 className="text-xl font-semibold">LockIn Period</h3>
        <input
          className="w-full rounded border p-2"
          type="number"
          step="0.01"
          name="claimOpensIn"
          placeholder="claimOpensIn days "
          value={formData.claimOpensIn}
          onChange={handleChange}
        />
        <h3 className="text-xl font-semibold">Admin Password</h3>
        <input
          className="w-full rounded border p-2"
          type="text"
         
          name="Password"
          placeholder="Password "
          
          onChange={(e)=>{
            SetPass(e.target.value)
          }}
        />

        {/* <h3 className="text-xl font-semibold">Total Supply</h3>
            {/* <input className="w-full p-2 border rounded" type="number" name="vaultSupply.current" placeholder="Current" value={formData.vaultSupply.current} onChange={handleChange} /> 
            <input className="w-full p-2 border rounded" type="number" name="vaultSupply.total" placeholder="Total" value={formData.vaultSupply.total} onChange={handleChange} /> */}

        {/* <input className="w-full p-2 border rounded" type="number" step="0.01" name="balance" placeholder="Balance" value={formData.balance} onChange={handleChange} />
            <input className="w-full p-2 border rounded" type="number" step="0.01" name="depositAmount" placeholder="Deposit Amount" value={formData.depositAmount} onChange={handleChange} />
            <input className="w-full p-2 border rounded" type="text" name="claimOpensIn" placeholder="Claim Opens In" value={formData.claimOpensIn} onChange={handleChange} />
             */}
        <button
          onClick={async () => {
            if (isConnected) {
              const ethersProvider = new BrowserProvider(walletProvider);
              const signer = await ethersProvider.getSigner();

              const data = await deployContract(signer, formData);
              if (data) {
                const x=await axios.post(`${backendApi}vaults/create`,{vault:data,password:pass})
                if(x.status==200){

                }else if(x.status==500){
                  alert("db not created")
                }
              }
            }
          }}
          className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AdminPage;
