import secureLocalStorage from "react-secure-storage";
export default function IsAdminLoggedIn() {
  const login_id = parseInt(secureLocalStorage.getItem("loguserid"), 10);

  // Ensuring base 10 for integer parsing
  if (isNaN(login_id) || login_id <= 0) {
    return false; // Return false if login_id is not a valid number or <= 0
  }
  return true; // Return true if login_id is a valid positive number
}