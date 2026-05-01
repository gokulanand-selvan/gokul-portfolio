import Image from "next/image";
import React, { useEffect, useState } from "react";
import gokulImg from "../assets/images/gokulHome.png";
import logo from "../assets/images/b.png";
import { FaCode } from "react-icons/fa";
import { MyStackList } from "@/utils/Skills";
import { backgrounds } from "@/styles/backgrounds";
import SocialLinks from "@/components/SocialLinks";
import { GoOrganization } from "react-icons/go";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ExperienceItem = ({
  title,
  description,
}: {
  title: string;
  description: React.ReactNode;
}) => (
  <p className="mt-4 text-lg font-medium">
    <span className="text-[#ee009f] font-semibold">{title}:&nbsp;</span>
    {description}
  </p>
);

const techHighlights: Record<string, string> = {
  "React Hook Form": "text-[#38bdf8]",
  "Redux Toolkit": "text-[#38bdf8]",
  "React Native": "text-[#38bdf8]",
  "Node.js": "text-[#38bdf8]",
  "Vitest": "text-[#38bdf8]",
  "React": "text-[#38bdf8]",
  ".NET": "text-[#38bdf8]",
  "APIs": "text-[#38bdf8]",
  "GIS": "text-[#38bdf8]",
  "frontend": "text-[#38bdf8]",
};

const techHighlightRegex = new RegExp(
  `(${Object.keys(techHighlights)
    .sort((a, b) => b.length - a.length)
    .map((tech) => tech.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})`,
  "gi"
);

const getTechHighlightClass = (value: string) => {
  const techName = Object.keys(techHighlights).find(
    (tech) => tech.toLowerCase() === value.toLowerCase()
  );

  return techName ? techHighlights[techName] : "";
};

const highlightTechnologies = (text: string) =>
  text.split(techHighlightRegex).map((part, index) => {
    const highlightClass = getTechHighlightClass(part);

    if (!highlightClass) {
      return part;
    }

    return (
      <span key={`${part}-${index}`} className={`${highlightClass} font-bold`}>
        {part}
      </span>
    );
  });

const professionalExperiences = [
  {
    company: "SPAN Technology Services",
    duration: "Aug 2025 - till date",
    intro:
      "I joined SPAN Technology Services as a Software Engineer, where I worked on building a tax filing web application focused on simplifying complex digital workflows.",
    summary:
      "This phase of my career helped me move deeper into building form-heavy applications, where accuracy, performance, and scalability are critical. I worked on designing systems that handle dynamic user inputs, validations, and structured data submission. The major project I worked on is:",
    projects: [
      {
        title: "Tax Filing Web Application for Digital Form Processing",
        description:
          "Developed a dynamic web application to handle complex tax filing workflows with multiple forms, conditional fields, and real-time validations. Took responsibility for building the frontend using React, focusing on creating reusable and scalable form components. Implemented advanced form handling using React Hook Form, ensuring accurate data validation and smooth user interaction. Worked closely with backend APIs (Node.js / .NET) to manage real-time data submission and retrieval. Used Redux Toolkit for global state management, ensuring consistent data flow across the application. Handled performance optimization for large forms by reducing unnecessary re-renders and improving component structure. Also contributed to improving code quality by writing unit tests using Vitest.",
      },
    ],
    closing:
      "Through my experience at SPAN, I gained strong exposure to building large-scale frontend systems and handling real-world form complexities. I improved my ability to design scalable UI architectures, work with structured data, and build reliable user-focused applications. This experience strengthened both my technical skills and my approach to building production-ready applications.",
  },
  {
    company: "Sirpi Products and Services",
    duration: "Jan 2023 - Jul 2025",
    intro:
      "I joined Sirpi in January 2023. The initial days were very important for me, as I was learning a lot as a developer, and working with diverse teams helped me develop my soft skills. Since then, I have contributed to multiple projects and gained valuable experience from them.",
    summary:
      "The projects I worked on were data-driven solutions. Some of the major projects that I contributed to are:",
    projects: [
      {
        title:
          "Vehicle Evaluation Mobile Application for Refurbished Automotive Providers",
        description:
          "Developed a hybrid (offline + online) vehicle evaluation app to streamline assessments with video and audio recording, and real-time synchronization. Took full responsibility for the frontend using React Native, integrating secure authentication, media handling, and dynamic form validations.",
      },
      {
        title:
          "GIS & Temporal Data Visualization Web Application for a Data Exchange Entity",
        description:
          "Working under the direct mentorship of the CEO on refining both technical and product-oriented decision-making skills. Directly interacting with clients to gather requirements, present progress, and incorporate feedback into the development process.Collaborating and mentoring with two interns, handling project planning, code quality, and feature implementation to build an advanced data visualization app, enabling geospatial and temporal data management",
      },
    ],
    closing:
      "With over two years at this company, I have gained experience in frontend development and taking ownership of key project components. I have collaborated closely with teams to build scalable and interactive applications that enhance data visualization and digital transformation. Additionally, I have contributed to the hiring process, assisting in interviews to onboard talented developers for new projects.",
  },
];

