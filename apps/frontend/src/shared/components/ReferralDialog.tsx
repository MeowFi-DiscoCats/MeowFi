import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import InviteFolder from './svg/InviteFolder';
import { useEffect, useState } from 'react';

export default function ReferralDialog() {
  const [ref, setRef] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState(false);

  const handleCreate = () => {
    if (ref == '') {
      setError('Please enter a referral Code');
      return;
    }
    if (ref.length < 5) {
      setError('Referral code must be at least 5 characters long');
      return;
    }
    setError(null);
    localStorage.setItem('referralCode', ref);
    setCreated(true);
  };

  const handleCopy = () => {
    const refCode = localStorage.getItem('referralCode');
    if (refCode)
      navigator.clipboard.writeText(`https://app.meowfi.xyz?ref=${refCode}`);
  };

  useEffect(() => {
    const refCode = localStorage.getItem('referralCode');
    if (refCode) {
      setCreated(true);
    }
  }, []);

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
              <p className="font-Teko font-semibold">Referral</p>
              <input
                type="text"
                onChange={(e) => setRef(e.target.value)}
                className="border-gunmetal w-full rounded-lg border bg-white p-2 font-semibold"
              />
              {error && <p className="font-Teko text-red-500">{error}</p>}
              <div className="mt-2 flex gap-2 px-4">
                <DialogTrigger className="border-gunmetal font-Teko flex w-full items-center justify-center rounded-lg border bg-white p-2 py-1 font-semibold">
                  Dismiss
                </DialogTrigger>
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
                <span className="font-Teko">0</span>
                <span className="font-Teko">Your Referral</span>
              </div>
              <div className="mt-2 flex gap-2 px-4">
                <DialogTrigger className="border-gunmetal font-Teko flex w-full items-center justify-center rounded-lg border bg-white p-2 py-1 font-semibold">
                  Dismiss
                </DialogTrigger>
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
