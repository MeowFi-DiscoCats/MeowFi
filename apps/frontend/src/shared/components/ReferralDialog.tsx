import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import InviteFolder from './svg/InviteFolder';
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppKitAccount } from '@reown/appkit/react';

const API = import.meta.env.VITE_API_URL;

async function fetchReferralCount(address: string): Promise<number> {
  const res = await fetch(`${API}/referral/count?address=${address}`);
  if (!res.ok) throw new Error('Failed to fetch count');
  const { count } = await res.json();
  return count;
}

async function postReferral(ref: string, address: string) {
  const res = await fetch(`${API}/referral/success`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refCode: ref, walletAddress: address }),
  });
  if (!res.ok) throw new Error('Failed to record referral');
  return res.json();
}

export default function ReferralDialog() {
  const { isConnected, address } = useAppKitAccount();
  const qc = useQueryClient();

  const [ref, setRef] = useState<string>('');
  const [created, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('referralCode');
    if (stored) {
      setRef(stored);
      setCreated(true);
    }
  }, []);

  const {
    data: count,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['referralCount', ref],
    queryFn: () => fetchReferralCount(address!),
    enabled: created && isConnected,
    staleTime: 60_000, // 1m
  });

  const mutation = useMutation({
    mutationFn: () => postReferral(ref, address!),
    onSuccess: () => {
      localStorage.setItem('referralCode', ref);
      setCreated(true);
      qc.invalidateQueries({ queryKey: ['referralCount', ref] });
      setError(null);
    },
    onError: () => {
      setError('Failed to create referral');
    },
  });

  const handleCreate = () => {
    if (!isConnected) {
      setError('Please connect your wallet');
      return;
    }
    if (ref.length < 5) {
      setError('Referral code must be at least 5 characters');
      return;
    }
    setRef(ref.toLowerCase());
    setError(null);
    mutation.mutate();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}?ref=${ref}`);
  };

  return (
    <Dialog>
      <DialogTrigger className="border-gunmetal bg-yellow font-Bubblegum relative z-10 mt-1 ml-auto flex items-center justify-center gap-2 rounded-lg border p-0.25 pl-2 font-thin max-sm:text-sm">
        <img width={20} src="/images/meowFi2.webp" alt="Meowfi" />
        Share your referral link
        <span className="border-gunmetal font-Bubblegum flex items-center justify-center gap-2 rounded-lg border bg-white px-2 py-0.5 font-thin">
          <InviteFolder />
          Refer
        </span>
      </DialogTrigger>

      <DialogContent className="bg-cream border-gunmetal !max-w-[400px] rounded-3xl border-2">
        {!created ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-Teko text-center text-3xl font-semibold tracking-wide">
                Create Referral
              </DialogTitle>
              <DialogDescription className="font-Teko my-0 text-center text-lg leading-5 tracking-wide text-black">
                Share your referral link, bring your frens in, and earn rewards
                along the way.
              </DialogDescription>
            </DialogHeader>
            <section className="flex flex-col">
              <p className="font-Teko font-semibold">Referral Code</p>
              <input
                type="text"
                value={ref}
                onChange={(e) => setRef(e.target.value.trim())}
                className="border-gunmetal w-full rounded-lg border bg-white p-2 font-semibold"
              />
              {error && <p className="font-Teko text-red-500">{error}</p>}
              <div className="mt-2 flex gap-2 px-4">
                <DialogClose className="border-gunmetal font-Teko flex w-full items-center justify-center rounded-lg border bg-white p-2 py-1 font-semibold">
                  Dismiss
                </DialogClose>
                <button
                  onClick={handleCreate}
                  className="border-gunmetal font-Teko bg-yellow flex w-full items-center justify-center rounded-lg border p-2 py-1 font-semibold hover:bg-amber-200"
                >
                  Create
                </button>
              </div>
            </section>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-Teko text-center text-3xl font-semibold tracking-wide">
                Referral Created
              </DialogTitle>
              <DialogDescription className="font-Teko my-0 text-center text-lg leading-5 tracking-wide text-black">
                You can now share your personalised referral link with your
                frens and start earning together.
              </DialogDescription>
            </DialogHeader>
            <section className="flex flex-col">
              <div className="border-gunmetal font-Teko mx-auto mb-4 flex w-full max-w-[200px] flex-col items-center justify-center gap-2 border bg-white p-2 font-semibold">
                <span className="font-Teko text-2xl">
                  {isLoading ? '...' : isError ? 'Error' : (count ?? 0)}
                </span>
                <span className="font-Teko">Your Referrals</span>
              </div>
              <div className="mt-2 flex gap-2 px-4">
                <DialogClose className="border-gunmetal font-Teko flex w-full items-center justify-center rounded-lg border bg-white p-2 py-1 font-semibold">
                  Dismiss
                </DialogClose>
                <button
                  onClick={handleCopy}
                  className="border-gunmetal font-Teko bg-yellow flex w-full items-center justify-center rounded-lg border p-2 py-1 font-semibold hover:bg-amber-200"
                >
                  Copy Link
                </button>
              </div>
            </section>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
