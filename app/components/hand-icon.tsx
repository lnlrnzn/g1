export function HandIcon({ index }: { index: number }) {
  
  // Tool illustrations SVG paths for each slash
  const illustrations = [
    // Tool 1 - Pen/stylus
    {
      toolPath: "M15,40 L35,40 C40,50 45,100 35,140 M15,40 C25,60 30,100 20,140",
      handPath: "M32,80 C35,85 38,90 36,100 M25,75 C22,80 20,90 25,100 M40,85 C42,90 42,95 38,105",
    },
    // Tool 2 - Cup/container
    {
      toolPath: "M15,50 L25,40 L45,40 L35,50 M15,50 C15,90 15,120 25,150 M35,50 C35,90 35,120 25,150",
      handPath: "M20,70 C15,80 12,90 18,100 M32,75 C35,85 38,95 34,105",
    },
    // Tool 3 - Hammer/tool
    {
      toolPath: "M20,40 L40,40 L45,50 L15,50 L20,40 M30,50 L30,120 C30,130 25,140 20,150",
      handPath: "M20,80 C15,85 12,95 18,105 M40,85 C45,90 47,100 40,110",
    },
    // Tool 4 - Coin/circular object
    {
      toolPath: "M30,60 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0 M30,60 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 M33,53 L37,49",
      handPath: "M15,90 C10,100 10,110 15,120 M45,90 C50,100 50,110 45,120 M30,130 C25,140 25,150 30,160",
    },
  ]

  const selected = illustrations[index]

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 180" className="w-full h-full">
      {/* Tool illustration */}
      <path
        d={selected.toolPath}
        fill="none"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Hand illustration */}
      <path
        d={selected.handPath}
        fill="none"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

