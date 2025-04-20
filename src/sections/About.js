import seperator_black from '../images/separator_black.png'

export default function About(){
    return(
        <section className="aboutme container " id="about">
          <div className="header-info">
            <h4>ABOUT ME</h4>
            <p>My name is Charles Eboson, and I’m currently pursuing a BSc. in Information Engineering
              at the University of Applied Sciences in Hamburg. Over the past few years,
              I’ve gained hands-on experience with programming languages like C, Java, and JavaScript,
              and I’ve developed a strong interest in full-stack development, embedded systems, and the use of AI technologies.
            </p>
            <p>
              Working in different academic environments across Europe and holding various student positions ranging
              from Data Analyst to Full Stack Developer has helped me grow both technically and personally.
              These experiences have sharpened my problem-solving skills, adaptability, and passion for continuous learning.
            </p>
            <p>
              Outside of tech, I enjoy diving into AI research and watching football. If you'd like to learn more about my work or connect,
              feel free to check out my GitHub or LinkedIn!
            </p>
            <img src={seperator_black} alt="" />
          </div>
          <div className="grid-about">
            <div className="development columns">
              <h6>DEVELOPMENT</h6>
              <p>I can design the site based on your needs and suggestions. I can <br />
                also design the site from scratch and consult you during the job.</p>
            </div>
            <div className="maintenance columns">
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
    );
}