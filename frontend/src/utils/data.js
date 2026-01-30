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
  "I solve problems through design thinking and clean code. Whether it's a sleek web app or an AI automation workflow, I focus on creating solutions that actually work for real people.",
  "My approach? Listen first, design second, build third. I believe the best products come from understanding the 'why' behind every feature.",
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
    name: "Design Systems",
    title: "Building for Scale",
    comment:
      "I create design systems that grow with your product. Every component is built with consistency, accessibility, and future-proofing in mind—so your team can ship faster without sacrificing quality.",
    icon: "🎨",
    color: "#00D4FF",
    //img: "./skill-1.png",
  },
  {
    name: "Code & Automation",
    title: "From Idea to Reality",
    comment:
      "Whether it's a React component or an AI workflow, I write code that's clean, maintainable, and actually solves problems. I automate the boring stuff so you can focus on what matters.",
    icon: "⚡",
    color: "#9D4EDD",
    //img: "./skill-2.png",
  },
  {
    name: "User-Centered Thinking",
    title: "People First, Always",
    comment:
      "I start every project by asking 'who is this for?' and 'what problem are we solving?' Then I design and build solutions that users actually want to use—not just what looks cool.",
    icon: "💡",
    color: "#f6bc40",
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
      "From spoken word to written word - EchoScribe turns voice into text with the help of AI. Deployed on Azure for seamless performance and accessibility.",
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
    description: "Connectify is where thoughts become posts, and posts spark conversations - a sleek social blog app with real-time messaging and expressive storytelling.",
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
      "Ein ruhiger, aufgeräumter CV-Builder in React: Live-Vorschau, klare Typografie, dezente Farbthemen und exportierbare Lebensläufe - damit der Inhalt spricht, nicht der Lärm um ihn herum.",
    img: "./prj-quietcv.png",
    link: "https://github.com/irinaholler/Quiet-CV",
    live: "https://myrina.de/quietcv/",
    tags: ["React", "css"]
  }
];

export const aiAutomationProjects = [
  {
    name: "Intelligent Lead Capture System",
    description: "An AI-powered automation system that captures, processes, and organizes booking inquiries using LLM agents, vector databases, and no-code workflows. Seamlessly connects customer inquiries to Google Sheets with intelligent data extraction.",
    category: "ai-automation",
    technologies: ["LLM", "OpenAI", "n8n", "MCPs", "Pinecone", "Google Sheets"],
    workflows: [
      {
        name: "Lead Capture Flow",
        diagram: "./workflow-2-ai-agent.png",
        description: "AI Agent processes booking inquiries and routes to Google Sheets"
      },
      {
        name: "Document Processing",
        diagram: "./workflow-1-document-pipeline.png",
        description: "Automated document processing with Pinecone vector storage"
      },
      {
        name: "Lead Capture Configuration",
        diagram: "./workflow-3-lead-capture.png",
        description: "Connecting booking leads to Google Sheets with AI intelligence"
      }
    ],
    features: [
      "Real-time lead processing",
      "Intelligent data extraction",
      "Automated Google Sheets integration",
      "Vector-based document search",
      "No-code workflow automation"
    ],
    isNewest: true,
    badge: "AI Automation",
    img: "./workflow-2-ai-agent.png",
    caseStudy: "./case-study.html"
  }
];
