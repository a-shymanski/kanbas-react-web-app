import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";
export default function ModuleControlButtons() {
  return (
    <div className="float-end">
      <Button variant="secondary" size="sm" className="fs-4">
        40% of Total</Button>
      <FaPlus className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div> );}