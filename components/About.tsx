"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function About() {
  const ref = useRef(null);
  const typewriterRef = useRef(null);
  const isInView = useInView(ref, { once: true });
  const isTypewriterInView = useInView(typewriterRef, { once: true, margin: "-100px" });
  
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "The world is my classroom, and curiosity is the teacher I trust most. Every person, project, and place has taught me something—so I try to build with purpose, empathy, and wonder.\n\nI study Computer Science and Math at Case Western Reserve, where I work across research, teaching, and tech for social good.\n\nWhat drives me: real-world impact, a global lens, and stories worth telling.";
  
  useEffect(() => {
    if (!isTypewriterInView) return;
    
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 7); // 3x faster typing speed
    
    return () => clearInterval(timer);
  }, [isTypewriterInView]);

  // Replace these paths with your actual image paths
  const favoriteImages = [
    { src: "/images/favs/1.webp", link: "https://www.goodreads.com/book/show/485894.The_Metamorphosis" },
    { src: "/images/favs/2.webp", link: "https://www.imdb.com/title/tt6751668/" },
    { src: "/images/favs/3.jpg", link: "https://open.spotify.com/album/1vz94WpXDVYIEGja8cjFNa" },
    { src: "/images/favs/4.webp", link: "https://open.spotify.com/album/3mH6qwIy9crq0I9YQbOuDf"},
    { src: "/images/favs/5.webp", link: "https://philippinefolklifemuseum.org/portfolio-items/spoliarium/" },
    { src: "/images/favs/6.webp", link: "https://www.criterion.com/films/29221-manila-in-the-claws-of-light?srsltid=AfmBOor1cLJ0qpPS29qunKN47BkI5SOICL20ba1FLwd2S8vs3Q1tRl2l" },
    { src: "/images/favs/7.webp", link: "https://open.spotify.com/album/0ETFjACtuP2ADo6LFhL6HN7" },
    { src: "/images/favs/8.webp", link: "hiddenbrain.org" },
    { src: "/images/favs/9.webp", link: "https://panlasangpinoy.com/filipino-food-congee-goto-recipe/" },
  ];

  return (
    <motion.section
      id="about"
      ref={ref}
      className="w-full min-h-screen bg-white px-[clamp(1rem,6vw,6rem)] py-[clamp(2rem,6vh,4rem)] flex flex-col lg:flex-row items-start justify-between gap-8"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Left Column: Text */}
      <div className="flex flex-col max-w-[32ch] z-10">
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-[clamp(3rem,8vw,5.625rem)] font-bold text-[#6c00a2] leading-none">
            Z
          </span>
          <span className="text-[clamp(2rem,6vw,5.625rem)] font-sans-serif text-black leading-none">
            z
          </span>
        </div>
        
        <div ref={typewriterRef} className="text-[clamp(1rem,1.5vw,1.5rem)] font-light leading-snug text-black mb-6">
          {displayedText.split('\n\n').map((paragraph, i) => (
            <p key={i} className={i < 2 ? "mb-6" : ""}>
              {paragraph}
            </p>
          ))}
          <span 
            className="inline-block text-[#6c00a2] ml-1 animate-pulse" 
            style={{ opacity: displayedText.length === fullText.length ? 0 : 1 }}
          >
            ✦
          </span>
        </div>
      </div>

      {/* Middle Image */}
      <div className="flex justify-center lg:justify-center w-full max-w-[clamp(300px,32vw,425px)]">
        <Image
          src="/images/about/zelan-doodle.jpg"
          alt="Zelan"
          width={425}
          height={635}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Right Column: some favs */}
      <div className="flex flex-col items-start gap-4">
        <p className="text-[clamp(1rem,1.5vw,1.25rem)] font-light">
          some favs
        </p>

        {/* Matrix Grid of Favorites */}
        <div className="grid grid-cols-3 gap-2 w-[clamp(180px,20vw,280px)]">
          {favoriteImages.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 border border-gray-200 cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <Image
                src={item.src}
                alt={`Favorite ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 60px, 90px"
              />
            </motion.a>
          ))}
        </div>

        {/* Spotify Embed */}
        <div className="w-full max-w-[clamp(250px,20vw,350px)] mt-2">
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/0XeXBvpnVnCxzm65fQF84y?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </motion.section>
  );
}