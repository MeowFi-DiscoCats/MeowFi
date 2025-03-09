import mongoose, { Schema } from "mongoose";

export interface IVault {
  title: string;
  img: string;
  lockedInPeriod: number;
  APR: number;
  type: "fixed" | "flexible";
  earnings: number;
  proxyAddress: string;
  tokenAddress: string;
  AirdropIncentivised: number;
  totalSupply: number;
  availableSupply: number;
  joinInPeriod: string;
  claimInPeriod: string;
  price: number;
  yieldValue: number;
  backingRatio: number;
  backingPercentage: number;
  tokenSymbol: string;
  NFTAddress: string;
  NFTLimit: number;
}

const vaultSchema = new Schema<IVault>({
  title: { type: String, required: true },
  img: { type: String, required: true },
  lockedInPeriod: { type: Number, required: true },
  APR: { type: Number, required: true },
  type: { type: String, required: true },
  earnings: { type: Number, required: true },
  proxyAddress: { type: String, required: true },
  tokenAddress: { type: String, required: true },
  AirdropIncentivised: { type: Number, required: true },
  totalSupply: { type: Number, required: true },
  availableSupply: { type: Number, required: true },
  joinInPeriod: { type: String, required: true },
  claimInPeriod: { type: String, required: true },
  price: { type: Number, required: true },
  yieldValue: { type: Number, required: true },
  backingRatio: { type: Number, required: true },
  backingPercentage: { type: Number, required: true },
  tokenSymbol: { type: String, required: true },
  NFTAddress: { type: String, required: true },
  NFTLimit: { type: Number, required: true },
});

const Vault = mongoose.model<IVault>("Vault", vaultSchema);

export default Vault;
