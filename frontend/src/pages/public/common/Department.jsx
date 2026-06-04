import "../../../styles/Public/department.css";

function Department({ department, onClick }) {
  return (
    <div
      className="department-card"
      onClick={() => onClick(department)}
    >
      <div className="department-icon-container">
        <img
          src={department.icon}
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