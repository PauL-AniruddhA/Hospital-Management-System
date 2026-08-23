import { Settings, UserRound, LockKeyhole, ShieldCheck, FileSignature, Languages, LogOut,  } from 'lucide-react';
import React , { useEffect, useRef, useState } from 'react'
import "../../styles/Components/ui/ProfileMenu.css";

function ProfileMenu({ variant = "default", avatar, name, role, onNavigate}) {
    const [profileOpen, setProfileOpen] = useState(false);  
    const profileRef = useRef(null)
    useEffect(() => {
    function onClick(e) {
        if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false); // close the profile dropdown on outside click
    }
    document.addEventListener("mousedown", onClick); 
    return () => document.removeEventListener("mousedown", onClick);
    }, []);

  return (
    <div className="topbar__profile" ref={profileRef} onClick={() => setProfileOpen((o) => !o)} >
          <img className="compact_profile-avatar" src={avatar} alt={name} />
          <div className="compact_profile-text">
            <span className="compact_profile-name">{name}</span>
            <span className="compact_profile-role">{role}</span>
            {/* <span className="topbar__profile-role">Id : DOC-2023</span> */}
          </div>
          {/* <ChevronDown size={16} className={`topbar__profile-chevron${profileOpen ? " topbar__profile-chevron--open" : ""}`} /> */}

          {profileOpen && (
            <>
              <div className="compact_profile-dropdown">
                <button onClick={(e) => { e.stopPropagation(); onNavigate("profile"); setProfileOpen(false); }}>
                  <UserRound size={17} /> My Profile
                </button>

                <button onClick={(e) => { e.stopPropagation(); onNavigate("settings"); setProfileOpen(false); }}>
                  <Settings size={17} /> Settings
                </button>

                <button onClick={(e) => { e.stopPropagation(); setProfileOpen(false); }}>
                  <LockKeyhole size={17} /> Privacy
                </button>


                <button onClick={(e) => { e.stopPropagation(); setProfileOpen(false); }}>
                  <ShieldCheck size={17} />  Security
                </button>

                <button onClick={(e) => { e.stopPropagation(); setProfileOpen(false); }}>
                  <FileSignature size={17} /> Credentials
                </button>

                <button onClick={(e) => { e.stopPropagation(); onNavigate("settings"); setProfileOpen(false); }}>
                  <Languages size={17} /> Language
                </button>

                <button className="logout" onClick={(e) => { e.stopPropagation(); setProfileOpen(false); }}>
                  <LogOut size={17} /> Logout
                </button>
              </div>
            </>
          )}
        </div>
  )
}

export default ProfileMenu


