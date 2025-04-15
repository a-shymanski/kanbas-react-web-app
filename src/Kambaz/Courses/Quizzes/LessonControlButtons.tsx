import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
export default function LessonControlButtons({ quizId, deleteQuiz }: { quizId: string; deleteQuiz: (quizId: string) => void }) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to remove this quiz?")) {
      deleteQuiz(quizId);
    }
  };
  return (
    <div className="float-end">
      <FaTrash className="text-danger me-2 mb-1" onClick={handleDelete} />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
