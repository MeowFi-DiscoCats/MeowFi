import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddBribe from './AddBribe';
import TrackBribe from './TrackBribe';

export default function BribeDialog() {
  return (
    <DialogContent className="bg-cream border-gunmetal overflow-hidden rounded-2xl p-0 sm:max-w-[550px] [&>button]:hidden">
      <DialogHeader className="hidden">
        <DialogTitle>Manual</DialogTitle>
        <DialogDescription>Bribe Dashboard</DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="add" className="font-Teko flex w-full">
        <TabsList className="h-12 w-full rounded-none border-b !border-black p-0">
          <TabsTrigger
            value="add"
            className="data-[state=active]:bg-yellow font-Teko rounded-none text-lg leading-relaxed font-semibold shadow-none"
          >
            Add Bribe
          </TabsTrigger>
          <TabsTrigger
            value="track"
            className="data-[state=active]:bg-yellow font-Teko rounded-none text-lg leading-relaxed font-semibold shadow-none"
          >
            Track Bribe
          </TabsTrigger>
        </TabsList>
        <AddBribe />
        <TrackBribe />
      </Tabs>
    </DialogContent>
  );
}
