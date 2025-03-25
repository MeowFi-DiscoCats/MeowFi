export default function CommunityCTA() {
  return (
    <div className="bg-cream border-gunmetal flex flex-col rounded-md border p-4 text-center md:max-w-96">
      <div className="flex flex-1 flex-col justify-evenly gap-2">
        <img
          loading="lazy"
          className="mx-auto"
          width="250px"
          src="/images/catGroup.webp"
          alt="contact"
        />
        <p>
          We turn locked assets into liquid NFTs, unlocking multi-layered yield
          through Bribe Mechanisms.
        </p>
        <p className="text-xl font-bold">Still curious, kitty?</p>
      </div>
      <a
        href="https://discord.com/invite/RZWntTWFrb"
        className="font-Bubblegum border-gunmetal bg-yellow border p-3 hover:-hue-rotate-15"
      >
        Join the Cats
      </a>
    </div>
  );
}
