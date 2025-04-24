export default function Header() {
  return (
    <>
      <div className="bg-amber border-gunmetal -mx-6 mt-20 flex h-6 w-[calc(100%+48px)] items-center justify-between border-y px-1 max-md:-mx-4 max-md:w-[calc(100%+32px)]">
        <div className="inline-block aspect-square w-3 rounded-full border-2 border-white bg-black"></div>
        <div className="inline-block aspect-square w-3 rounded-full border-2 border-white bg-black"></div>
      </div>
      <div className="bg-cream -mx-6 flex h-6 w-[calc(100%+48px)] items-center justify-between px-1 max-md:-mx-4 max-md:w-[calc(100%+32px)]">
        <div className="inline-block aspect-square w-3 rounded-full border-2 border-black bg-white"></div>
        <div className="inline-block aspect-square w-3 rounded-full border-2 border-black bg-white"></div>
      </div>
      <div className="bg-amber border-gunmetal -mx-6 flex h-6 w-[calc(100%+48px)] items-center justify-between border-y px-1 max-md:-mx-4 max-md:w-[calc(100%+32px)]">
        <div className="inline-block aspect-square w-3 rounded-full border-2 border-white bg-black"></div>
        <div className="inline-block aspect-square w-3 rounded-full border-2 border-white bg-black"></div>
      </div>
      <div className="-mt-16 mb-12 flex justify-center">
        <div className="border-gunmetal bg-cream font-Bubblegum mx-auto border p-2 px-4 text-center text-3xl max-sm:text-xl">
          Auto Compounding Vaults
        </div>
      </div>
    </>
  );
}
