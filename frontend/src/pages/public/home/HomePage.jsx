import React,{useState,useEffect} from 'react';
import "../../../styles/Public/home.css";
import hero1 from "../../../assets/hero-images/Hoispital Image 3.png";
import hero2 from "../../../assets/hero-images/Hoispital Image 6.png";
import PublicLayout from '../../../layouts/PublicLayout';

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
      <div className="hero-overlay" />
    </PublicLayout>
    </>
  )
}

export default HomePage;