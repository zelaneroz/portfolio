import Image from "next/image";
import Link from "next/link";


import { AtSignIcon } from "./icons/at-sign-icon";
import { GithubIcon } from "./icons/github-icon";
import { LinkedinIcon } from "./icons/linkedin-icon";

export default function About() {
  return (
    <section
      id="about"
      className="w-full bg-white text-black"
      style={{
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      <div className="mx-auto grid min-h-screen w-full max-w-[1280px] items-center gap-12 px-6 py-20 md:px-10 lg:grid-cols-[430px_1fr] lg:gap-24 lg:px-12">
        {/* Portrait */}
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[430px] overflow-hidden">
          <Image
            src="/images/main.jpg"
            alt="Zelan Espanto"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 430px"
            className="object-cover"
          />
        </div>

        {/* Right column */}
<div className="max-w-[720px]">
  {/* Contact links */}
  <div className="mb-10 flex flex-wrap items-center gap-x-10 gap-y-3 text-[14px]">
    <a
      href="mailto:zeespanto@gmail.com"
      className="flex items-center gap-2.5 transition-opacity hover:opacity-60"
      aria-label="Email Zelan Espanto"
    >
      <AtSignIcon className="h-9 w-9" />
      <span>zeespanto@gmail.com</span>
    </a>

    <a
      href="https://github.com/zelaneroz"
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2.5 transition-opacity hover:opacity-60"
      aria-label="Visit Zelan Espanto on GitHub"
    >
      <GithubIcon className="h-9 w-9" />
      <span>zelaneroz</span>
    </a>

    <a
      href="https://www.linkedin.com/in/zelanespanto"
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2.5 transition-opacity hover:opacity-60"
      aria-label="Visit Zelan Espanto on LinkedIn"
    >
      <LinkedinIcon className="h-9 w-9" />
      <span>zelanespanto</span>
    </a>
  </div>

  {/* About copy */}
  <div className="text-[16px] leading-[1.35] tracking-[-0.015em] sm:text-[13px] md:text-[15px] lg:text-[17px]">
    <div className="space-y-5">
      <p>Welcome to my corner of the internet.</p>

      <p>Mainly a work portfolio, partially a love letter.</p>

      <p>
        You can say my name as Zee / Zeh-lan / Zi-lan.
        <br />
        Fun fact: “Zelan Eroz” is an anagram of my parents’
        names.
      </p>

      <p>
        Working with and learning about{" "}
        <span className="font-bold text-[#d655c2]">
          AI Alignment (research &amp; applied systems)
        </span>{" "}
        and{" "}
        <span className="font-bold text-[#0038de]">
          Full Stack Development for Cloud Platforms.
        </span>
      </p>

      <p>
        I’m motivated by the challenge of becoming a more{" "}
        <strong>thoughtful</strong> and{" "}
        <strong>capable engineer</strong> every day. I believe
        that as tech grows, so should its accessibility and
        responsibility.
      </p>

      <p>
        Outside the codebase, I love experiencing new cultures
        through travel and meaningful conversations (apparently
        getting a good story out of a taxi driver is my
        specialty). I love to paint and go to art museums. I’m also getting back to writing lately!
      </p>

      <p>
        See what goes on in my brain{" "}
        <Link
          href="/brain"
          className="underline decoration-1 underline-offset-2 transition-opacity hover:opacity-60"
        >
          here
        </Link>
        .
      </p>
    </div>
  </div>
</div>

        
          
        </div>
    </section>
  );
}