import { backgrounds } from "@/styles/backgrounds";
// import Image from "next/image";
import React from "react";

type ShowProjectsProps = {
  title: string;
  technologies: string;
  imageUrl: string;
  about: string;
  liveLink: string;
  githubLink: string;
  isEven: number; // Add a prop to determine if the row is even
};

const ShowProjects: React.FC<ShowProjectsProps> = ({
  title,
  technologies,
  imageUrl,
  about,
  liveLink,
  githubLink,
  isEven,
}) => {
  // Open a link in a new tab
  const openLink = (link: string) => {
    console.log(link);
    window.open(link, "_blank");
  };
  const getBackground = (index: number) => {
    return backgrounds[index % backgrounds.length];
  };
  return (
    <div
      id="projects-section"
      className={`flex flex-col items-center justify-center p-8`}
      style={{
        background: getBackground(isEven),
      }}
    >
      <div className="max-w-7xl w-full flex flex-col md:flex-col items-center gap-8">
        <div className="flex-1 shadow-lg rounded-md overflow-hidden">
          {/* <Image
            src={imageUrl}
            alt={title}
            width={650}
            height={350}
            className="rounded-md"
          /> */}
          <img src={imageUrl} alt={title} width={650} height={350} />
        </div>
        <div className="flex-1 flex flex-col items-center text-center gap-4 px-4">
          <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
          <h4 className="text-blue-600 text-lg md:text-xl font-medium p-2 rounded-full">
            {"</> "} {technologies}
          </h4>
          <p className="text-base md:text-lg font-medium max-w-3xl">{about}</p>
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => openLink(liveLink)}
              className="px-6 py-3 rounded-full text-white border-white border-2 font-semibold hover:bg-[#8020f7] hover:border-[#8020f7] hover:text-white transition"
            >
              View Site
            </button>
            <button
              onClick={() => openLink(githubLink)}
              className="px-6 py-3 rounded-full bg-white border-2 border-gray-300 text-black font-semibold hover:bg-[#8020f7] hover:border-[#8020f7] hover:text-white transition"
            >
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProjects;
