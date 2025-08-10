import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence,  useTransform, useScroll } from "framer-motion";
import { EnvelopeIcon, PhoneIcon, GlobeAltIcon } from '@heroicons/react/24/outline'; 
import { useForm, ValidationError } from '@formspree/react';
import backVideo from '../src/Back.mp4';


const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.12, duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

function Navbar() {
  return (
    <motion.header
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-gray-900/60 border-b border-pink-300/10 shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-pink-400 shadow-sm shadow-pink-400/30" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/80 shadow-sm shadow-yellow-400/20" />
            <span className="w-3 h-3 rounded-full bg-green-400/70 shadow-sm shadow-green-400/20" />
          </div>
          <a href="#intro" className="text-pink-300 font-semibold text-lg md:text-xl select-none">Damilare Osibanjo</a>
        </div>
        <nav className="hidden md:flex gap-6 text-sm text-gray-300">
          <a href="#intro" className="hover:text-pink-400 transition">Home</a>
          <a href="#about" className="hover:text-pink-400 transition">About</a>
          <a href="#stack" className="hover:text-pink-400 transition">Tech-Stack</a>
          <a href="#values" class="hover:text-pink-400 transition duration-200">Values</a>
          <a href="#projects" className="hover:text-pink-400 transition">Projects</a>
          <a href="#contact" className="hover:text-pink-400 transition">Contact</a>
          <a href="#download" className="hover:text-pink-400 transition">Résumé</a>
        </nav>
      </div>
    </motion.header>
  );
}

