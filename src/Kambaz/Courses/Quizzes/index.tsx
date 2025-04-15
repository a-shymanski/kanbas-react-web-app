import { ListGroup, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuiz, setQuizzes } from "./reducer";
import { useEffect } from "react";
import * as coursesClient from "../client"
import * as quizzesClient from "./client";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

export default function Quizzes() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);
  const removeQuiz = async (quizId: any) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  return (
    <div>
      {currentUser?.role === "FACULTY" && (
        <div id="wd-quizzes-controls" className="text-nowrap mb-3">
          <Button variant="danger" size="lg" className="me-1 float-end"
            id="wd-add-quiz"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/new`)}>
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Quiz
          </Button>
          <Button variant="secondary" size="lg" className="me-2 float-end" id="wd-add-quiz-group">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
          </Button>
          <div className="input-group w-25">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch className="text-gray-500" />
            </span>
            <input placeholder="Search..." id="wd-search-quiz" className="form-control border-start-0" />
          </div>
        </div>
      )}
      <br />
      <ListGroup className="rounded-0" id="wd-quizzes">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />QUIZZES<ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {quizzes
              .map((quiz: any) => (
                <ListGroup.Item key={quiz._id}
                  className="wd-lesson p-3 ps-1 border-start border-success border-4 border-top-0 border-end-0 border-bottom-0 d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <LuNotebookPen className="me-2 fs-3" />
                  <div>
                    <a href={`#/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
                      className="fw-bold text-dark text-decoration-none">
                      {quiz.title}
                    </a>
                    <p className="text-muted mb-0">{quiz.details}</p>
                  </div>
                  <div className="ms-auto">
                    {currentUser?.role === "FACULTY" &&
                      <LessonControlButtons
                        quizId={quiz._id}
                        deleteQuiz={(quizId) => removeQuiz(quizId)}
                         />}
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}