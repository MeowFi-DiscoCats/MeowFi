import { timeVaultV1Abi } from '@/lib/web3Config';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract } from 'ethers';
import React, { useState } from 'react';

function AdminCollect() {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider }: { walletProvider: any } =
    useAppKitProvider('eip155');

  const [formData, setFormData] = useState({
    proxyAddress: '',
    accountAddress: '',
  });

  const [errors, setErrors] = useState<{
    proxyAddress?: string;
    accountAddress?: string;
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
    if (!formData.accountAddress) {
      newErrors.accountAddress = 'Account Address is required';
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
          <label className="block text-gray-700">Proxy contract Address</label>
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

        {/* Account Address Input */}
        <div>
          <label className="block text-gray-700">Receiver Address</label>
          <input
            type="text"
            name="accountAddress"
            value={formData.accountAddress}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border p-2"
            placeholder="Enter Account Address"
          />
          {errors.accountAddress && (
            <p className="text-sm text-red-500">{errors.accountAddress}</p>
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

              const tx=await proxycontract.withdrawAllFunds(formData.accountAddress)
              const conf=await tx.wait()
              if(conf){
                alert(`funds withdrawn at${formData.accountAddress}`)
              }

              // const tokencontract = new Contract(
              //   vaultData.tokenAddress,
              //   tokenAbi,
              //   signer
              // );
            }
          }}
          type="submit"
          className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700"
        >
          Collect Funds
        </button>
      </form>
    </div>
  );
}

export default AdminCollect;
