import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center md:justify-between gap-[clamp(2rem,6vw,5rem)] w-full flex-grow justify-center">
    {/*<section className="flex flex-col md:flex-row items-center md:justify-between gap-[clamp(2rem,6vw,5rem)] py-[clamp(3rem,6vh,6rem)] w-full">*/}
      {/* Name */}
      <div className="pl-[5%] text-[clamp(6rem,8vw,4.5rem)] font-black leading-tight space-y-2 text-center md:text-left">
        <div>ZELAN</div>
        <div>EROZ</div>
        <div>ESPANTO</div>
      </div>

      {/* Image */}
      <Image
        src="/zelan.jpg"
        alt="Zelan"
        width={200}
        height={200}
        className="rounded-[30px] object-cover w-[clamp(300px,40vw,300px)] h-auto"
      />
    </section>
  );
}
