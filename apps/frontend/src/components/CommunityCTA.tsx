export default function CommunityCTA() {
  return (
    <div className="bg-cream border-gunmetal flex flex-col justify-evenly gap-2 rounded-md border p-4 text-center md:max-w-96">
      <img
        loading="lazy"
        className="mx-auto"
        width="250px"
        src="/images/catGroup.webp"
        alt="contact"
      />
      <h3 className="text-lg font-semibold">Do you have more questions?</h3>
      <p>
        End-to-end payments and financial management in a single solution. Meet
        the right platform to help realize.
      </p>
      <button className="font-Bubblegum border-gunmetal bg-yellow border p-3 hover:-hue-rotate-15">
        Join the Cats
      </button>
    </div>
  );
}
