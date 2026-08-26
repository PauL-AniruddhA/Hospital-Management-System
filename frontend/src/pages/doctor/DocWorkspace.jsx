import React from 'react'
import { FileText } from "lucide-react";
import Hospital_Brand from "../../components/common/Hospital_Brand";
import Search_Bar from '../../components/ui/Search';
import ProfileMenu from '../../components/ui/ProfileMenu';
import Calender from '../../components/ui/ClockCalendarCard';

export default function DocWorkspace   () {
  return (
    <div className="coming-soon">
      <FileText size={40} strokeWidth={1.5} />
      <h2 className="coming-soon__title"> Doctor Workspace  </h2>
      <p className="coming-soon__desc">This section is under construction.</p>
    <Hospital_Brand/>
    <br />
    <Search_Bar/>
    <br/>
      {/* <ProfileMenu  variant="doctor" avatar={""} name="Dr. Rajesh Sharma" role="Cardiologist" onNavigate={""} /> */}
    <br/>
    <Calender/>
    </div>
  );
}



