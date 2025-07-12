export default function Navbar() {
  return (
    <nav className="w-full h-[60px] relative">
      {/* Mobile */}
      <div className="flex md:hidden justify-between w-full h-full items-center text-[clamp(0.85rem,4vw,1rem)] text-[#4b4b4b]">
        <span>about</span>
        <span>work</span>
        <span>resume</span>
        <span>contact</span>
      </div>

      {/* Desktop */}
      <div className="hidden md:block w-full h-full relative">
        <div className="absolute top-[clamp(0.75rem,2.2vh,1.5rem)] left-[11.64%] text-[clamp(15px,1.3vw,18px)] text-[#4b4b4b]">
          about
        </div>
        <div className="absolute top-[clamp(0.75rem,2.2vh,1.5rem)] left-[31.09%] text-[clamp(15px,1.3vw,18px)] text-[#4b4b4b]">
          work
        </div>
        <div className="absolute top-[clamp(0.75rem,2.2vh,1.5rem)] left-[50.55%] text-[clamp(15px,1.3vw,18px)] text-[#4b4b4b]">
          resume
        </div>
        <div className="absolute top-[clamp(0.75rem,2.2vh,1.5rem)] left-[70%] text-[clamp(15px,1.3vw,18px)] text-[#4b4b4b]">
          contact
        </div>
      </div>
    </nav>
  );
}
