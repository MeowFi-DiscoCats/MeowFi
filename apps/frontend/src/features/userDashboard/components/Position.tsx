import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function Position() {
  return (
    <Tabs defaultValue="bribe" className="font-Teko flex">
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <h2 className="font-Bubblegum text-2xl">Your Positon</h2>
        <TabsList className="flex h-auto flex-wrap rounded-none p-0">
          <TabsTrigger
            value="bribe"
            className="data-[state=active]:bg-yellow font-Teko border-gunmetal flex-1 rounded-none border px-4 leading-relaxed font-semibold shadow-none max-sm:text-sm"
          >
            Bribe Vaults
          </TabsTrigger>
          <TabsTrigger
            value="auto"
            className="data-[state=active]:bg-yellow border-gunmetal font-Teko flex-1 rounded-none px-4 leading-relaxed font-semibold shadow-none max-sm:text-sm"
          >
            Auto Compounding Vaults
          </TabsTrigger>
          <TabsTrigger
            value="aggregator"
            className="data-[state=active]:bg-yellow font-Teko border-gunmetal flex-1 rounded-none border px-4 leading-relaxed font-semibold shadow-none max-sm:text-sm"
          >
            Yield Aggregator
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="bribe"> Bribe Vaults</TabsContent>
      <TabsContent value="auto">Auto Compounding</TabsContent>
      <TabsContent value="aggregator">Aggregator</TabsContent>
      <div className="flex flex-col items-center justify-center">
        <img
          src="/images/sleepyCat.webp"
          alt="position"
          className="mt-4 w-36"
        />
        <p className="font-Bubblegum text-lg">No asset found</p>
      </div>
    </Tabs>
  );
}
