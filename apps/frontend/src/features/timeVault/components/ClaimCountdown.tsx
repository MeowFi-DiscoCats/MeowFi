import { useEffect, useState } from 'react';

export default function ClaimCountDown({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    if (!targetDate) {
      setTime('Claim');
      return;
    }

    const target = new Date(targetDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTime('Claim');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime(`Claim Opens In: ${days}d:${hours}h:${minutes}m:${seconds}s`);
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return <>{time}</>;
}
