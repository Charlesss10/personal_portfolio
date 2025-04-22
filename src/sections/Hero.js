import person from '../images/person.png';
import bg from '../images/bg.png';

export default function Hero() {
    return (
        <section className="hero ">
            <div className="bg-img">
                <img src={bg} alt="" />
            </div>
            <div className="hero-top container">

                <div className="content">

                    <div className="info">
                        <h1>Hi, I am</h1>

                        <h2>Charles</h2>
                        <h6>Software Engineer/Full Stack Developer/<br />
                            Data Analyst</h6>
                    </div>
                    <div className="contact-me">
                        {/*<a href="https://api.whatsapp.com/send/?phone=4915753003416&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp"></i></a>*/}
                        <a href="https://www.linkedin.com/in/charles-eboson"><i className="fa-brands fa-linkedin" target="_blank"></i></a>
                        <a href="https://github.com/Charlesss10" target="_blank" rel="noreferrer"><i className="fa-brands fa-github" ></i></a>
                    </div>
                </div>
                <div className="person-img">
                    <img src={person} alt="person" />
                </div>
            </div>
        </section>
    );
}