export default function AboutMe({
  triggerScroll,
}: {
  triggerScroll: Function;
}) {
  const [imageHover, setImageHover] = useState(false);
  const [activeExperience, setActiveExperience] = useState(0);
  const [isExperienceHovered, setIsExperienceHovered] = useState(false);

  useEffect(() => {
    if (isExperienceHovered) {
      return;
    }

    const carouselTimer = setInterval(() => {
      setActiveExperience((current) =>
        current === professionalExperiences.length - 1 ? 0 : current + 1
      );
    }, 7000);

    return () => clearInterval(carouselTimer);
  }, [isExperienceHovered]);

  const showPreviousExperience = () => {
    setActiveExperience((current) =>
      current === 0 ? professionalExperiences.length - 1 : current - 1
    );
  };

  const showNextExperience = () => {
    setActiveExperience((current) =>
      current === professionalExperiences.length - 1 ? 0 : current + 1
    );
  };

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
      <div
        className="w-full"
        onMouseEnter={() => setIsExperienceHovered(true)}
        onMouseLeave={() => setIsExperienceHovered(false)}
      >
        <div className="flex items-center justify-between gap-4">
          <h1 className="flex items-center gap-2 font-bold text-3xl">
            <GoOrganization />
            Professional Experience
          </h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={showPreviousExperience}
              aria-label="Previous experience"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#38bdf8] bg-[#38bdf8] text-black shadow-lg shadow-[#38bdf8]/30 hover:border-[#ee009f] hover:bg-[#ee009f] hover:text-white transition-colors"
            >
              <FiChevronLeft fontSize={22} />
            </button>
            <button
              type="button"
              onClick={showNextExperience}
              aria-label="Next experience"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#38bdf8] bg-[#38bdf8] text-black shadow-lg shadow-[#38bdf8]/30 hover:border-[#ee009f] hover:bg-[#ee009f] hover:text-white transition-colors"
            >
              <FiChevronRight fontSize={22} />
            </button>
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeExperience * 100}%)` }}
          >
            {professionalExperiences.map((experience) => (
              <article key={experience.company} className="w-full flex-shrink-0">
                <h3 className="mt-4 font-semibold text-xl mb-4 underline">
                  {experience.company} ({experience.duration})
                </h3>
                <p className="mt-4 text-lg font-medium">
                  {highlightTechnologies(experience.intro)}
                </p>
                <p className="mt-4 text-lg font-medium">
                  {highlightTechnologies(experience.summary)}
                </p>
                {experience.projects.map((project) => (
                  <ExperienceItem
                    key={project.title}
                    title={project.title}
                    description={highlightTechnologies(project.description)}
                  />
                ))}
                <p className="mt-4 text-lg font-medium">
                  {highlightTechnologies(experience.closing)}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {professionalExperiences.map((experience, index) => (
            <button
              type="button"
              key={experience.company}
              onClick={() => setActiveExperience(index)}
              aria-label={`Show ${experience.company}`}
              aria-current={activeExperience === index}
              className={`h-3.5 rounded-full border border-white/50 transition-all ${
                activeExperience === index
                  ? "w-8 bg-[#38bdf8] border-[#38bdf8]"
                  : "w-3.5 bg-white/60 hover:bg-[#ee009f] hover:border-[#ee009f]"
              }`}
            />
          ))}
        </div>
      </div>
      {/* Call to Action */}

      <button
        onClick={() => triggerScroll()}
        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-black hover:border-white hover:border transition-all animate-pulse hover:animate-none"
      >
        Take a look at my works
      </button>
    </section>
  );
}
