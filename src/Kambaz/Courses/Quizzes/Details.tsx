import { ListGroup, Button, Container } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as quizzesClient from "./client";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState({
    _id: "",
    title: "",
    course: "",
    points: -1,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    details: "",
    link: "",
    type: "Graded Quiz",
    group: "Quizzes",
    shuffle: true,
    timeLimit: -1,
    multipleAttempts: false,
    numAttempts: -1,
    showCorrect: "Immediately",
    code: 12345,
    oneAtATime: true,
    webcam: true,
    lock: true,
  });
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchQuiz = async () => {
    const quiz = await quizzesClient.findQuiz(qid as string);
    setQuiz(quiz);
    return quiz;
  };
  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <Container>
      <h2>
        {quiz.title}
        <Button
          variant="danger"
          className="ms-3"
          onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/QuestionsEditor`)}>
          Editor
        </Button>
      </h2>
      <div className="row">
        <div className="col">
          <div className="float-end">
            <strong>
              Quiz Type
              <br />
              Points
              <br />
              Assignment Group
              <br />
              Shuffle answers
              <br />
              Time limt
              <br />
              Multiple Attempts
              {quiz.multipleAttempts ? <br /> : ""}
              {quiz.multipleAttempts ? "Number of Attempts" : ""}
              <br />
              View Responses
              <br />
              One Question at a Time
              <br />
              Webcam Required
              <br />
              Lock Questions After Answering
            </strong>
          </div>
        </div>
        <div className="col">
          <div className="float-start">
            {quiz.type}
            <br />
            {quiz.points}
            <br />
            {quiz.group}
            <br />
            {quiz.shuffle ? "Yes" : "No"}
            <br />
            {quiz.timeLimit} Minutes
            <br />
            {quiz.multipleAttempts ? "Yes" : "No"}
            {quiz.multipleAttempts ? <br /> : ""}
            {quiz.multipleAttempts ? quiz.numAttempts : ""}
            <br />
            {quiz.showCorrect}
            <br />
            {quiz.oneAtATime ? "Yes" : "No"}
            <br />
            {quiz.webcam ? "Yes" : "No"}
            <br />
            {quiz.lock ? "Yes" : "No"}
          </div>
        </div>
      </div>
    </Container>
  );
}
