import Image from "next/image";
import React, { useState } from "react";
import gokulImg from "../assets/images/gokulHome.png";
import logo from "../assets/images/b.png";
import { FaCode } from "react-icons/fa";
import { MyStackList } from "@/utils/Skills";
import { backgrounds } from "@/styles/backgrounds";
import SocialLinks from "@/components/SocialLinks";

export default function AboutMe({
  triggerScroll,
}: {
  triggerScroll: Function;
}) {
  const [imageHover, setImageHover] = useState(false);

  const getBackground = (index: number) => {
    return backgrounds[index % backgrounds.length];
  };

  return (
    <section className="px-10 py-8 flex flex-col items-center gap-8 text-white bg-black">
      <div
        onMouseEnter={() => setImageHover(true)}
        onMouseLeave={() => setImageHover(false)}
        className="relative flex items-center justify-center  w-full "
      >
        <span
          className={`absolute left-1/2 transform -translate-x-full transition-all duration-500 ease-in-out text-left text-sm md:text-base lg:text-lg font-medium ${
            imageHover ? "opacity-100" : "opacity-0"
          }`}
          style={{
            maxWidth: "400px",
          }}
        >
          {`As a seasoned software developer, I specialize in creating dynamic web & mobile applications.
          I've collaborated with clients from diverse backgrounds.
          I'm interested in building solutions and teams.
          Feel free to connect :)`}
        </span>
        {/* Image */}
        <Image
          alt="gokul"
          priority
          src={imageHover ? logo : gokulImg}
          className={` cursor-pointer rounded-full object-cover object-center h-60 w-60 bg-[#c4bfb9] transition-transform duration-500 ease-in-out  ${
            imageHover
              ? "translate-x-2/3 opacity-80"
              : "translate-x-0 opacity-100"
          }`}

          // onClick={() => setImageHover(!imageHover)}
        />
      </div>
      <div className="py-2 text-start text-3xl md:text-8xl sm:text-2xl font-extrabold text-white">
        I&apos;m
        <span>&nbsp;</span>
        <span className="text-start text-3xl md:text-8xl sm:text-2xl font-extrabold purplePinkGradient">
          Gokul Anand
        </span>
      </div>
      <SocialLinks />
      <h4 className="py-4 text-start text-xl text-white font-normal flex items-center gap-1">
        <span className="font-semibold">Software Developer</span>{" "}
        <FaCode fontSize={20} />
      </h4>
      <div>
        <div className="flex flex-row gap-4 py-2 flex-wrap justify-center items-center">
          {MyStackList.map((item, ind) => (
            <p
              key={ind}
              className="rounded-full px-2 py-1  flex justify-center items-center text-white font-semibold hover:scale-125 transition-all ease-in-out cursor-default"
              style={{
                background: getBackground(item.length),
              }}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center px-2.5 py-2 mt-4 rounded-lg bg-blue-600 cursor-pointer motion-safe:animate-bounce hover:animate-none">
        <button
          onClick={() => triggerScroll()}
          className="text-white font-semibold text-ellipsis truncate"
        >
          View my works 👇
        </button>
      </div>
    </section>
  );
}
