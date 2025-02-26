import Image from "next/image";
import React, { useState } from "react";
import gokulImg from "../assets/images/gokulHome.png";
import logo from "../assets/images/b.png";
import { FaCode } from "react-icons/fa";
import { MyStackList } from "@/utils/Skills";
import { backgrounds } from "@/styles/backgrounds";
import SocialLinks from "@/components/SocialLinks";
import { FaUpwork } from "react-icons/fa6";
import { GoOrganization } from "react-icons/go";

const ExperienceItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <p className="mt-4 text-lg font-medium">
    <span className="text-[#ee009f] font-semibold">{title}:&nbsp;</span>
    {description}
  </p>
);

export default function AboutMe({
  triggerScroll,
}: {
  triggerScroll: Function;
}) {
  const [imageHover, setImageHover] = useState(false);

  return (
    <section className="px-10 py-8 flex flex-col items-center gap-8 text-white bg-black">
      {/* Profile Image & Hover Text */}
      <div
        onMouseEnter={() => setImageHover(true)}
        onMouseLeave={() => setImageHover(false)}
        className="relative flex items-center justify-center w-full"
      >
        <span
          className={`absolute left-1/2 transform -translate-x-full transition-opacity duration-500 ease-in-out text-left text-sm md:text-base lg:text-lg font-medium ${
            imageHover ? "opacity-100" : "opacity-0"
          } max-w-[400px]`}
        >
          {`As a seasoned software developer, I specialize in creating dynamic web & mobile applications.
          I've collaborated with clients from diverse backgrounds.
          I'm interested in building solutions and teams.
          Feel free to connect :)`}
        </span>

        <Image
          alt="Gokul Anand"
          priority
          src={imageHover ? logo : gokulImg}
          className={`cursor-pointer rounded-full object-cover h-60 w-60 bg-[#c4bfb9] transition-transform duration-500 ease-in-out ${
            imageHover
              ? "translate-x-2/3 opacity-80"
              : "translate-x-0 opacity-100"
          }`}
        />
      </div>

      {/* Name */}
      <h2
        onMouseEnter={() => setImageHover(true)}
        onMouseLeave={() => setImageHover(false)}
        className="text-3xl md:text-8xl sm:text-2xl font-extrabold text-white cursor-pointer "
      >
        I&apos;m&nbsp;
        <span className="purplePinkGradient">Gokul Anand</span>
      </h2>

      {/* Social Links */}
      <SocialLinks />

      {/* Job Title */}
      <h4 className="py-4 text-xl font-normal flex items-center gap-1">
        <span className="font-semibold">Software Developer</span>{" "}
        <FaCode fontSize={20} />
      </h4>

      {/* Tech Stack */}
      <div className="flex flex-wrap justify-center items-center gap-4 py-2">
        {MyStackList.map((item, ind) => (
          <p
            key={ind}
            className="rounded-full px-2 py-1 text-white font-semibold hover:scale-125 transition-transform cursor-default"
            style={{
              background: backgrounds[item.length % backgrounds.length],
            }}
          >
            {item}
          </p>
        ))}
      </div>

      {/* Professional Experience */}
      <div className="w-full">
        <h1 className="flex items-center gap-2 font-bold text-3xl">
          <GoOrganization />
          Professional Experience
        </h1>
        <h3 className="mt-4 font-semibold text-xl mb-4 underline">
          Sirpi Products and Services
        </h3>
        <p className="text-lg font-medium">
          I joined Sirpi in January 2023. The initial days were very important
          for me, as I was learning a lot as a developer, and working with
          diverse teams helped me develop my soft skills. Since then, I have
          contributed to multiple projects and gained valuable experience from
          them.
        </p>
        <p className="mt-4 text-lg font-medium">
          The projects I worked on were data-driven solutions. Some of the major
          projects that I contributed to are:
        </p>

        <ExperienceItem
          title="Vehicle Evaluation Mobile Application for Refurbished Automotive Providers"
          description="Developed a hybrid (offline + online) vehicle evaluation app to streamline assessments with video and audio recording, and real-time synchronization. Took full responsibility for the frontend using React Native, integrating secure authentication, media handling, and dynamic form validations."
        />

        <ExperienceItem
          title="GIS & Temporal Data Visualization Web Application for a Data Exchange Entity"
          description="Collaborated with a team of three developers to build an advanced data visualization app, enabling geospatial and temporal data management. Developed a React Canvas Playground as a micro-frontend within an Angular app, enhancing interactive mapping and data visualization."
        />
      </div>
      <p className="text-lg font-medium">
        With two years at this company, I have gained experience in frontend
        development and taking ownership of key project components. I have
        collaborated closely with teams to build scalable and interactive
        applications that enhance data visualization and digital transformation.
        Additionally, I have contributed to the hiring process, assisting in
        interviews to onboard talented developers for new projects.
      </p>
      {/* Call to Action */}
      <button
        onClick={() => triggerScroll()}
        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition-all animate-bounce hover:animate-none"
      >
        Take a look at my works
      </button>
    </section>
  );
}
