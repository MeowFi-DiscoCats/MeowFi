import { ethers } from "ethers";

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function formatBalance(userBalance: string,decimal:number): string {
  return ethers.formatUnits(userBalance,decimal);
}

export function parseDateTime(dateTimeValue: string): Date | null {
  if (!dateTimeValue) {
    console.warn('Empty date string received');
    return null;
  }
  if (dateTimeValue.includes('T')) {
    return new Date(dateTimeValue);
  }
  return new Date(`${dateTimeValue}T00:00`);
}

export function getTimeRemaining(dateTimeValue: string): CountdownValues {
  const parsedDate = parseDateTime(dateTimeValue);
  if (parsedDate) {
    const currentDate = new Date();
    const timeDifference = parsedDate.getTime() - currentDate.getTime();

    if (timeDifference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
}

export function formatCountdown(timeValues: CountdownValues): string {
  return `${timeValues.days}d:${timeValues.hours}h:${timeValues.minutes}m:${timeValues.seconds}s`;
}