function Hero() {
  return (
    <motion.section
      id="intro"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[64vh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-12"
    >
      <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-pink-300 mb-3">
        Damilare Osibanjo
      </motion.h1>
      <motion.p variants={itemVariants} className="text-lg text-gray-300 max-w-3xl mb-6">
        Aspiring Quantitative Analyst · Data & Cybersecurity Enthusiast · Full-Stack Developer
      </motion.p>
      <motion.a
        variants={itemVariants}
        href="#projects"
        className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold shadow-xl transition-transform"
        whileHover={{ scale: 1.03 }}
      >
        View Projects
      </motion.a>
    </motion.section>
  );
}

function ScrollSpyNav() {
  const sections = ["intro", "about", "stack", "values", "projects", "contact", "download"];
  const [active, setActive] = React.useState("intro");

  React.useEffect(() => {
    const observers = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-4 z-50">
      {sections.map((id) => (
        <a key={id} href={`#${id}`} className="group relative">
          <motion.span
            className="block w-2.5 h-2.5 rounded-full bg-gray-500 group-hover:bg-pink-400 transition-colors duration-300"
            animate={{
              scale: active === id ? 1.6 : 1,
              backgroundColor: active === id ? "#f472b6" : "#6b7280",
              boxShadow:
                active === id
                  ? "0 0 8px rgba(244, 114, 182, 0.6)"
                  : "none",
            }}
            transition={{ duration: 0.25 }}
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-gray-900/80 text-white px-2 py-1 rounded text-xs transition">
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </span>
        </a>
      ))}
    </div>
  );
}


function TechBadge({ src, alt }) {
  return <img src={src} alt={alt} className="h-8 object-contain" loading="lazy" />;
}

function Projects() {
  const projects = [
    {
      title: "WindowsPortfolio",
      description: "A portfolio website that emulates Windows 10, easy to configure for users with minimal coding experience.",
      link: "https://github.com/Dev-Dami/Portfolio",
      demo: null,
      tags: ["Angular", "Windows UI", "Customizable", "Portfolio", "Typescript" ]
    },
    { 
      title: "C Text Editor", 
      description: "A simple Windows text editor in pure C using Win32 API with features like syntax highlighting, caret navigation, and word count.", 
      link: "https://github.com/Dev-Dami/C-project-Text-Editor",
      demo: null,
      tags: ["C", "Win32 API", "Text Processing"]
    },
    { 
      title: "Yeshua Chat Assistant", 
      description: "A real-time school chatbot built with Node.js, Express, and Socket.IO. Dynamic AI responses and Markdown-like formatting.", 
      link: "https://github.com/Dev-Dami/ChatAssistant",
      demo: null,
      tags: ["Node.js", "Socket.IO", "AI"]
    },
    { 
      title: "Todo-Cli", 
      description: "A simple command-line to-do manager built in Go using the Cobra library.", 
      link: "https://github.com/Dev-Dami/todocli",
      demo: null,
      tags: ["Go", "CLI", "Productivity"]
    },
    { 
      title: "Sonic-Runner", 
      description: "A fast-paced runner game inspired by Sonic, built with TypeScript using the kaplay library and Vite.", 
      link: "https://github.com/Dev-Dami/Sonic-Runner",
      demo: "https://Dev-Dami.github.io/Sonic-Runner/",
      tags: ["TypeScript", "Game Dev", "Vite"]
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const cardHover = {
    hover: {
      y: -8,
      boxShadow: "0 15px 30px rgba(236, 72, 153, 0.15)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <motion.section 
      id="projects" 
      className="max-w-7xl mx-auto px-4 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      variants={containerVariants}
    >
      <div className="text-center mb-16">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-pink-300 mb-4"
          variants={itemVariants}
        >
          Featured Projects
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-300 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          A selection of my open-source work and experiments
        </motion.p>
      </div>

      <motion.div 
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
      >
        {projects.map((project, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <motion.a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="block h-full bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700 shadow-lg hover:border-pink-400/30 transition-all duration-300"
              variants={cardHover}
            >
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-pink-900/30 text-pink-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-700">
                  <span className="text-pink-400 hover:text-pink-300 transition-colors font-medium flex items-center gap-1">
                    View on GitHub
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-sm bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 px-3 py-1 rounded-md transition-all flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Live Demo
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.a>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

function TechStack() {
  
  const techCategories = [
    {
      title: "Languages",
      badges: [
        ["https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white", "Go"],
        ["https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white", "Python"],
        ["https://img.shields.io/badge/C-00599C?style=flat&logo=c&logoColor=white", "C"],
        ["https://img.shields.io/badge/C++-00599C?style=flat&logo=c%2B%2B&logoColor=white", "C++"],
        ["https://img.shields.io/badge/Java-007396?style=flat&logo=java&logoColor=white", "Java"],
        ["https://img.shields.io/badge/Assembly-6E4C13?style=flat&logo=gnu&logoColor=white", "Assembly"],
        ["https://img.shields.io/badge/SQL-4479A1?style=flat&logo=mysql&logoColor=white", "SQL"]
      ]
    },
    {
      title: "Web Development",
      badges: [
        ["https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB", "React"],
        ["https://img.shields.io/badge/Vue-4FC08D?style=flat&logo=vue.js&logoColor=white", "Vue"],
        ["https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white", "HTML5"],
        ["https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white", "CSS3"],
        ["https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white", "TailwindCSS"],
        ["https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white", "Node.js"],
        ["https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white", "Express.js"],
        ["https://img.shields.io/badge/Socket.IO-010101?style=flat&logo=socket.io&logoColor=white", "Socket.IO"],
        ["https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white", "Flask"]
      ]
    },
    {
      title: "Data Science & ML",
      badges: [
        ["https://img.shields.io/badge/NumPy-013243?style=flat&logo=numpy&logoColor=white", "NumPy"],
        ["https://img.shields.io/badge/Pandas-150458?style=flat&logo=pandas&logoColor=white", "Pandas"],
        ["https://img.shields.io/badge/Matplotlib-ffffff?style=flat&logo=matplotlib&logoColor=black", "Matplotlib"],
        ["https://img.shields.io/badge/Scikit--Learn-F7931E?style=flat&logo=scikit-learn&logoColor=white", "Scikit-learn"],
        ["https://img.shields.io/badge/Plotly-3F4F75?style=flat&logo=plotly&logoColor=white", "Plotly"],
        ["https://img.shields.io/badge/Keras-D00000?style=flat&logo=keras&logoColor=white", "Keras"],
        ["https://img.shields.io/badge/PyTorch-EE4C2C?style=flat&logo=pytorch&logoColor=white", "PyTorch"]
      ]
    },
    {
      title: "Tools & Platforms",
      badges: [
        ["https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white", "Git"],
        ["https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white", "GitHub"],
        ["https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black", "Firebase"],
        ["https://img.shields.io/badge/Tampermonkey-000000?style=flat&logo=greasemonkey&logoColor=white", "Tampermonkey"],
        ["https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black", "Linux"],
        ["https://img.shields.io/badge/Vim-019733?style=flat&logo=vim&logoColor=white", "Vim"],
        ["https://img.shields.io/badge/VS%20Code-007ACC?style=flat&logo=visual-studio-code&logoColor=white", "VS Code"]
      ]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300
      }
    },
    hover: {
      scale: 1.05,
      y: -3,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.section 
      id="stack" 
      className="py-20 text-white bg-gradient-to-b from-gray-900 to-black backdrop-blur rounded-xl p-"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl bg-clip-text text-xl font-semibold border-b border-white/10 pb-2 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Technical Stack
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Technical Stack
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {techCategories.map((category, index) => (
            <motion.div 
              key={index}
              className="tech-section bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <motion.h3 
                className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
                variants={itemVariants}
              >
                {category.title}
              </motion.h3>
              <div className="flex flex-wrap gap-3">
                {category.badges.map((badge, i) => (
                  <motion.div
                    key={i}
                    variants={badgeVariants}
                    whileHover="hover"
                  >
                    <TechBadge 
                      src={badge[0]} 
                      alt={badge[1]} 
                      className="transition-all duration-200 hover:shadow-lg"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function ContactForm() {
  const [state, handleSubmit] = useForm("manbaoko");

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8 rounded-2xl bg-green-500/10 border border-green-500/30"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-green-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h3 className="text-2xl font-bold text-green-500 mb-2">Message Sent!</h3>
        <p className="text-gray-300">
          Thank you for reaching out. I'll get back to you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="grid gap-6"
    >
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <label
          className="block text-sm font-medium text-gray-300"
          htmlFor="name"
        >
          Your Name
        </label>
        <input
          className="w-full h-12 px-4 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500/30 transition-all duration-200 text-white placeholder-gray-500"
          id="name"
          name="name"
          type="text"
          required
          placeholder="Markus Smith"
        />
      </motion.div>

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <label
          className="block text-sm font-medium text-gray-300"
          htmlFor="email"
        >
          Email Address
        </label>
        <input
          className="w-full h-12 px-4 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500/30 transition-all duration-200 text-white placeholder-gray-500"
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
        />
        <p className="text-xs text-gray-500">
          I'll only use this to respond to your message
        </p>
      </motion.div>

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <label
          className="block text-sm font-medium text-gray-300"
          htmlFor="message"
        >
          Your Message
        </label>
        <textarea
          className="w-full min-h-[120px] px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500/30 transition-all duration-200 text-white placeholder-gray-500"
          id="message"
          name="message"
          required
          placeholder="What would you like to discuss?"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-end"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={state.submitting}
          className="px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-pink-500/30 transition-all duration-200"
        >
          {state.submitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </motion.button>
      </motion.div>
    </motion.form>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.25, margin: "-100px" }}
        className="bg-gray-900/60 backdrop-blur-lg rounded-2xl p-8 sm:p-10 border border-white/10"
      >
        <div className="text-center mb-10">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.25 }}
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-lg mx-auto"
          >
            Have a project in mind or want to discuss potential opportunities? 
            Fill out the form below and I'll get back to you as soon as possible.
          </motion.p>
        </div>
        
        <ContactForm />
      </motion.div>
    </section>
  );
}

function Contact() {
  return (
    <motion.section 
      id="contact" 
      className="py-20 px-4 backdrop-blur-lg rounded-3xl bg-gradient-to-b from-gray-900 to-black"
      variants={containerVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: false, amount: 0.25 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          variants={itemVariants}
          className="bg-gray-900/80 backdrop-blur-lg rounded-3xl p-10 border border-white/10 shadow-2xl shadow-pink-500/10"
        >
          <div className="text-center mb-10">
            <motion.h2 
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-400 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Let's Connect
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              I'm currently open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out through any of these channels.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Actions */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div>
                <h3 className="font-semibold text-gray-300 uppercase text-sm mb-4 tracking-wider">Direct Contact</h3>
                <div className="space-y-4">
                  <a 
                    href="mailto:damiade5banjo@gmail.com" 
                    className="flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 group"
                  >
                    <div className="p-3 bg-pink-500/10 rounded-lg group-hover:bg-pink-500/20 transition-colors">
                      <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email me Directly at</p>
                      <p className="text-white font-medium">damiade5banjo@gmail.com</p>
                    </div>
                  </a>
                  
                  <a 
                    href="tel:2349071669120" 
                    className="flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 group"
                  >
                    <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Call me at</p>
                      <p className="text-white font-medium">+234 907 166 9120</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <a 
                  href="mailto:damiade5banjo@gmail.com" 
                  className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-full text-center transition-all duration-300 shadow-lg hover:shadow-pink-500/30"
                >
                  Email Me
                </a>
                <a 
                  href="https://github.com/Dev-Dami" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 border border-white/20 hover:border-pink-400/50 text-white font-medium py-3 px-6 rounded-full text-center transition-all duration-300 hover:bg-white/5"
                >
                  GitHub
                </a>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div>
                <h3 className="font-semibold text-gray-300 uppercase text-sm mb-4 tracking-wider">Social Links</h3>
                <ul className="space-y-3">
                  <li className="group">
                    <a 
                      href="https://www.linkedin.com/in/damilare-osibanjo-92914831b/" 
                      target="_blank" 
                      rel="noopener"
                      className="flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300"
                    >
                      <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.98 3C3.34 3 2 4.34 2 5.98v12.04C2 19.66 3.34 21 4.98 21h14.04C20.66 21 22 19.66 22 18.02V5.98C22 4.34 20.66 3 19.02 3H4.98zM8.36 17.67H5.9V9.5h2.46v8.17zM7.13 8.4a1.43 1.43 0 110-2.86 1.43 1.43 0 010 2.86zm11.08 9.27h-2.46v-4.2c0-1.05-.02-2.41-1.47-2.41-1.48 0-1.7 1.15-1.7 2.33v4.28h-2.46V9.5h2.36v1.12h.03c.33-.62 1.13-1.28 2.33-1.28 2.5 0 2.96 1.65 2.96 3.79v4.54z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">LinkedIn</p>
                        <p className="text-sm text-gray-400">linkedin.com/in/damilare-osibanjo</p>
                      </div>
                      <svg className="ml-auto w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </a>
                  </li>
                  
                  <li className="group">
                    <a 
                      href="https://www.instagram.com/nulleddami" 
                      target="_blank" 
                      rel="noopener"
                      className="flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300"
                    >
                      <div className="p-2 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-lg group-hover:from-pink-500/20 group-hover:to-purple-500/20 transition-colors">
                        <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">Instagram</p>
                        <p className="text-sm text-gray-400">instagram.com/nulleddami</p>
                      </div>
                      <svg className="ml-auto w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </a>
                  </li>
                  
                  <li className="group">
                    <a 
                      href="https://github.com/Dev-Dami" 
                      target="_blank" 
                      rel="noopener"
                      className="flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300"
                    >
                      <div className="p-2 bg-gray-500/10 rounded-lg group-hover:bg-gray-500/20 transition-colors">
                        <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">GitHub</p>
                        <p className="text-sm text-gray-400">github.com/Dev-Dami</p>
                      </div>
                      <svg className="ml-auto w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Footer() {
  return (
    <footer className="text-center text-gray-400 text-sm py-8">
      &copy; {new Date().getFullYear()} Damilare Osibanjo
    </footer>
  );
}

export default function App() {
  const videoRef = useRef(null);
  const { scrollY } = useScroll();
  const overlayOpacity = useTransform(scrollY, [0, 200], [0.15, 0.05]); // lighter overlay

  useEffect(() => {
    document.title = "Damilare Osibanjo | Quantitative Analyst & Developer";
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent =
      "Portfolio of Damilare Osibanjo — Aspiring Quantitative Analyst, Cybersecurity Enthusiast, and Full-Stack Developer.";

    if (metaDesc) {
      metaDesc.setAttribute("content", descContent);
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = descContent;
      document.head.appendChild(newMeta);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && video.paused) {
          video.play().catch(() => {});
        }
      },
      { threshold: 0.05 }
    );

    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
 <div className="min-h-screen bg-black text-white antialiased flex items-center justify-center">
<div className="fixed -z-10 inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600 rounded-full filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-600 rounded-full filter blur-[100px] opacity-20"></div>
      </div>

      <Navbar />
      
      
      <main className="max-w-6xl mx-auto px-4 pt-28 pb-16 space-y-14 relative z-10">
        <Hero />
        
        {/* About Section */}
 <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.25 }} // removed margin for safety
      className="bg-gray-900/60 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
    >
      <div id="about" className="space-y-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          About Me
        </h2>

        <div className="space-y-4 text-gray-300">
          <p className="text-lg leading-relaxed">
            I'm <span className="text-pink-400 font-medium">Damilare Osibanjo</span>, a passionate programmer fascinated by quantitative finance, cybersecurity, and full-stack development. I thrive on solving complex problems and building robust systems, working comfortably across low-level programming, modern web technologies, and data science pipelines.
          </p>

          <p className="text-lg leading-relaxed">
            My work focuses on building secure, high-performance systems while solving complex problems through data analysis and algorithmic thinking.
          </p>

          {/* make the container a group so the dot reacts when the whole pill is hovered */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 group cursor-pointer transition-colors duration-200">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 mr-2 transform transition-all duration-300 group-hover:scale-125 group-hover:animate-pulse" />
            <span>16 y/o • Final year at Yeshua High School, Nigeria</span>
          </div>
        </div>
      </div>
    </motion.section>

        <TechStack />
        
        <section className="py-6">
          <Projects />
        </section>
        


        {/* Resume Download */}
{/* Premium Resume Download Section */}
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ 
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
    delay: 0.2
  }}
  viewport={{ once: false, amount: 0.25, margin: "-50px" }}
  id="download" 
  className="flex justify-center px-4 py-12"
>
  <div className="relative w-full max-w-2xl">
    {/* Animated floating gradient circles */}
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 0.2 }}
      transition={{ duration: 1.5, delay: 0.4 }}
      className="absolute -top-5 -left-5 w-24 h-24 rounded-full bg-purple-600 blur-xl"
    />
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 0.2 }}
      transition={{ duration: 1.5, delay: 0.6 }}
      className="absolute -bottom-5 -right-5 w-32 h-32 rounded-full bg-pink-600 blur-xl"
    />
    
    {/* Main card with shimmer border */}
    <div className="relative overflow-hidden rounded-2xl border border-transparent bg-gradient-to-br from-gray-900/80 to-gray-900/50 backdrop-blur-lg">
      {/* Animated gradient border */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,#ec4899_25%,#8b5cf6_50%,transparent_100%)] opacity-20"
      />
      <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/50 backdrop-blur-lg" />
      
      <div className="relative z-10 p-8">
        {/* Icon with floating animation */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.6,
            delay: 0.4,
            ease: "backOut"
          }}
          className="flex justify-center mb-6"
        >
          <div className="p-3 bg-gradient-to-br from-pink-600/20 to-purple-600/20 rounded-xl border border-white/10 shadow-lg">
            <motion.svg 
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-pink-400"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </motion.svg>
          </div>
        </motion.div>
        
        {/* Text content with staggered animation */}
        <div className="overflow-hidden">
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.6,
              delay: 0.3,
              ease: "backOut"
            }}
            className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent text-center"
          >
            Get My Professional Profile
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.6,
              delay: 0.4,
              ease: "backOut"
            }}
            className="text-gray-400 mb-6 max-w-md mx-auto"
          >
            Download my resume in your preferred format to explore my qualifications in detail
          </motion.p>
        </div>
        
        {/* Buttons with spring animation */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <motion.a 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ 
              y: -4,
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{
              hover: { type: "spring", stiffness: 400, damping: 10 },
              tap: { type: "spring", stiffness: 400, damping: 10 }
            }}
            href="/resume.pdf" 
            download="Damilare-Osibanjo-Resume.pdf"
            className="flex items-center justify-center gap-2 bg-gradient-to-br from-pink-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all flex-1 max-w-xs mx-auto"
          >
            <motion.svg
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </motion.svg>
            PDF Format
          </motion.a>
          
          <motion.a 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ 
              y: -4,
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{
              hover: { type: "spring", stiffness: 400, damping: 10, delay: 0.1 },
              tap: { type: "spring", stiffness: 400, damping: 10 }
            }}
            href="/resume.docx" 
            download="Damilare-Osibanjo-Resume.docx"
            className="flex items-center justify-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg font-medium border border-white/10 shadow-lg transition-all flex-1 max-w-xs mx-auto"
          >
            <motion.svg
              animate={{
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </motion.svg>
            Word Format
          </motion.a>
        </div>
        
        {/* Last updated with fade-in */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </motion.div>
      </div>
    </div>
  </div>
</motion.section>
<ContactSection />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}