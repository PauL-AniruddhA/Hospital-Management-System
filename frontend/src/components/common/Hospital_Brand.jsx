import React from "react";
import { Cross } from "lucide-react";
import "../../styles/Components/Common/Hospital-Brand.css";

function Hospital_Brand({ entity = "default", name = "AMS", tagline = "HOSPITAL", icon: Icon = Cross }) {
  return (
    <div className="hospital-logo" data-entity={entity}>
        <span className="hospital-logo__icon">
        <Icon size={20} strokeWidth={2.5} />
        </span>
        <div className="hospital-logo__text">
            <span className="hospital-logo__name">{name} </span>
            <span className="hospital-logo__tagline">{tagline}</span>
        </div>
    </div>
  );
}

export default Hospital_Brand;