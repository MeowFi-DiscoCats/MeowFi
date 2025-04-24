import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import posthog from 'posthog-js';
import { useEffect, useState } from 'react';
import InviteFolder from './svg/InviteFolder';

export default function ReferralDialog() {
  const [ref, setRef] = useState<string | null>(null);

  useEffect(() => {
    const fetchedRef = posthog.get_property('ref');
    setRef(fetchedRef);
  }, [setRef]);

  return (
    <Dialog>
      <DialogTrigger className="border-gunmetal bg-yellow font-Bubblegum relative z-10 mt-1 ml-auto flex items-center justify-center gap-2 rounded-lg border p-0.25 pl-2 font-thin">
        <img width={20} src="/images/meowFi2.webp" alt="Meowfi" />
        Share your referral link
        <span className="border-gunmetal font-Bubblegum flex items-center justify-center gap-2 rounded-lg border bg-white px-2 py-0.5 font-thin">
          <InviteFolder />
          Refer
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Referral</DialogTitle>
          <DialogDescription>
            You can refer your friends to earn rewards. Share your referral link
          </DialogDescription>
        </DialogHeader>
        <section>{ref ? <h2>Your Referral: {ref}</h2> : null}</section>
      </DialogContent>
    </Dialog>
  );
}
