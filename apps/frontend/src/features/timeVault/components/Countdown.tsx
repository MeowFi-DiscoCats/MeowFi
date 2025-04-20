import { useEffect, useState } from 'react';

export default function CountDown({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      if (!targetDate) {
        setTime('VAULT CLOSED');
        return;
      }

      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      let diff = target - now;

      if (diff <= 0) {
        setTime('VAULT CLOSED');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff %= 1000 * 60 * 60 * 24;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff %= 1000 * 60 * 60;
      const minutes = Math.floor(diff / (1000 * 60));
      diff %= 1000 * 60;
      const seconds = Math.floor(diff / 1000);

      setTime(`Vault Closes In: ${days}d:${hours}h:${minutes}m:${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return <>{time}</>;
}
