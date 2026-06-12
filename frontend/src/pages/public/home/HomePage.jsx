import React,{useState,useEffect} from 'react';
import "../../../styles/Public/home.css";
import hero1 from "../../../assets/hero-images/Hoispital Image 3.png";
import hero2 from "../../../assets/hero-images/Hoispital Image 6.png";
import PublicLayout from '../../../layouts/PublicLayout';
import { Link } from 'react-router-dom';
import { ShieldPlus, CalendarDays, FlaskConical , Building2,Stethoscope,HeartPulse,Hospital,MapPin,Pill, } from 'lucide-react';
import Department from '../common/Department';
import departments from '../../../mock/depertment';

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

      <section className="why-aig">
        <div className="why-aig-header">
          <h2>Healthcare Excellence</h2>
          <p>
            Delivering trusted healthcare through expert specialists,
            advanced technology, and patient-centered care.
          </p>
        </div>

        <div className="why-aig-grid">

          {/* Card 1 */}
          <div className="aig-stat-card">
            <div className="aig-stat-icon">
              <Building2 size={52} />
            </div>

            <div className="aig-stat-content">
              <div className="aig-stat-heading">
                <span className="aig-stat-value">74+</span>
                <span className="aig-stat-title">Hospitals</span>
              </div>

              <p>
                India's largest private hospital network delivering advanced healthcare.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="aig-stat-card">
            <div className="aig-stat-icon">
              <Stethoscope size={52} />
            </div>

            <div className="aig-stat-content">
              <div className="aig-stat-heading">
                <span className="aig-stat-value">13,000+</span>
                <span className="aig-stat-title">Doctors</span>
              </div>

              <p>
                Experienced specialists providing exceptional patient care.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="aig-stat-card">
            <div className="aig-stat-icon">
              <HeartPulse size={52} />
            </div>

            <div className="aig-stat-content">
              <div className="aig-stat-heading">
                <span className="aig-stat-value">2,300+</span>
                <span className="aig-stat-title">Diagnostics</span>
              </div>

              <p>
                Precision testing and advanced diagnostic facilities.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="aig-stat-card">
            <div className="aig-stat-icon">
              <Hospital size={52} />
            </div>

            <div className="aig-stat-content">
              <div className="aig-stat-heading">
                <span className="aig-stat-value">700+</span>
                <span className="aig-stat-title">Clinics</span>
              </div>

              <p>
                Accessible healthcare services closer to communities.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="aig-stat-card">
            <div className="aig-stat-icon">
              <MapPin size={52} />
            </div>

            <div className="aig-stat-content">
              <div className="aig-stat-heading">
                <span className="aig-stat-value">10,000+</span>
                <span className="aig-stat-title">Locations</span>
              </div>

              <p>
                Expanding healthcare reach across the country.
              </p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="aig-stat-card">
            <div className="aig-stat-icon">
              <Pill size={52} />
            </div>

            <div className="aig-stat-content">
              <div className="aig-stat-heading">
                <span className="aig-stat-value">7,000+</span>
                <span className="aig-stat-title">Pharmacies</span>
              </div>

              <p>
                Seamless access to medicines and healthcare essentials.
              </p>
            </div>
          </div>

        </div>
      </section>
    </PublicLayout>
    </>
  )
}

export default HomePage;