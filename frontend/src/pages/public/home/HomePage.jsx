import React,{useState,useEffect} from 'react';
import "../../../styles/Public/home.css";
import hero1 from "../../../assets/hero-images/Hoispital Image 3.png";
import hero2 from "../../../assets/hero-images/Hoispital Image 6.png";
// import medicalTeam from "../../../assets/home/Diverse medical team by waterfront skyline.png";
import medicalTeam from "../../../assets/home/Medical team.png";
import PublicLayout from '../../../layouts/PublicLayout';
import { Link } from 'react-router-dom';
import { ShieldPlus, CalendarDays, FlaskConical, Stethoscope, Building2 ,HeartPulse, ClipboardList, } from 'lucide-react';
import Department from '../common/Department';
import departments from '../../../mock/depertment';
import PatientHomeSection from "../../Dashboard/patient/PatientHomeSection";
import {isAuthenticated} from "../../../utils/tokenUtils";
import {getRole} from "../../../utils/roleUtils";



const images = [hero1, hero2];
const HomePage = () => {
  const authenticated = isAuthenticated();
  const role = getRole();
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
        <section className="hero-wrapper">
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
        
          {authenticated && role === "PATIENT" ? (
            <PatientHomeSection />
          ) : (
            <>
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

              <section className='exp'>
                <div className='exp-header'>
                  <h1>Areas of Specialties</h1>
                  <span>Leading specialists providing advanced care for every stage of your health journey</span>
                </div>

                <div className='exp-body'>
                    <div className="exp-grid">
                      {departments.map((department) => (
                        <Department 
                        key={department.id}
                        department={department}
                        onClick={(dept) => console.log(dept)}
                        />
                      ))}
                    </div>
                </div>

                <div className='exp-footer'>
                  <Link to={'/book-appointment'}>
                    <button className="exp-all-btn">
                      <span>View All Specialities →</span>
                    </button>
                    </Link>
                </div>

                
              </section>

              <section className="advertisement">
                <div className="top-showcase">
                  <div className="bottom-description">
                  <h2>
                    Healthcare That Puts Patients First.
                  </h2>

                  <div className="typewriter-box">

                    <p>
                      Delivering world-class healthcare through innovation, expertise, and compassion. HMS Hospital brings together experienced medical professionals, state-of-the-art facilities, and patient-centered care to help individuals and families achieve better health outcomes every day.
                    </p>

                  </div>
                  </div>

                <div>
                  <div className="advertisement-image">
                    <img src={medicalTeam} alt="Medical Team" />
                  </div>
                  
                </div>
                </div>
              </section>
            </>
          )}
        </section>
        
    </PublicLayout>
    </>
  )
}

export default HomePage;