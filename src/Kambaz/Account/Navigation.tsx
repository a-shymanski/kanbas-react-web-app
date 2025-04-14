import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const location = useLocation();
  const active = (path: string) => (location.pathname.includes(path) ? "active" : "");
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      { !currentUser && (
      <>
      <Link to="/Kambaz/Account/Signin"   
      className={`list-group-item border border-0 ${location.pathname === "/Kambaz/Account/Signin" ? "active" : "text-danger"}`}> 
      Sign In  </Link> <br/>
      <Link to="/Kambaz/Account/Signup"
      className={`list-group-item border border-0 ${location.pathname === "/Kambaz/Account/Signup" ? "active" : "text-danger"}`}>
      Sign Up  </Link> <br/>
      </>
      )}
      { currentUser && (
      <>
      <Link to="/Kambaz/Account/Profile"
      className={`list-group-item border border-0 ${location.pathname === "/Kambaz/Account/Profile" ? "active" : "text-danger"}`}>
      Profile </Link> <br/>
      </>
      )}
      {currentUser && currentUser.role === "ADMIN" && (
       <Link to={`/Kambaz/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link> )}
    </div>
  );
}
