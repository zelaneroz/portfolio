import React from "react";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import Link from 'next/link';
import { AtSignIcon } from "./icons/at-sign-icon";
import { GithubIcon } from './icons/github-icon';
import { LinkedinIcon } from './icons/linkedin-icon';
import { XIcon } from './icons/x-icon';
import ArrowDown from "./ArrowDown";
import { InstagramIcon } from "./icons/instagram-icon";
import NewLanding from "./NewLanding";

export default function Hero() {
  return (
    <>
    <BackgroundGradientAnimation>
        <ArrowDown />
      <div className="w-full min-h-screen px-[clamp(1rem,6vw,6rem)] absolute z-50 -translate-y-15 inset-0 flex items-center justify-center text-white font-serif px-4 pointer-events-none text-3xl text-center lg:text-5xl">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/100 to-white/30">
           hi, I'm{' '}
              <span className="font-bold">Zee</span>.
              — welcome to my {''}
              <span className="italic border-b underline">little corner of the Internet</span>. part sandbox, part lab, part love letter.
        </p>
      </div>

{/*absolute bottom-10 inset-x-0 z-50 flex flex-col items-center justify-center space-y-4 text-white text-sm pointer-events-auto*/}
      <section className="absolute bottom-10 inset-x-0 z-50 flex space-x-4 items-center justify-center space-y-60 text-white text-sm opacity-70">
              <div>
                <p>More about me: </p>
                <div className="flex -ml-2">
                  <Link
                    href="https://www.linkedin.com/in/zelanespanto/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="linkedin"
                  >
                    <LinkedinIcon className="h-9 w-9" />
                  </Link>
                  
                  <Link
                    href="https://github.com/zelaneroz"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="github"
                  >
                    <GithubIcon className="h-9 w-9" />
                  </Link>
                  <Link
                    href="mailto:zeespanto@gmail.com"
                    aria-label="email"
                    rel="noreferrer"
                  >
                    <AtSignIcon className="h-9 w-9" />
                  </Link>
                  <Link
                    href="https://x.com/zelaneroz"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="linkedin"
                  >
                    <XIcon className="h-9 w-9" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/zelaneroz/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="linkedin"
                  >
                    <InstagramIcon className="h-9 w-9" />
                  </Link>
                </div>
              </div>
              <div className="h-14 border-l border-gray-300" />
              <div className="flex flex-wrap space-x-3 space-y-60 opacity-70">
                <Link href="#work" className="hover:underline">/work</Link>
                <Link href="#field-notes" className="hover:underline">/field notes</Link>
                <a
                  href="ZelanErozEspantoResume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >/resume</a>
                <Link href="#contact" className="hover:underline">/contact</Link>
              </div>
            </section>
    </BackgroundGradientAnimation>
    </>
  );
}
