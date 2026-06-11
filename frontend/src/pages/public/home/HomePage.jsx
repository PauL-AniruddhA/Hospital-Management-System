import React,{useState,useEffect} from 'react';
import "../../../styles/Public/home.css";
import hero1 from "../../../assets/hero-images/Hoispital Image 3.png";
import hero2 from "../../../assets/hero-images/Hoispital Image 6.png";
import PublicLayout from '../../../layouts/PublicLayout';
import { Link } from 'react-router-dom';
import { ShieldPlus, CalendarDays, FlaskConical } from 'lucide-react';

const images = [hero1, hero2];
const HomePage = () => {
  const [current, setCurrent] = useState(0);
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 15000);

      return () => clearInterval(timer);
    }, []);
  return (
    <>
    <PublicLayout>
      <div className="hero-overlay" />
      <section className="hero-section">
        {images.map((image, index) => (
          <div
          key={index}
          className={`hero-slide ${
            index === current ? "active" : ""
          }`}
          >
            <img
              key={`${current}-${index}`}
              src={image}
              alt={`Hospital ${index}`}
              className={`hero-image ${
                index === 0
                ? "aerial-animation"
                : "entrance-animation"
              }`}
              />
          </div>
        ))}
      </section>
      
      <section className='quick-access'>
        <Link className ='quick-links' to={'/health-packages'}>
          <div className="icon-wrapper">
            <ShieldPlus className="quick-icon" />
          </div>
          <span className='quick-text'>Healh Insurance</span>
          <span className='quick-arrow'>→</span>
        </Link>
        <Link className ='quick-links' to={'/book-appointment'}>
          <div className="icon-wrapper">
            <CalendarDays className="quick-icon" />
          </div>
          <span className='quick-text'>Book Appointment </span>
          <span className='quick-arrow'>→</span>
        </Link>
        <Link className ='quick-links' to={'/lab-tests'}>
          <div className="icon-wrapper">
            <FlaskConical className="quick-icon" />
          </div>
          <span className='quick-text'>Lab Reports</span>
          <span className='quick-arrow'>→</span>
        </Link>
      </section>

      <section className='expertise'>

      </section>
    </PublicLayout>
    </>
  )
}

export default HomePage;