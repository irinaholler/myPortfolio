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
    name: "Responsive Design",
    title: "Seamless Experiences Anywhere",
    comment:
      "I craft interfaces that adapt and shine on every screen—mobile, tablet, or desktop—so users always enjoy an intuitive journey.",
    //img: "./skill-1.png",
  },
  {
    name: "UI/UX Empathy",
    title: "Designing with People in Mind",
    comment:
      "Combining user research and visual polish, I build interfaces that feel natural, accessible, and bring delight to every interaction.",
    //img: "./skill-2.png",
  },
  {
    name: "Full-Stack Craft",
    title: "From Mongo to React",
    comment:
      "From MongoDB schemas to dynamic React components—end-to-end solutions that scale and delight.",
    //img: "./skill-3.png",
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
    name: "Our Playful Lab",
    description: "A playful Flask web app with mini-generators (excuses, pet names, and more), blending Python with HTML & CSS for creative fun.",
    img: "./prj-python.png",
    link: "https://github.com/irinaholler/Our-Playful-Lab",
    live: "https://our-playful-lab-app.azurewebsites.net/",
    tags: ["Flask", "Python", "Azure", "Java Script"],
  },
  {
    name: "Voice‑to‑Text (Azure)",
    description:
      "From spoken word to written word — EchoScribe turns voice into text with the help of AI. Deployed on Azure for seamless performance and accessibility.",
    img: "./prj-echoscribe-web.png",
    link: "https://github.com/irinaholler/EchoScribe",
    live: "https://echoscribe-web-3120.azurewebsites.net/",
    tags: ["Flask", "Python", "Azure", "WhisperAI"],
  },
  {
    name: "AI Image Generator",
    description:
      "Transform words into one-of-a-kind images. This AI image generator, hosted on Azure, makes creativity interactive and fun.",
    img: "./prj-aiimg.png",
    link: "https://github.com/irinaholler/Our-Playful-Lab",
    live: "https://colabsite.z6.web.core.windows.net/",
    tags: ["AI", "Flask", "Python", "HTML/CSS"],
  },
  {
    name: "mitAussicht",
    description: "An elegant site, blending accessibility, performance, and elegant design, a digital home that mirrors the calm of living with a view.",
    img: "./prj-mitAussicht.png",
    link: "https://wohnen-mitaussicht.de",
    tags: ["WordPress", "Elementor"],
  },
  {
    name: "Gries GmbH",
    description: "Corporate website with modern design and seamless user experience for Gries GmbH.",
    img: "./prj-Gries GmbH-WS.png",
    link: "https://gries-gmbh.de",
    tags: ["WordPress", "Elementor"],
  },
  {
    name: "Connectify - A Blogging Platform",
    description: "Connectify is where thoughts become posts, and posts spark conversations — a sleek social blog app with real-time messaging and expressive storytelling.",
    img: "./prj-connectify.png",
    link: "https://youtu.be/o9iHF65ouTE?si=OpsS-Rv1U5PFCbZU"
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
    description: "A memory card game built with JavaScript, HTML & CSS — featuring flip animations, dynamic album covers from the Last.fm API, and score tracking.",
    img: "./prj-Memory-Card-Game.png",
    link: "https://irinaholler.github.io/Memory-Card-Game/"
  },
  {
    name: "Hangman Game",
    description: "A sleek, interactive Hangman game with smooth animations and a modern design. Guess letters, reveal words, and enjoy a fun challenge.",
    img: "./prj-hm.png",
    link: "https://irinaholler.github.io/Hangman-Game/"
  },
  {
    name: "Story Cover Lab",
    description:
      "Eine einseitige Landingpage für mein Buchcover-Atelier: dunkle, klare, manchmal rockige Ästhetik mit Cover-Galerie.",
    img: "./prj-story-cover-lab.png",
    link: "https://github.com/irinaholler/story-cover-lab",
    live: "https://myrina.de/story-cover-lab/",
    tags: ["React", "css"],
    isNewest: true,
  },
  {
    name: "QuietCV",
    description:
      "Ein ruhiger, aufgeräumter CV-Builder in React: Live-Vorschau, klare Typografie, dezente Farbthemen und exportierbare Lebensläufe – damit der Inhalt spricht, nicht der Lärm um ihn herum.",
    img: "./prj-quietcv.png",
    link: "https://github.com/irinaholler/Quiet-CV",
    live: "https://myrina.de/quietcv/",
    tags: ["React", "css"]
  }
];
