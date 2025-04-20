import { useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import * as quizzesClient from "../client";
import * as questionsClient from "./client"
import { addQuestion, deleteQuestion, editQuestion, setQuestions } from "./reducer";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import SingleQuestionEditor from "./SingleQuestionEditor";


export default function QuestionsEditor() {
    const { qid } = useParams();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { questions } = useSelector((state: any) => state.questionsReducer);
    const handleAdd = async () => {
        const newQuestion = {
            _id: uuidv4(),
            title: "Create Title",
            question: "Write Question",
            quiz: qid,
            user: currentUser,
            type: "Multiple Choice",
            points: "1",
            answers: [
                {
                    _id: uuidv4(),
                    description: "Answer description",
                    correct: true,
                },
            ],
        };
        const addedQuestion = await quizzesClient.createQuestionForQuiz(qid as string, newQuestion);
        dispatch(addQuestion(addedQuestion));
    };
    const handleDelete = async (questionId: string) => {
        await questionsClient.deleteQuestion(questionId);
        dispatch(deleteQuestion(questionId));
    }
    const fetchQuestions = async () => {
        const questions = await quizzesClient.findQuestionsForQuizAndUser(qid as string, currentUser._id);
        dispatch(setQuestions(questions));
    };
    useEffect(() => {
        fetchQuestions();
    }, [qid]);

    return (
        <div>
            <h5>QUESTIONS EDITOR</h5>

            <ul id="wd-questions" className="list-group rounded-0">
                {questions && questions
                    .map((question: any) => (
                        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray" key={question._id}>
                            {question.editing ? (
                                <SingleQuestionEditor question={question} />
                            ) : (
                                <Form>
                                    <Row className="mb-3">
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label><strong>Question Title</strong></Form.Label>
                                                <br />
                                                <Form.Label id="wd-description"> {question.title}</Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label><strong>Question Type</strong></Form.Label>
                                                <br />
                                                <Form.Label id="wd-type"> {question.type}</Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label><strong>Points</strong></Form.Label>
                                                <br />
                                                <Form.Label id="wd-points"> {question.points}</Form.Label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label><strong>Question</strong></Form.Label>
                                        <br />
                                        <Form.Label id="wd-question"> {question.question}</Form.Label>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label><strong>Answers</strong></Form.Label>
                                        <br />
                                        {question.answers && question.answers
                                            .map((answer: any) => (
                                                <div>
                                                    <Form.Label id="wd-answers"> {answer.description || "NOTHING"}</Form.Label>
                                                    <br />
                                                </div>
                                            ))}
                                    </Form.Group>
                                    <Button variant="danger" size="sm" className="me-1 float-end mb-1" id="wd-delete-question-btn"
                                        onClick={() => handleDelete(question._id)}>
                                        <FaTrash className="position-relative me-2" style={{ bottom: "1px" }} />
                                        DELETE
                                    </Button>
                                    <Button variant="primary" size="sm" className="me-1 float-end mb-1" id="wd-edit-question-btn"
                                        onClick={() => dispatch(editQuestion(question._id))}>
                                        <FaPencil className="position-relative me-2" style={{ bottom: "1px" }} />
                                        EDIT
                                    </Button>
                                </Form>
                            )}
                        </li>
                    ))
                }
            </ul>
            <hr />
            <Button variant="secondary" size="lg" className="me-1 float-middle" id="wd-new-question-btn"
                onClick={handleAdd}>
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                New Question
            </Button>
        </div >
    );
}