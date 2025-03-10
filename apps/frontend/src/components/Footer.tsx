import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function Footer() {
  return (
    <footer className="px-[3vw] py-6 max-[550px]:pb-24">
      <Carousel
        className="border-amber mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border-3"
        plugins={[Autoplay({ delay: 3000 })]}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          <CarouselItem className="bg-amber">
            <div className="relative h-[165px] max-md:h-24 max-lg:h-36 w-full overflow-hidden">
              <img
                loading="lazy"
                src="/images/banner1.webp"
                alt="banner"
                className="absolute h-full w-auto object-cover object-left"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="bg-amber">
            <div className="relative h-[165px] max-md:h-24 max-lg:h-36 w-full overflow-hidden">
              <img
                loading="lazy"
                src="/images/banner2.webp"
                alt="banner"
                className="absolute h-full w-auto object-cover object-left"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="bg-amber">
            <div className="relative h-[165px] max-md:h-24 max-lg:h-36 w-full overflow-hidden">
              <img
                loading="lazy"
                src="/images/banner3.webp"
                alt="banner"
                className="absolute h-full w-auto object-cover object-left"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </footer>
  );
}
