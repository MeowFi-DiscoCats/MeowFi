import YellowBolt from '@/components/svg/YellowBolt';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  useAppKitAccount,
  useAppKitNetworkCore,
  useAppKitProvider,
} from '@reown/appkit/react';
import { BrowserProvider, Contract, Eip1193Provider, ethers } from 'ethers';
import { vaults } from '@/data/vaults';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { tokens } from '@/data/tokens';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLiveFetch } from '@/lib/hooks/useFetch';
import { useUserLiveFetch } from '@/lib/hooks/useUserFetch';

export default function DepositDialog({
  quantity,
  index,
}: {
  quantity: number;
  index: number;
}) {
  const vault = vaults[index];
  const { data: liveVaultsData } = useLiveFetch();
  const joinInPeriod = liveVaultsData
    ? liveVaultsData[index].joinInPeriod
    : vault.joinInPeriod;

  const joinDeadline = new Date(joinInPeriod).getTime();
  const [isJoinClosed, setIsJoinClosed] = useState(Date.now() > joinDeadline);
  const [useZap, setUseZap] = useState(false);
  const [tokenIndex, setTokenIndex] = useState(
    vault.token.symbol === tokens[0].symbol ? 1 : 0
  );
  const slippagePercent = 1;
  const [swapEstimate, setSwapEstimate] = useState<number | null>(null);

  useEffect(() => {
    if (!isJoinClosed) {
      const timeRemaining = joinDeadline - Date.now();
      const timeout = setTimeout(() => {
        setIsJoinClosed(true);
      }, timeRemaining);
      return () => clearTimeout(timeout);
    }
  }, [isJoinClosed, joinDeadline]);

  const { isConnected, address } = useAppKitAccount();
  const { walletProvider }: { walletProvider: Eip1193Provider } =
    useAppKitProvider('eip155');
  const { chainId } = useAppKitNetworkCore();

  const { data: userVaultData } = useUserLiveFetch(
    walletProvider,
    chainId as string,
    index,
    isConnected
  );

  const [depositStatus, setDepositStatus] = useState('Deposit');
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  async function executeDeposit() {
    if (!isConnected) {
      toast('Please connect your wallet.');
      return;
    }

    const provider = new BrowserProvider(walletProvider, chainId);
    const signer = await provider.getSigner();

    setDepositStatus('Depositing...');

    try {
      const depositAmount = ethers.parseUnits(
        (quantity * vault.nftPrice).toString(),
        vault.token.decimals
      );

      if (useZap) {
        const selectedToken = tokens[tokenIndex];

        if (selectedToken.isErc20) {
          const tokenContract = new Contract(
            selectedToken.address,
            [
              'function approve(address spender, uint256 amount) returns (bool)',
            ],
            signer
          );

          const approval = await tokenContract.approve(
            vault.proxyAddress,
            depositAmount
          );
          const receiptApproval = await approval.wait();

          if (receiptApproval) {
            toast('Approval successful', {
              description: 'You have successfully Approved',
            });

            const proxyContract = new Contract(
              vault.proxyAddress,
              [
                'function swapAndJoin(uint256 _nftAmount, address user, uint16 _slippageBps, address _startTokenAddr) external nonpayable',
              ],
              signer
            );

            const depositTx = await proxyContract.swapAndJoin(
              quantity,
              address,
              slippagePercent * 100,
              selectedToken.address
            );

            const receipt = await depositTx.wait();
            if (receipt) {
              toast('Deposit successful', {
                description: 'You have successfully deposited',
              });
            }
          }
        } else {
          const proxyContract = new Contract(
            vault.proxyAddress,
            [
              'function swapEthAndJoin(uint256 _nftAmount, address user, uint16 _slippageBps) external payable',
            ],
            signer
          );

          const depositTx = await proxyContract.swapEthAndJoin(
            quantity,
            address,
            slippagePercent * 100
          );

          const receipt = await depositTx.wait();
          if (receipt) {
            toast('Deposit successful', {
              description: 'You have successfully deposited',
            });
          }
        }
      } else {
        if (vault.token.isErc20) {
          const tokenContract = new Contract(
            vault.token.address,
            [
              'function approve(address spender, uint256 amount) returns (bool)',
            ],
            signer
          );

          const approval = await tokenContract.approve(
            vault.proxyAddress,
            depositAmount
          );
          const receiptApproval = await approval.wait();

          if (receiptApproval) {
            toast('Approval successful', {
              description: 'You have successfully Approved',
            });

            const proxyContract = new Contract(
              vault.proxyAddress,
              [
                'function joinVault(uint256 amount, address userAddress) external',
              ],
              signer
            );

            const depositTx = await proxyContract.joinVault(quantity, address);
            const receipt = await depositTx.wait();

            if (receipt) {
              toast('Deposit successful', {
                description: 'You have successfully deposited',
              });
            }
          }
        } else {
          const proxyContract = new Contract(
            vault.proxyAddress,
            ['function joinVault(uint256 amount) external'],
            signer
          );

          const depositTx = await proxyContract.joinVault(quantity);
          const receipt = await depositTx.wait();

          if (receipt) {
            toast('Deposit successful', {
              description: 'You have successfully deposited',
            });
          }
        }
      }

      setDialogOpen(false);
      setDepositStatus('Deposit');
      queryClient.invalidateQueries({
        queryKey: ['liveVaultsData', 'liveUserVaultsData'],
      });
    } catch (error) {
      console.error('Error during deposit:', error);
      toast('Deposit failed', {
        description: 'Please try again',
      });
      setDepositStatus('Deposit');
    }
  }

  function validateDeposit() {
    if (!isConnected) {
      toast('Please connect your wallet.');
    }
    if (isJoinClosed) {
      toast('Join period has ended.');
    }
  }

  useEffect(() => {
    const fetchSwapEstimate = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(
          import.meta.env.VITE_ALCHEMY_URL
        );
        const selectedToken = tokens[tokenIndex];

        if (selectedToken.isErc20) {
          const proxyContract = new Contract(
            vault.proxyAddress,
            [
              'function getInputForExactOutput(uint256 _nftAmount, uint16 _slippageBps, address _startTokenAddr) external view returns (uint256)',
            ],
            provider
          );
          const amount = await proxyContract.getInputForExactOutput(
            quantity,
            slippagePercent * 100,
            selectedToken.address
          );
          setSwapEstimate(Number(amount));
        } else {
          const proxyContract = new Contract(
            vault.proxyAddress,
            [
              'function getEthInputForExactOutput(uint256 _nftAmount, uint16 _slippageBps) external view returns (uint256)',
            ],
            provider
          );
          const amount = await proxyContract.getEthInputForExactOutput(
            quantity,
            slippagePercent * 100
          );
          setSwapEstimate(Number(amount));
        }
      } catch (error) {
        console.error('Error fetching swap estimate:', error);
      }
    };

    fetchSwapEstimate();
  }, [tokenIndex, quantity, vault.proxyAddress]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger
        onClick={validateDeposit}
        className={`${
          isJoinClosed
            ? 'cursor-not-allowed border-gray-400 text-gray-400 hover:bg-gray-400/10'
            : 'bg-amber border-gunmetal text-black hover:bg-amber-400'
        } relative mx-auto rounded-lg border px-12 font-semibold`}
      >
        Deposit
        <div className="border-gunmetal absolute -top-0.25 -right-0.25 flex rounded-full border bg-[#671afc] px-1 py-0.5 text-[8px] text-white">
          Zap
          <span className="w-2.5">
            <YellowBolt />
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-cream border-gunmetal rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-Teko text-center text-3xl font-semibold">
            Deposit Confirmation
          </DialogTitle>
          <DialogDescription className="hidden text-center text-sm font-semibold">
            This is a confirmation of your deposit. Please ensure that the
            wallet address you are using is correct.
          </DialogDescription>
          <section>
            <div className="mt-4 flex items-center justify-between">
              <p className="font-Teko font-semibold">You are Depositing</p>

              <p className="text-end text-sm font-semibold">
                Balance:
                <span className="mx-1">
                  {userVaultData?.balance ? `${userVaultData.balance}` : '0'}
                </span>
                {vault.token.symbol}
              </p>
            </div>
            <div className="border-gunmetal mt-2 flex items-center justify-between rounded-xl border p-1 px-2">
              <div className="bg-yellow border-gunmetal flex-1 rounded-xl border p-1 px-4 text-center">
                {Number((quantity * vault.nftPrice).toFixed(5))}
              </div>
              <div className="font-Teko flex flex-1 items-center justify-end gap-2 px-4">
                <img
                  width={20}
                  className="aspect-square rounded-xl"
                  src={vault.token.img}
                />
                <span className="font-Teko mr-4 font-semibold">
                  {vault.token.symbol}
                </span>
              </div>
            </div>
            <div className="relative my-2 flex items-center justify-end gap-2">
              {useZap ? null : <span>Not Enough Balance?</span>}

              <a
                onClick={() => setUseZap(!useZap)}
                className="border-gunmetal flex rounded-full border bg-[#671afc] px-2 py-0.5 text-[12px] text-nowrap text-white"
              >
                <span>Zap it</span>
                <span className="w-4">
                  <YellowBolt />
                </span>
              </a>
            </div>
            {useZap ? (
              <div>
                <div className="border-gunmetal mt-2 flex gap-1 rounded-xl border bg-white p-1 px-2">
                  <p className="border-gunmetal flex-1 rounded-xl border bg-[#671afc] p-2 py-1 text-center text-white">
                    {swapEstimate ? swapEstimate : 'Loading...'}
                  </p>
                  <div className="flex flex-1 justify-end">
                    <Select
                      onValueChange={(value) =>
                        setTokenIndex(parseFloat(value))
                      }
                      defaultValue={`${tokenIndex}`}
                    >
                      <SelectTrigger className="[&_*]:font-Teko !font-Teko [&_*]leading-loose w-28 border-none font-semibold shadow-none">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent className="bordrer-2 border-gunmetal flex-1">
                        {tokens.map((token, i) =>
                          token.symbol !== vault.token.symbol ? (
                            <SelectItem
                              className="[&_*]:font-Teko font-semibold"
                              key={token.symbol}
                              value={`${i}`}
                            >
                              <img
                                src={token.img}
                                alt="vault logo"
                                className="mr-2 inline-block h-6 w-6 rounded-full"
                              />
                              {token.symbol}
                            </SelectItem>
                          ) : null
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-1 mb-2 flex items-center justify-between px-1">
                  <p className="text-xs">
                    <strong className="mr-1 text-gray-700">Rate :</strong>
                    1Mon=5TMON
                  </p>
                  <p className="text-xs">
                    <strong className="mr-1 text-gray-700">Slippage :</strong>
                    {slippagePercent}%
                  </p>
                </div>
              </div>
            ) : null}

            <p className="font-Teko font-semibold">For</p>
            <div className="border-gunmetal font-Teko mt-2 flex items-center justify-center rounded-xl border p-3 text-center text-lg font-semibold">
              {quantity} {vault.title} Vaults NFTs
            </div>
            <div className="mt-4 flex items-center justify-center">
              <Button
                onClick={executeDeposit}
                className="bg-yellow font-Teko border-gunmetal border px-[20%] py-2 text-xl font-semibold text-black hover:bg-yellow-300"
                disabled={isJoinClosed}
              >
                {depositStatus}
              </Button>
            </div>
          </section>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
