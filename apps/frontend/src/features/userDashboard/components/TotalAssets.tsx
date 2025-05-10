export default function TotalAssets() {
  return (
    <div>
      <div className="flex">
        <p className="border-gunmetal flex flex-col rounded-xl border bg-white p-4 px-8 text-center">
          <span className="text-xl">$0</span>
          <span className="font-Bubblegum text-2xl">Total Assets</span>
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        <p className="bg-gunmetal flex flex-1 flex-col rounded-xl p-4 px-6 text-center text-white">
          <span className="font-Teko">Added Liquidity</span>
          <span>$183.0</span>
        </p>
        <p className="bg-gunmetal flex flex-1 flex-col rounded-xl p-4 px-6 text-center text-white">
          <span className="font-Teko">Liquid Nft</span>
          <span>10</span>
        </p>
        <p className="bg-gunmetal flex flex-1 flex-col rounded-xl p-4 px-6 text-center text-white">
          <span className="font-Teko">Yield Generated</span>
          <span>$13.8</span>
        </p>
        <p className="bg-gunmetal flex flex-1 flex-col rounded-xl p-4 px-6 text-center text-white">
          <span className="font-Teko">Lend & Borrowed</span>
          <span>-</span>
        </p>
      </div>
    </div>
  );
}
