import ShowProjects from "@/components/ShowProjects";
import projectsList from "@/utils/Projectlists";
import React from "react";

export default function Works(props: { scrollRef: any }) {
  const { scrollRef } = props;
  return (
    <div ref={scrollRef} className="text-white">
      {projectsList.map((project, index) => (
        <ShowProjects
          key={project.id}
          title={project.title}
          technologies={project.technologies}
          imageUrl={project.imageUrl}
          about={project.about}
          liveLink={project.liveLink}
          githubLink={project.githubLink}
          flip={project.id % 2 === 0}
          isEven={index}
        />
      ))}
    </div>
  );
}
