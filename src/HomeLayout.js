import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './sections/Header.js';
import Hero from './sections/Hero.js';
import CharlesTech from './sections/CharlesTech.js';
import About from './sections/About.js';
import Skills from './sections/Skills.js';
import Portfolio from './sections/Portfolio.js';
import Contact from './sections/Contact.js';
import Footer from './sections/Footer.js';
import ChatWidget from './components/ChatWidget.js';

function HomeLayout() {
  return (
    <div className="charles-eboson">
      <Header />
      <main>
        <Hero />
        <CharlesTech />
        <About />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
export default HomeLayout;