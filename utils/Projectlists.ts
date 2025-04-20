
export type ProjectList = {
    id: number;
    title: string;
    technologies: string;
    imageUrl: string;
    about: string;
    liveLink: string;
    githubLink: string;
};

const projectsList = [
    {
        id: 0,
        title: "Data Visualization App",
        technologies: "ReactJS, Typescript, Tailwind-CSS,Apache Echarts",
        imageUrl: "https://i.ibb.co/f7sdcGC/Screenshot-2025-02-26-at-11-27-41-AM.png",
        about:
            "Built with ReactJS using Echarts, this project is designed to transform raw data into meaningful insights through interactive visualizations",
        liveLink: "https://musical-lily-e3ce98.netlify.app/",
        githubLink: "https://github.com/gokulanand-selvan/data-visualization-fe",
    },
    {
        id: 1,
        title: "Todo-Remainder App",
        technologies: "ReactJS, Javascript,Tailwind-CSS",
        imageUrl: "https://i.ibb.co/qpD1Z8C/Todo-Remainder.png",
        about:
            "Built with ReactJS using tailwindCSS, this is a minimal looking task-tracking application . Includes theme toggle and responsive design.",
        liveLink: "https://phenomenal-biscotti-893f47.netlify.app/",
        githubLink: "https://github.com/gokulanand-selvan/todo-list",
    },
    {
        id: 2,
        title: "March-Tee webclone",
        technologies: "ReactJS, Javascript,Framer motion",
        imageUrl: "https://i.ibb.co/5R2xr4q/Screenshot-2024-11-22-at-7-30-25-PM.png",
        about:
            "Built with ReactJS utilized framer motion, this is a clone of March Tee website.",
        liveLink: "https://gorgeous-pudding-6018fa.netlify.app/",
        githubLink: "https://github.com/gokulanand-selvan/march_tee_store_clone",
    },
    {
        id: 3,
        title: "Employee Detials App",
        technologies: "ReactJS, Typescriprt",
        imageUrl: "https://i.ibb.co/M776VC7/Screenshot-2024-11-22-at-7-16-26-PM.png",
        about:
            "Built with ReactJS using typescript, this is a simple emplyoee CRUD application.",
        liveLink: "https://main--snazzy-kelpie-a6ac3b.netlify.app/",
        githubLink: "https://github.com/gokulanand-selvan/basic_crud_app",
    },
    {
        id: 4,
        title: "Apple web clone",
        technologies: "HTML,CSS",
        imageUrl: "https://i.ibb.co/0MFpdcC/Screenshot-2024-11-22-at-7-40-17-PM.png",
        about:
            "Built with HTML and CSS, this is a non intractive clone of Apple website.",
        liveLink: "https://gokulanand-selvan.github.io/apple-web-clone/",
        githubLink: "https://github.com/gokulanand-selvan/basic_crud_app",
    },
];

export default projectsList;
