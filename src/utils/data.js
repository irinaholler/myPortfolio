import { HiOutlineDesktopComputer } from "react-icons/hi";
import { CiMobile1 } from "react-icons/ci";
import { MdWorkspacesOutline } from "react-icons/md";

export const projectExperience = [
  {
    name: "Website Design",
    projects: 76,
    icon: HiOutlineDesktopComputer,
    bg: "#286F6C",
  },
  {
    name: "Mobile App Design",
    projects: 63,
    icon: CiMobile1,
    bg: "#EEC048",
  },
  {
    name: "Brand Identity",
    projects: 47,
    icon: MdWorkspacesOutline,
    bg: "#F26440",
  },
  {
    name: "Brand Identity",
    projects: 47,
    icon: MdWorkspacesOutline,
    bg: "#F26440",
  },
];

export const WhatDoIHelp = [
  "I will help you with finging a solution and solve your problem, We use process design to create digital products. Besides that also help their business.",
  "We use process design to create digital products. Besides that also help their business",
];

export const workExp = [
  {
    place: "Gries GmbH",
    tenure: "Jan 2017 - Feb 2024",
    role: "Digital & Print Media Designer",
    detail:
      "Developed and maintained the Gries Website dynamic and user-friendly, ensuring optimal functionality and performance; Conceptualized and delivered innovative designs for marketing documents, presentations, and both digital and print materials; Designed visually engaging graphics and diverse assets for the company website.",
  },
  {
    place: "trends&fun / CHARAKTER",
    tenure: "Aug 2016 - Dec 2016",
    role: "Graphic Designer / Layout Internship",
    detail:
      "Draft and design of the layout of the CHARAKTER magazine; Collaborated with editorial teams to translate content into compelling visual narratives; Kept the design process organized to meet tight deadlines without compromising quality.",
  },
  {
    place: "KidsGo Verlag GmbH, Göttingen",
    tenure: "Mar 2015 - Sep 2015",
    role: "Intern – Graphic Design",
    detail:
      "Designed advertisements and trend pages; Created web designs, banners, and concepts for the website relaunch (kidsgo.de); esigned business cards and desk pads.",
  },
];

export const comments = [
  {
    name: "Digital Creativity",
    post: "Creativity",
    comment:
      "Eye-catching Materials: Capturing attention and delivering your message. Storytelling Presentations: Bringing ideas to life. Digital to Print: Materials that leave a lasting impact.",
    img: "./skill-1.png",
  },
  {
    name: "Attention to Details",
    post: "Patience",
    comment:
      "My keen eye for detail ensures every design element is polished and cohesive, delivering a seamless and engaging user experience.",
    img: "./skill-2.png",
  },
  {
    name: "Technology Poster",
    post: "Design Tech",
    comment:
      "Create animations, videos, GIFs, graphics, and other multimedia formats o communicate ideas and showcase products, services, or events.",
    img: "./skill-3.png",
  },
  {
    name: "Creative Problem-Solving",
    post: "Innovative Solutions for Every Challenge",
    comment:
      "I thrive on finding unique and efficient ways to overcome obstacles. Whether it's optimizing workflows, designing user-friendly interfaces, or crafting digital experiences.",
    img: "./skill-4.png",
  },
];

export const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  touchMove: true,
  useCSS: true,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const projects = [
  {
    name: "Mit Aussicht",
    description: "A beautiful website showcasing scenic views and locations with an immersive user experience.",
    img: "./prj-mitAussicht.png",
    link: "https://wohnen-mitaussicht.de"
  },
  {
    name: "Gries GmbH Website",
    description: "Corporate website with modern design and seamless user experience for Gries GmbH.",
    img: "./prj-Gries GmbH-WS.png",
    link: "https://gries-gmbh.de"
  },
  {
    name: "Connectify",
    description: "A modern social networking platform with real-time messaging and content sharing features.",
    img: "./prj-connectify.png",
    link: "https://echowords.onrender.com/welcome"
  },
  {
    name: "ChatFlow App",
    description:
      "A real-time chat application built with React, Node.js, Express and Socket.io. Features JWT-based auth, conversational UI, and live presence.",
    img: "./prj-ChatFlow-App.png",
    link: "https://youtu.be/eJ02u7vVLCI?si=pAz21_Kuvz0EHLqQ"
  },
  {
    name: "Memory Card Game",
    description: "An interactive memory card game with smooth animations and engaging gameplay.",
    img: "./prj-Memory-Card-Game.png",
    link: "https://memory-card-game-ih.vercel.app"
  },
  {
    name: "Pokemon Game",
    description: "An interactive Pokemon game with engaging gameplay and beautiful graphics.",
    img: "./prj-Pokemon.png",
    link: "https://pokemon-game-ih.vercel.app"
  }
];
