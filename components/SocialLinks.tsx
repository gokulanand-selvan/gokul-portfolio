import React from "react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { AiOutlineGithub } from "react-icons/ai";
import { IoMailOutline } from "react-icons/io5";

const SocialLinks = () => {
  const links = [
    {
      id: 1,
      icon: <FaLinkedinIn fontSize={35} />,
      bgColor: "#027fb1",
      href: "https://www.linkedin.com/in/gokulanandselvan",
    },
    {
      id: 2,
      icon: <AiOutlineGithub fontSize={35} color="black" />,
      bgColor: "white",
      href: "https://github.com/gokulanand-selvan",
    },
    {
      id: 3,
      icon: <FaInstagram fontSize={35} />,
      bgColor: "#e94475",
      href: "https://www.instagram.com/gokulanand_03/",
    },
    {
      id: 4,
      icon: <IoMailOutline fontSize={35} color="black" />,
      bgColor: "white",
      href: "mailto:gokul2848@gmail.com",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-full shadow-md transition-transform duration-300 hover:scale-110`}
          style={{ backgroundColor: link.bgColor }}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
