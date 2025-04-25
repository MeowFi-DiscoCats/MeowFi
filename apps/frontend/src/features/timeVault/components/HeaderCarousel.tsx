import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function HeaderCarousel() {
  return (
    <Carousel
      className="my-auto h-full w-full flex-1 overflow-hidden rounded-l-2xl max-md:hidden"
      plugins={[Autoplay({ delay: 6000 })]}
      opts={{
        align: 'start',
        loop: true,
      }}
    >
      <CarouselContent>
        {[1, 2, 3].map((i) => (
          <CarouselItem key={i} className="relative h-full w-full">
            <div className="relative h-full w-full">
              <img src={`/images/banner${i}.svg`} alt={`banner ${i}`} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
