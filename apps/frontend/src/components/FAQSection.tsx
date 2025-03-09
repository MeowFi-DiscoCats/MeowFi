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
          What are Crypto NFTs?
        </AccordionTrigger>
        <AccordionContent className="p-4">
          Crypto NFTs are unique digital assets built on blockchain technology.
          They combine smart contracts with innovative yield generation
          features, ensuring authenticity and unlocking new earning
          opportunities.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        className="bg-cream border-gunmetal rounded-lg border"
        value="item-2"
      >
        <AccordionTrigger className="text-md p-4 font-semibold">
          How do smart contracts power these NFTs?
        </AccordionTrigger>
        <AccordionContent className="p-4">
          Our smart contracts automate NFT transactions and manage key features
          like vault locking and yield distribution. This ensures secure,
          transparent, and trustless operations without manual intervention.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        className="bg-cream border-gunmetal rounded-lg border"
        value="item-3"
      >
        <AccordionTrigger className="text-md p-4 font-semibold">
          What is vault locking and how does it generate yield?
        </AccordionTrigger>
        <AccordionContent className="p-4">
          Vault locking is a process where you stake or lock your NFT in our
          secure contract. Once locked, your asset begins generating passive
          yield over time based on predefined smart contract algorithms.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        className="bg-cream border-gunmetal rounded-lg border"
        value="item-4"
      >
        <AccordionTrigger className="text-md p-4 font-semibold">
          How can I participate in the launch?
        </AccordionTrigger>
        <AccordionContent className="p-4">
          To participate, acquire one of our Crypto NFTs through our launch
          platform. After purchase, simply follow the instructions to lock your
          NFT in the vault and start earning yield automatically.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        className="bg-cream border-gunmetal rounded-lg border"
        value="item-5"
      >
        <AccordionTrigger className="text-md p-4 font-semibold">
          How can I track my earnings?
        </AccordionTrigger>
        <AccordionContent className="p-4">
          You can track your NFT’s yield in real-time via our dashboard, which
          updates as rewards accumulate. You can also check the underlying smart
          contract for transparent transaction records.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
