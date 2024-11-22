import Footer from "@/layouts/Footer";
import AboutMe from "@/layouts/AboutMe";
import Works from "@/layouts/Works";
import React, { useRef } from "react";
import PokemonBored from "@/layouts/PokemonBored";

export default function index() {
  const scrollRef = useRef<null | HTMLDivElement>(null);

  const triggerScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <main className="bg-black">
      <AboutMe triggerScroll={triggerScroll} />
      <Works scrollRef={scrollRef} />
      <PokemonBored />
      <Footer />
    </main>
  );
}
