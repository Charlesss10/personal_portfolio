import './App.css';
import { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import person from './images/person.png';
import bg from './images/bg.png';
import seperator_black from './images/separator_black.png'
import javascript from './images/javascript.svg';
import react from './images/react.svg';
import git from './images/git.png';
import html from './images/html.svg';
import sql from './images/sql.svg';
import logo from './images/logo.png';
import logo_2 from './images/logo_2.png';
import node from './images/nodejs.png';
import React from 'react';
import axios from 'axios';

function App() {
  const [isVisible, setIsVisible] = useState(false); // State to manage visibility
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        '/api/sendEmail',
        formData, // formData is sent directly here
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        alert(response.data.message || "Message sent successfully!");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
  }, [isVisible]); // Depend on isVisible to re-render when it changes

  const toggleNavbar = () => {
    setIsVisible(!isVisible); // Toggle visibility state
  };

  return (
    <div className="charles-eboson">
      <header>
        <div className="hamburger" onClick={toggleNavbar}>
          <i className={`fa-solid fa-bars-staggered ${isVisible ? 'hidden' : ''}`} data-visible={isVisible ? 'false' : 'true'}></i>
          <i className={`fa-solid fa-xmark ${isVisible ? '' : 'hidden'}`} data-visible={isVisible ? 'true' : 'false'}></i>
        </div>
        <nav className="container navbar">
          <img src={logo} alt="logo" className="logo" />
          <img src={logo_2} alt="logo" className="mobile-logo" />
          <ul className={`nav-links ${isVisible ? 'visible' : 'hidden'}`}>
            <li><a href="#About">About me</a></li>
            <li><a href="#Skills">Skills</a></li>
            <li><a href="#portofolio">Portfolio</a></li>
            <a className="btn" href="#contact">Contact Me</a>
          </ul>
        </nav>
      </header>
      <main>
        <section class="hero ">
          <div class="bg-img">
            <img src={bg} alt="" />
          </div>
          <div class="hero-top container">

            <div class="content">

              <div class="info">
                <h1>Hi, I am</h1>

                <h2>Charles</h2>
                <h6>Software Engineer/Full Stack Developer/<br />
                  Data Analyst</h6>
              </div>
              <div class="contact-me">
                <a href="https://api.whatsapp.com/send/?phone=4915753003416&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer"><i class="fa-brands fa-whatsapp"></i></a>
                <a href="https://www.linkedin.com/in/charles-eboson/"><i class="fa-brands fa-linkedin" target="_blank"></i></a>
                <a href="https://github.com/" target="_blank" rel="noreferrer"><i class="fa-brands fa-github" ></i></a>
              </div>

            </div>

            <div class="person-img">
              <img src={person} alt="person" />
            </div>
          </div>
        </section>
        <section class="CharlesTech">
          <h4>CharlesTech Solutions</h4>
          <p>
            I’m the founder of CharlesTech Solutions, where I offer IT services such as website and software development.<br />
            In the future, I plan to expand into embedded systems application development and computer hardware maintenance. <br />
            I also integrate Large Language Models (LLMs) into my workflow to streamline and simplify development.<br />
            You can find me on LinkedIn and Instagram.
          </p>
          <span>READ MORE</span>
        </section>
        <section class="aboutme container " id="About">
          <div class="header-info">
            <h4>ABOUT ME</h4>
            <p>My name is Charles Eboson, and I’m currently pursuing a BSc. in Information Engineering
              at the University of Applied Sciences in Hamburg. Over the past few years,
              I’ve gained hands-on experience with programming languages like C, Java, and JavaScript,
              and I’ve developed a strong interest in full-stack development, embedded systems, and the use of AI technologies.
            </p>
            <p>
              Working in different academic environments across Europe and holding various student positions—ranging
              from Data Analyst to Full Stack Developer—has helped me grow both technically and personally.
              These experiences have sharpened my problem-solving skills, adaptability, and passion for continuous learning.
            </p>
            <p>
              Outside of tech, I enjoy diving into AI research and watching football. If you'd like to learn more about my work or connect,
              feel free to check out my GitHub or LinkedIn!
            </p>
            <img src={seperator_black} alt="" />
          </div>
          <div class="grid-about">
            <div class="development columns">
              <h6>DEVELOPMENT</h6>
              <p>I can design the site based on your needs and suggestions. I can <br />
                also design the site from scratch and consult you during the job.</p>
            </div>
            <div class="maintenance columns">
              <h6>MAINTENANCE</h6>
              <p>I can keep your site running smoothly with regular updates, security <br />
                checks, and fixes. Whether it’s ongoing support or occasional tweaks, <br />
                I’ll make sure everything stays up-to-date and working as it should. <br />
                also design the site from scratch and consult you during the job.
              </p>
            </div>
          </div>
          <img src={seperator_black} alt="" />
        </section>
        <section class="skills container" id="Skills">
          <div class="header-info">
            <h4>SKILLS</h4>

          </div>
          <div class="using-now ">
            <h4>USING NOW:</h4>
            <div class="grid-skills">
              <div class="grid-item item1">
                <img src={javascript} alt="javascript" />
                <h6>JavaScript</h6>
              </div>
              <div class="grid-item item2">
                <img src={react} alt="react" />
                <h6>React</h6>
              </div>
              <div class="grid-item item3">
                <img src={git} alt="git" />
                <h6>Git</h6>
              </div>
              <div class="grid-item item4">
                <img src={sql} alt="sql" />
                <h6>SQL</h6>
              </div>
            </div>

          </div>
          <div class="learning-now ">
            <h4>LEARNING NOW:</h4>
            <div class="grid-skills">
              <div class="grid-item item1">
                <img src={node} alt="node.js" />
                <h6>Node Js</h6>
              </div>
              <div class="grid-item item2">
                <img src={html} alt="html" />
                <h6>HTML</h6>
              </div>
            </div>

          </div>
          <div class="other-skills ">
            <h4>OTHER SKILLS:</h4>
            <div class="grid-skills">
              <div class="grid-item item1">
                <img src="" alt="" />
                <h6>Other Skills</h6>
              </div>
            </div>

          </div>

        </section>

        <section class="portfolio" id="portofolio">
          <div class="header-img">

          </div>
          <div class="grid-header">
            <div class="info">
              <p>ALL</p>
              <p>CODED</p>
              <p>DESIGNED</p>
            </div>
          </div>
          <div class="grid-port">
            <div class="grid-col col1" ></div>
            <div class="grid-col col2" ></div>
          </div>
          <div class="grid-header">

            <p>And many more to come!</p>

          </div>
        </section>
        <section class="contact container" id="contact">
          <div class="header-info">
            <h4>CONTACT</h4>
            <p>For more Information, please fill out the form.</p>
            <img src={seperator_black} alt="" />
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" id="name" placeholder="ENTER YOUR NAME*" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input type="email" name="email" id="email" placeholder="ENTER YOUR EMAIL*" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input type="text" name="phone" id="phone" placeholder=" YOUR PHONE*" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            <input type="text" name="message" id="message" placeholder="YOUR MESSAGE*" onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
            <button>SUBMIT</button>
          </form>
        </section>

      </main>

      <footer >
        <div class="container footer-info ">
          <div class="scroll-up ">
            <a href="#"><i class="fas fa-angle-up"></i></a>
            <h6>BACK TO TOP</h6>
          </div>
          <div class="social">
            <a href="https://github.com/" target="_blank" rel="noreferrer"><i class="fab fa-github"></i></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i class="fab fa-instagram" ></i></a>
            <a href="https://www.linkedin.com/in/charles-eboson/" target="_blank" rel="noreferrer"><i class="fab fa-linkedin"></i></a>
          </div>
          <p>
            <div>UI/UX design inspired by Tomasz Gajda (CC BY 4.0)</div>
            <div>&copy;  2025 CharlesTech Solutions. All rights reserved.</div>
          </p>
        </div>

      </footer>
    </div>
  );
}

export default App;