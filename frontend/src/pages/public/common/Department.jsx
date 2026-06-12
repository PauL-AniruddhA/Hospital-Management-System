import "../../../styles/Public/department.css";
// import departments from "../../../mock/depertment";
function Department({ department, onClick ,className=""}) {
  return (
    <div  className={`department-card ${className}`} onClick={() => onClick(department)}>
      <div className="department-icon-container">
        <img
          src={department.image}
          alt={department.name}
          className="department-icon"
        />
      </div>

      <h3 className="department-name">
        {department.name}
      </h3>
    </div>
  );
}

export default Department;