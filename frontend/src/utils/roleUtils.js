export const getRole = () => localStorage.getItem("role");

export const setRole = (role) => {
  localStorage.setItem("role", role);
};

export const removeRole = () => {
  localStorage.removeItem("role");
};

export const isAdmin = () => getRole() === "ADMIN";
export const isDoctor = () => getRole() === "DOCTOR";
export const isPatient = () => getRole() === "PATIENT";
export const isReceptionist = () => getRole() === "RECEPTIONIST";