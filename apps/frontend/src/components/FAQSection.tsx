import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQSection() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="flex w-full flex-1 flex-col justify-between gap-2 pb-[1px]"
    >
      <AccordionItem
        className="bg-cream border-gunmetal rounded-lg border"
        value="item-1"
      >
        <AccordionTrigger className="text-md p-4 font-semibold">
          What is Multi-Layer Yield?
        </AccordionTrigger>
        <AccordionContent className="p-4">
          Multi-layer yield refers to earning rewards from multiple sources
          simultaneously. With MeowFi, your NFT-backed assets generate yield not
          just from the underlying liquidity but also from lending/LP, bribes,
          emissions/incentives, airdrops, vault fees, and compounding
          strategies, which all flow into your liquid NFT to increase its
          backing ratio.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        className="bg-cream border-gunmetal rounded-lg border"
        value="item-2"
      >
        <AccordionTrigger className="text-md p-4 font-semibold">
          What is Liquid NFTs and how do they earn yield?
        </AccordionTrigger>
        <AccordionContent className="p-4">
          Liquid NFTs are NFTs backed by real assets/liquidity, allowing holders
          to stay liquid while earning multi-layered yield. In MeowFi, these
          NFTs represent locked assets that generate yield through mechanisms
          like bribes, vault fees, emissions etc. Unlike traditional NFTs, which
          are often illiquid, liquid NFTs can be traded or used as collateral
          while still accruing yield.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        className="bg-cream border-gunmetal rounded-lg border"
        value="item-3"
      >
        <AccordionTrigger className="text-md p-4 font-semibold">
          How and where can I use my liquid assets?
        </AccordionTrigger>
        <AccordionContent className="p-4">
          Your Liquid NFTs can be used in multiple ways: <br /> 1. Trade or Sell
          – Sell your NFT on secondary markets to exit early. <br /> 2. Borrow
          Against It– Use it as collateral to access liquidity without selling.
          (thoon) <br /> 3. Earn Yield – Continue accruing multi-layered rewards
          while holding. <br /> 4. Speculate on Airdrops – Buy undervalued NFTs
          to capture future incentives.
          <br />
          <br />
          These options ensure you stay flexible while maximizing returns on
          your locked assets.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        className="bg-cream border-gunmetal rounded-lg border"
        value="item-4"
      >
        <AccordionTrigger className="text-md p-4 font-semibold">
          Where does NFT comes in with the vaults?
        </AccordionTrigger>
        <AccordionContent className="p-4">
          NFTs in MeowFi serve as liquid representations of locked assets across
          our vaults. Instead of traditional staking or lock-ups, users receive
          Liquid NFTs that hold their allocation and goes up in backing, while
          earning multi-layered yield. These NFTs can be traded, used as
          collateral, or sold before TGE, providing flexibility while still
          benefiting from the underlying assets.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        className="bg-cream border-gunmetal rounded-lg border"
        value="item-5"
      >
        <AccordionTrigger className="text-md p-4 font-semibold">
          What are the types of vaults? Difference between Fixed and Flexible
          Time-Lock Vaults
        </AccordionTrigger>
        <AccordionContent className="p-4">
          MeowFi offers two types of vaults: Fixed Vaults and Flexible Vaults.
          Fixed Vaults provide higher yields in exchange for a set lock-in
          period with NFTs, making them ideal for those committed to maximizing
          returns. Flexible Vaults, on the other hand, keep liquidity open,
          allowing users to stay with Liquid with NFT while still earning yield.
          Both vault types leverage multi-layered yield strategies and bribe
          mechanisms to maximize rewards for holders.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
