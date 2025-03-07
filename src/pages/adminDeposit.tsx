import { timeVaultV1Abi, tokenAbi } from '@/lib/web3Config';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract } from 'ethers';
import React, { useState } from 'react';

function AdminDeposit() {
  const {  isConnected } = useAppKitAccount();
  const { walletProvider }: { walletProvider: any } =
    useAppKitProvider('eip155');

  const [formData, setFormData] = useState({
    proxyAddress: '',
    tokenAddress: '',
    amount: '',
  });

  const [errors, setErrors] = useState<{
    proxyAddress?: string;
    tokenAddress?: string;
    amount?: string;
  }>({});

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate and submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: typeof errors = {};

    // Basic validation
    if (!formData.proxyAddress) {
      newErrors.proxyAddress = 'Proxy Address is required';
    }
    if (!formData.tokenAddress) {
      newErrors.tokenAddress = 'Token Address is required';
    }
    if (
      !formData.amount ||
      isNaN(Number(formData.amount)) ||
      Number(formData.amount) <= 0
    ) {
      newErrors.amount = 'Amount must be a positive number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-bold">
        Enter Vault Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Proxy Address Input */}
        <div>
          <label className="block text-gray-700">Proxy Address</label>
          <input
            type="text"
            name="proxyAddress"
            value={formData.proxyAddress}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border p-2"
            placeholder="Enter Proxy Address"
          />
          {errors.proxyAddress && (
            <p className="text-sm text-red-500">{errors.proxyAddress}</p>
          )}
        </div>

        {/* Token Address Input */}
        <div>
          <label className="block text-gray-700">Token Address</label>
          <input
            type="text"
            name="tokenAddress"
            value={formData.tokenAddress}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border p-2"
            placeholder="Enter Token Address"
          />
          {errors.tokenAddress && (
            <p className="text-sm text-red-500">{errors.tokenAddress}</p>
          )}
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border p-2"
            placeholder="Enter Amount"
          />
          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={async () => {
            if (isConnected) {
              const ethersProvider = new BrowserProvider(walletProvider);
              const signer = await ethersProvider.getSigner();

              const proxycontract = new Contract(
                formData.proxyAddress,
                timeVaultV1Abi,
                signer
              );
              const tokencontract = new Contract(
                formData.tokenAddress,
                tokenAbi,
                signer
              );
              const decimals:BigInt = await tokencontract.decimals();
              console.log(decimals);

              const tx = await tokencontract.approve(
                proxycontract,
                (Number(formData.amount)  *10** Number(decimals)).toString()
              );
              const conf = await tx.wait();
              if (conf) {
                const tx2 = await proxycontract.depositExternalFunds(
                  (Number(formData.amount) *10** Number(decimals)).toString()
                );
                const conf2 = await tx2.wait();
                if (conf2) {
                  alert(`funds deposited txn hash${tx2}-${conf2}`);
                }
              }
            }
          }}
          type="submit"
          className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700"
        >
          Deposit Funds
        </button>
      </form>
    </div>
  );
}

export default AdminDeposit;
