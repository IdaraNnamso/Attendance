import React from 'react';
import '../css/profile.css';
import javaImage from '../assets/java.png';
import reactImage from '../assets/react.png';
import htmlImage from '../assets/html.png'; 

const ProfilePage = () => {
  const programmingLanguages = [
    { name: 'HTML', imageUrl: htmlImage, alt: 'HTML Logo' },
    { name: 'JavaScript', imageUrl: 'https://placehold.co/80x80/F7DF1E/000000/js?font=inter&text=JS', alt: 'JavaScript Logo (Placeholder)' }, 
    { name: 'React', imageUrl: reactImage, alt: 'React Logo' },
    { name: 'Java', imageUrl: javaImage, alt: 'Java Logo' }, 
  ];

  return (
    <div className="main-content">
      <div className="profile-section">
   
        <div className="profile-card">
          <div className="profile-left">
            <div className="profile-image-wrapper">
              <img
                src="https://i.guim.co.uk/img/media/74587bc9a8a10aad8443241024d558a5eac098d9/0_0_5108_3406/master/5108.jpg?width=465&dpr=1&s=none&crop=none" // Generic placeholder for profile image
                alt="User Profile"
                className="profile-image"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/cccccc/333333?text=Profile"; }} // Fallback if main image fails
              />
            </div>
            <h3 className="user-name">Akpan Idara</h3>
            <span className="premium-t">Student</span>
          </div>

          <div className="profile-right">
            <h4 className="details-heading">Bio & other details</h4>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">My Role</span>
                <span className="detail-value">Student</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Course</span>
                <span className="detail-value">Web-development</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Teacher</span>
                <span className="detail-value">Moses Bassey</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Duration</span>
                <span className="detail-value">1 year</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">My City or Region</span>
                <span className="detail-value">Calabar, Nigeria</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status</span>
                <span className="detail-value availability-status">
                  <span className="status-dot"></span> Present
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Badges</span>
                <span className="detail-value badge">
                  <span className="badge-icon">⭐</span> Most early
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Tags</span>
                <span className="detail-value tags">#WebDev, #FrontEnd, #ReactJS</span> 
              </div>
            </div>
          </div>
        </div>

    
        <div className="programming-languages-section card">
          <h4>Programming Languages</h4>
          <div className="language-icons-container">
            {programmingLanguages.map((lang, index) => (
              <div key={index} className="language-icon-item">
                <img
                  src={lang.imageUrl}
                  alt={lang.alt}
                  className="language-icon-img"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/cccccc/333333?text=N/A"; }} os
                />
                <span className="language-name">{lang.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
