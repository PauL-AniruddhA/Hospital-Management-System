import React,{useState,useEffect} from 'react';
import "../../../styles/Public/home.css";
import "../../../styles/Animation.css";
import hero1 from "../../../assets/home/Hospital Image.png";
import hero2 from "../../../assets/home/Hoispital Image 2.png";
import hero3 from "../../../assets/home/High-tech clinical laboratory with analyzers.png";
import hero4 from "../../../assets/home/Laboratory technician at work.png";
import hero5 from "../../../assets/home/Doctor explaining medical scans to patient.png";
import hero6 from "../../../assets/home/Professional consultation in modern office.png";
import hero7 from "../../../assets/home/Modern hospital lobby with warm accents.png";
import hero8 from "../../../assets/home/Modern pharmacy dispensing area with staff.png";
import hero9 from "../../../assets/home/hospital Cabin.png";
import hero10 from "../../../assets/home/Medical consultation in a clean clinic.png";
import hero11 from "../../../assets/home/Sterile surgical room setup.png";



import doctor_team from "../../../assets/home/Diverse medical team by waterfront skyline.png";
import PublicLayout from '../../../layouts/PublicLayout';

const images = [
  { src: hero1, animation: "dolly-in" },
  { src: hero2, animation: "drone-fly" },
  { src: hero3, animation: "float-animation" },
  { src: hero4, animation: "pan-right" },
  { src: hero5, animation: "rotate-slow" }, 
  { src: hero6, animation: "rotate-slow" }, 

];
const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <PublicLayout>
      <section className="hero-section">
      {/* Background Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`hero-slide ${
            index === currentImage
              ? `active ${image.animation}`
              : ""
          }`}
          style={{
            backgroundImage: `url(${image.src})`,
          }}
        />
      ))}

      <div className="hero-overlay" />

    </section>
    
    </PublicLayout>
    </>
  )
}

export default HomePage;