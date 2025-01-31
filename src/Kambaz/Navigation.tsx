import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
export default function KambazNavigation() {
  const location = useLocation();
  return (
    <div id="wd-kambaz-navigation" style={{ width: 105 }}
      className="list-group rounded-0 position-fixed
     bottom-0 top-0 d-none d-md-block bg-black z-2">
      <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank"
        className="list-group-item bg-black border-0 text-center"><img src="/images/NEU.png" width="75px" /></a>
      <Link to="/Kambaz/Account" id="wd-account-link" className={`account-item list-group-item text-center border-0 ${location.pathname.startsWith("/Kambaz/Account") ? "active" : ""}`}>
        <FaRegCircleUser className="fs-1 icon" /><br />Account</Link>

      <Link to="/Kambaz/Dashboard" id="wd-dashboard-link" className={`link-item list-group-item text-center border-0 ${location.pathname === "/Kambaz/Dashboard" ? "active" : ""}`}>
        <AiOutlineDashboard className="fs-1 icon" /><br />Dashboard</Link>

      <Link to="/Kambaz/Courses" id="wd-course-link" className={`link-item list-group-item text-center border-0 ${location.pathname.startsWith("/Kambaz/Courses") ? "active" : ""}`}>
        <LiaBookSolid className="fs-1 icon" /><br />Courses</Link>

      <Link to="/Kambaz/Calendar" id="wd-calendar-link" className={`link-item list-group-item text-center border-0 ${location.pathname === "/Kambaz/Calendar" ? "active" : ""}`}>
        <IoCalendarOutline className="fs-1 icon" /><br />Calendar</Link>

      <Link to="/Kambaz/Inbox" id="wd-inbox-link" className={`link-item list-group-item text-center border-0 ${location.pathname === "/Kambaz/Inbox" ? "active" : ""}`}>
        <FaInbox className="fs-1 icon" /><br />Inbox</Link>

      <Link to="/Labs" id="wd-labs-link" className={`link-item list-group-item text-center border-0 ${location.pathname === "/Labs" ? "active" : ""}`}>
        <LiaCogSolid className="fs-1 icon" /><br />Labs</Link>
    </div>
  );
}
