import javascript from '../images/javascript.svg';
import react from '../images/react.svg';
import git from '../images/git.png';
import html from '../images/html.svg';
import sql from '../images/sql.svg';
import c from '../images/c.png';
import java from '../images/java.png';
import german from '../images/german.png';
import gcp from '../images/gcp.png';
import aws from '../images/aws.png';

export default function Skills() {
    return (
        <section className="skills container" id="skills">
            <div className="header-info">
                <h4>SKILLS</h4>

            </div>
            <div className="using-now ">
                <h4>USING NOW:</h4>
                <div className="grid-skills">
                    <div className="grid-item item1">
                        <img src={c} alt="c" />
                        <h6>C</h6>
                    </div>
                    <div className="grid-item item2">
                        <img src={java} alt="java" />
                        <h6>Java</h6>
                    </div>
                    <div className="grid-item item4">
                        <img src={javascript} alt="javascript" />
                        <h6>JavaScript</h6>
                    </div>
                    <div className="grid-item item5">
                        <img src={react} alt="react" />
                        <h6>React</h6>
                    </div>
                    <div className="grid-item item6">
                        <img src={git} alt="git" />
                        <h6>Git</h6>
                    </div>
                    <div className="grid-item item7">
                        <img src={sql} alt="sql" />
                        <h6>SQL</h6>
                    </div>
                </div>

            </div>
            <div className="learning-now ">
                <h4>LEARNING NOW:</h4>
                <div className="grid-skills">
                    <div className="grid-item item1">
                        <img src={html} alt="html" />
                        <h6>HTML</h6>
                    </div>
                    <div className="grid-item item2">
                        <img src={gcp} alt="gcp" />
                        <h6>GCP</h6>
                    </div>
                </div>

            </div>
            <div className="other-skills ">
                <h4>OTHER SKILLS:</h4>
                <div className="grid-skills">
                    <div className="grid-item item1">
                        <img src={german} alt="german" />
                        <h6>German</h6>
                    </div>
                    <div className="grid-item item1">
                        <img src={aws} alt="aws" />
                        <h6>AWS</h6>
                    </div>
                </div>

            </div>

        </section>
    );
}