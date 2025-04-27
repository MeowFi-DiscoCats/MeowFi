export default function FullySubsTag() {
  return (
    <>
      <div className="absolute -top-5.25 left-1/2 z-20 mt-0.5 flex w-[161px] -translate-x-1/2 scale-50 items-center justify-center gap-1 text-center text-sm text-white">
        Fully Subscribed
      </div>
      <svg
        width="161"
        height="45"
        viewBox="0 0 161 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-7 left-1/2 z-10 -translate-x-1/2 scale-50"
      >
        <g filter="url(#filter0_d_1028_215)">
          <path
            d="M146 0.5C151.799 0.5 156.5 5.20101 156.5 11V20C156.5 25.799 151.799 30.5 146 30.5H94.7207C92.4407 30.5 90.2363 31.3203 88.5107 32.8105L87.3604 33.8037C83.1973 37.3991 76.9649 37.1717 73.0752 33.2822C71.2939 31.5009 68.8775 30.5 66.3584 30.5H15C9.20101 30.5 4.5 25.799 4.5 20V11C4.5 5.20101 9.20101 0.5 15 0.5H146Z"
            fill="#66458C"
            stroke="#FFFDED"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_1028_215"
            x="0"
            y="0"
            width="161"
            height="44.857"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.341176 0 0 0 0 0.25098 0 0 0 0 0.807843 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1028_215"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1028_215"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
