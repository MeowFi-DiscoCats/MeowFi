import CatEar from '@/components/svg/CatEar';
import VaultHeader from './VaultHeader';
// import { cardData } from './../lib/data.ts';
import VaultCard from './VaultCard.tsx';
import { useAppKitAccount } from '@reown/appkit/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { backendApi } from '@/lib/web3Config.ts';
import { VaultData } from '@/lib/data.ts';

//   {
//     title: 'Breadrome Vault',
//     image: '/images/blackCard.webp',
//     address:proxyContractAddress,
//     tokenAddress:usdcContractAddress,
//     stats: {
//       earnings: '14%',
//       newAPR: '0.5%',
//       lockedInPeriod: '30 days',
//     },
//     total: '1000',
//     price: '$100',
//   },
  // {
  //   title: 'Breadrome Vault',
  //   image: '/images/whiteCard.webp',
  //   stats: {
  //     earnings: '14%',
  //     newAPR: '0.5%',
  //     lockedInPeriod: '30 days',
  //   },
  //   total: '14',
  //   price: '$100',
  // },
  // {
  //   title: 'Berafrome Vault',
  //   image: '/images/blackCard.webp',
  //   stats: {
  //     earnings: '14%',
  //     newAPR: '0.5%',
  //     lockedInPeriod: '30 days',
  //   },
  //   total: '11',
  //   price: '$100',
  // },
// ];





//


export default function VaultGrid() {
  const { address, isConnected } = useAppKitAccount()
  // const { walletProvider }: { walletProvider: any } =useAppKitProvider("eip155");
  const [cardData,setCardData]=useState<VaultData[]>([])

  useEffect(()=>{
    async function code() {
      //first all vaults address will be fetch via backkend
      const dbData:any=await axios.get(`${backendApi}vaults/`)
      console.log(dbData.data)
      setCardData(dbData.data)
      // const provider = new JsonRpcProvider(alchemyUrl);
      

       
    }
    code()

  },[address, isConnected])
  return (
    <section className="px-[3vw] py-10 pt-20 max-[550px]:pt-10">
      <div className="bg-cream border-saffron relative mx-auto max-w-[1100px] rounded-2xl border-4 p-6 max-md:px-4 max-sm:rounded-none">
        <img
          width="100px"
          className="absolute -top-7 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 transform"
          src="/images/welcomeCat.webp"
          alt="Welcome Cat"
        />
        <div className="absolute -top-10 left-[10%] -z-10 scale-x-[-1] transform">
          <CatEar />
        </div>
        <div className="transform-z-10 absolute -top-10 right-[10%] -z-10">
          <CatEar />
        </div>
        <VaultHeader />
        <div className="flex flex-wrap justify-center gap-8 max-lg:gap-4">
          {cardData &&cardData.map((card, index) => (
            <VaultCard {...card} key={index} />
          ))}
          {/* {cardData.map((card, index) => (
            <VaultCard {...card} key={index} />
          ))} */}
        </div>
      </div>
    </section>
  );
}
