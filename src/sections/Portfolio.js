export default function Portfolio() {
    return (
        <section className="portfolio" id="portfolio">
            <div className="header-img">

            </div>
            <div className="grid-header">
                <div className="info">
                    <p>PROJECTS</p>
                </div>
            </div>
            <div className="grid-port">
                <a href="https://www.charlesaluminium.com/" target="_blank" rel="noreferrer"><div className="charles-aluminium"><div className="grid-col col1" ></div></div></a>
                <a href="https://My-Simpsons-Quotes-App.vercel.app/" target="_blank" rel="noreferrer"><div className="simpsons-quote" ><div className="grid-col col2" ></div></div></a>
            </div>
            <div className="grid-header">
                <p>And many more to come!</p>
            </div>
        </section>
    );
}