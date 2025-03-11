import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PlusCircle, CheckCircle, XCircle } from 'lucide-react';
import { BrowserProvider, Contract, Eip1193Provider, ethers } from 'ethers';
import { proxyAbi, proxyByteCode, tokenAbi, v2 } from '@/lib/abi.data';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';

type VaultType = 'fixed' | 'flexible';

function getFutureDatetimeLocal(datetimeLocal: string, daysToAdd: number) {
  const date = new Date(datetimeLocal);

  date.setDate(date.getDate() + daysToAdd);
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
interface FormData {
  title: string;
  lockedInPeriod: string;
  APR: string;
  type: VaultType;
  earnings: string;
  tokenAddress: string;
  AirdropIncentivised: string;
  totalSupply: string;
  joinInPeriod: string;
  price: string;
  backingRatio: string;
  backingPercentage: string;
  tokenSymbol: string;
  NFTLimit: string;
  img: File | null;
}

interface FormErrors {
  [key: string]: string;
}

interface Notification {
  type: 'success' | 'error';
  title: string;
  message: string;
}

const VaultManagement: React.FC = () => {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155') as {
    walletProvider: Eip1193Provider;
  };

  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    lockedInPeriod: '',
    APR: '',
    type: 'fixed',
    earnings: '',
    tokenAddress: '',
    AirdropIncentivised: '',
    totalSupply: '',
    joinInPeriod: '',
    price: '',
    backingRatio: '',
    backingPercentage: '',
    tokenSymbol: '',
    NFTLimit: '',
    img: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (value: string, name: string): void => {
    setFormData((prev) => ({ ...prev, [name]: value as VaultType }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, img: e.target.files![0] }));
      if (errors.img) {
        setErrors((prev) => ({ ...prev, img: '' }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Check required fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value === '' || value === null) {
        newErrors[key] = `${key} is required`;
      }
    });

    // Validate numeric fields
    const numericFields = [
      'lockedInPeriod',
      'APR',
      'earnings',
      'AirdropIncentivised',
      'totalSupply',
      'price',
      'backingRatio',
      'backingPercentage',
      'NFTLimit',
    ];

    numericFields.forEach((field) => {
      if (
        formData[field as keyof FormData] !== '' &&
        isNaN(Number(formData[field as keyof FormData]))
      ) {
        newErrors[field] = `${field} must be a number`;
      }
    });

    // Validate ethereum addresses
    const addressFields = ['tokenAddress', 'NFTAddress'];
    addressFields.forEach((field) => {
      const value = formData[field as keyof FormData] as string;
      if (value && !ethers.isAddress(value)) {
        newErrors[field] = `${field} must be a valid Ethereum address`;
      }
    });

    // Validate specific field constraints
    if (Number(formData.APR) < 0 || Number(formData.APR) > 100) {
      newErrors.APR = 'APR must be between 0 and 100';
    }

    if (
      Number(formData.backingPercentage) < 0 ||
      Number(formData.backingPercentage) > 100
    ) {
      newErrors.backingPercentage =
        'Backing percentage must be between 0 and 100';
    }

    // Validate type field
    if (formData.type !== 'fixed' && formData.type !== 'flexible') {
      newErrors.type = 'Type must be either fixed or flexible';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const showNotification = (
    type: 'success' | 'error',
    title: string,
    message: string
  ): void => {
    setNotification({ type, title, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const deployContract = async (
    wallet: ethers.JsonRpcSigner,
    formData: FormData
  ): Promise<string | false> => {
    try {
      console.log('Deploying contract...');
      const unixTimestampLock = Math.floor(
        new Date(formData.joinInPeriod).getTime() / 1000
      );
      const UnixTimestampClaim =
        unixTimestampLock + parseInt(formData.lockedInPeriod) * 86400;
      const NFTLimit = formData.NFTLimit;

      if (!address) {
        throw new Error('Wallet address is not available');
      }

      const ContractFactory = new ethers.ContractFactory(
        proxyAbi,
        proxyByteCode,
        wallet
      );

      const tokenContract=new Contract(formData.tokenAddress,tokenAbi,wallet)
      const decimal=await tokenContract.decimals()
      console.log(decimal)

      const contract = await ContractFactory.deploy(
        v2, // _logic
        (Number(formData.price) *10**Number(decimal)).toString(), // _nftPrice - ensure BigNumber
        NFTLimit, // _nftLimitPerAddress - ensure BigInt
        ethers.getAddress(address), // initialOwner - ensure proper address format
        ethers.getAddress(formData.tokenAddress), // _tokenAddress - ensure proper address format
        formData.totalSupply, // _nftLimit - ensure BigNumber
        unixTimestampLock, // _joiningPeriod - ensure BigInt
        UnixTimestampClaim // _claimingPeriod - ensure BigInt
      );

      const receipt = await contract.deploymentTransaction()?.wait();
      if (receipt) {
        const contractAddress = contract.target.toString();
        console.log('Contract deployed at:', contractAddress);
        return contractAddress;
      } else {
        throw new Error('Contract deployment failed - no receipt received');
      }
    } catch (error) {
      console.error('Contract deployment error:', error);
      throw error;
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log('Submitting form...');
    if (!isConnected) {
      showNotification(
        'error',
        'Error',
        'Wallet not connected. Please connect your wallet first.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const apiFormData = new FormData();

      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contractAddress = await deployContract(signer, formData);

      if (!contractAddress) {
        throw new Error('Contract deployment failed');
      }

      const claimInPeriod = getFutureDatetimeLocal(
        formData.joinInPeriod,
        parseInt(formData.lockedInPeriod)
      );

      apiFormData.append('claimInPeriod', claimInPeriod);
      apiFormData.append('availableSupply', '0');
      apiFormData.append('proxyAddress', contractAddress);
      apiFormData.append('yieldValue', '0');

      Object.entries(formData).forEach(([key, value]) => {
        apiFormData.append(key, value);
      });

      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${apiUrl}/vault`, {
        method: 'POST',
        body: apiFormData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to add vault');
      }

      showNotification(
        'success',
        'Success',
        'Vault has been added successfully'
      );

      setFormData({
        title: '',
        lockedInPeriod: '',
        APR: '',
        type: 'fixed',
        earnings: '',
        tokenAddress: '',
        AirdropIncentivised: '',
        totalSupply: '',
        joinInPeriod: '',
        price: '',
        backingRatio: '',
        backingPercentage: '',
        tokenSymbol: '',
        NFTLimit: '',
        img: null,
      });

      setOpen(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      showNotification('error', 'Error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {notification && (
        <div className="mb-4">
          <Alert
            variant={notification.type === 'error' ? 'destructive' : 'default'}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <AlertTitle>{notification.title}</AlertTitle>
            <AlertDescription>{notification.message}</AlertDescription>
          </Alert>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Add Vault
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[98vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Vault</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new vault. All fields are
              required.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="mb-2">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={handleChange}
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="img" className="mb-2">
                    Image
                  </Label>
                  <Input
                    id="img"
                    name="img"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={errors.img ? 'border-red-500' : ''}
                  />
                  {errors.img && (
                    <p className="mt-1 text-sm text-red-500">{errors.img}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lockedInPeriod" className="mb-2">
                    Locked In Period (days)
                  </Label>
                  <Input
                    id="lockedInPeriod"
                    name="lockedInPeriod"
                    placeholder="Enter locked in period in days"
                    value={formData.lockedInPeriod}
                    onChange={handleChange}
                    className={errors.lockedInPeriod ? 'border-red-500' : ''}
                  />
                  {errors.lockedInPeriod && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.lockedInPeriod}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="APR" className="mb-2">
                    APR (%)
                  </Label>
                  <Input
                    id="APR"
                    name="APR"
                    placeholder="Enter APR percentage"
                    value={formData.APR}
                    onChange={handleChange}
                    className={errors.APR ? 'border-red-500' : ''}
                  />
                  {errors.APR && (
                    <p className="mt-1 text-sm text-red-500">{errors.APR}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="type" className="mb-2">
                    Type
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange(value, 'type')}
                  >
                    <SelectTrigger
                      className={errors.type ? 'border-red-500' : ''}
                    >
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-500">{errors.type}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="earnings" className="mb-2">
                    Earnings
                  </Label>
                  <Input
                    id="earnings"
                    name="earnings"
                    placeholder="Enter earnings"
                    value={formData.earnings}
                    onChange={handleChange}
                    className={errors.earnings ? 'border-red-500' : ''}
                  />
                  {errors.earnings && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.earnings}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="tokenAddress" className="mb-2">
                    Token Address
                  </Label>
                  <Input
                    id="tokenAddress"
                    name="tokenAddress"
                    placeholder="Enter token address (0x...)"
                    value={formData.tokenAddress}
                    onChange={handleChange}
                    className={errors.tokenAddress ? 'border-red-500' : ''}
                  />
                  {errors.tokenAddress && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.tokenAddress}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="AirdropIncentivised" className="mb-2">
                    Airdrop Incentivised
                  </Label>
                  <Input
                    id="AirdropIncentivised"
                    name="AirdropIncentivised"
                    placeholder="Enter airdrop incentivised value"
                    value={formData.AirdropIncentivised}
                    onChange={handleChange}
                    className={
                      errors.AirdropIncentivised ? 'border-red-500' : ''
                    }
                  />
                  {errors.AirdropIncentivised && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.AirdropIncentivised}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="NFTLimit" className="mb-2">
                    NFT Limit
                  </Label>
                  <Input
                    id="NFTLimit"
                    name="NFTLimit"
                    placeholder="Enter NFT limit"
                    value={formData.NFTLimit}
                    onChange={handleChange}
                    className={errors.NFTLimit ? 'border-red-500' : ''}
                  />
                  {errors.NFTLimit && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.NFTLimit}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="totalSupply" className="mb-2">
                    Total Supply
                  </Label>
                  <Input
                    id="totalSupply"
                    name="totalSupply"
                    placeholder="Enter total supply"
                    value={formData.totalSupply}
                    onChange={handleChange}
                    className={errors.totalSupply ? 'border-red-500' : ''}
                  />
                  {errors.totalSupply && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.totalSupply}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="joinInPeriod" className="mb-2">
                    Join period end
                  </Label>
                  <Input
                    id="joinInPeriod"
                    type="datetime-local"
                    name="joinInPeriod"
                    placeholder="Select date and time"
                    value={formData.joinInPeriod}
                    onChange={handleChange}
                    className={errors.joinInPeriod ? 'border-red-500' : ''}
                  />
                  {errors.joinInPeriod && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.joinInPeriod}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="price" className="mb-2">
                    Price
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleChange}
                    className={errors.price ? 'border-red-500' : ''}
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="backingRatio" className="mb-2">
                    Backing Ratio
                  </Label>
                  <Input
                    id="backingRatio"
                    name="backingRatio"
                    placeholder="Enter backing ratio"
                    value={formData.backingRatio}
                    onChange={handleChange}
                    className={errors.backingRatio ? 'border-red-500' : ''}
                  />
                  {errors.backingRatio && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.backingRatio}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="backingPercentage" className="mb-2">
                    Backing Percentage (%)
                  </Label>
                  <Input
                    id="backingPercentage"
                    name="backingPercentage"
                    placeholder="Enter backing percentage"
                    value={formData.backingPercentage}
                    onChange={handleChange}
                    className={errors.backingPercentage ? 'border-red-500' : ''}
                  />
                  {errors.backingPercentage && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.backingPercentage}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="tokenSymbol" className="mb-2">
                    Token Symbol
                  </Label>
                  <Input
                    id="tokenSymbol"
                    name="tokenSymbol"
                    placeholder="Enter token symbol"
                    value={formData.tokenSymbol}
                    onChange={handleChange}
                    className={errors.tokenSymbol ? 'border-red-500' : ''}
                  />
                  {errors.tokenSymbol && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.tokenSymbol}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Add Vault'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VaultManagement;
