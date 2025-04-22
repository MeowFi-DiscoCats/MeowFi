import { useEffect, useState } from 'react';

interface CountDownProps {
  preJoinDate: string;
  joinDate: string;
}

export default function CountDown({ preJoinDate, joinDate }: CountDownProps) {
  const [time, setTime] = useState('VAULT CLOSED');

  useEffect(() => {
    const formatTimer = (ms: number, label: string) => {
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));
      ms %= 1000 * 60 * 60 * 24;
      const hours = Math.floor(ms / (1000 * 60 * 60));
      ms %= 1000 * 60 * 60;
      const minutes = Math.floor(ms / (1000 * 60));
      ms %= 1000 * 60;
      const seconds = Math.floor(ms / 1000);
      return `${label}: ${days}d:${hours}h:${minutes}m:${seconds}s`;
    };

    const tick = () => {
      const now = Date.now();

      // Pre‑join period: countdown to vault open
      if (preJoinDate) {
        const start = new Date(preJoinDate).getTime();
        if (now < start) {
          setTime(formatTimer(start - now, 'Vault Opens In'));
          return;
        }
      }

      // Join period: countdown to vault close
      if (joinDate) {
        const end = new Date(joinDate).getTime();
        if (now < end) {
          setTime(formatTimer(end - now, 'Vault Closes In'));
          return;
        }
      }

      // Post‑join or invalid dates
      setTime('VAULT CLOSED');
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [preJoinDate, joinDate]);

  return time;
}
