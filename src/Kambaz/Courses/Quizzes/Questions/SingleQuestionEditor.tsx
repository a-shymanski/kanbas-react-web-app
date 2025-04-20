import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateQuestion, cancelEditQuestion } from "./reducer";
import * as questionsClient from "./client"
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaTrash, FaPlus } from "react-icons/fa";

export default function SingleQuestionEditor({ question }: { question: any }) {
    const [editingQuestion, setEditingQuestion] = useState({
        _id: question._id,
        title: question.title,
        question: question.question,
        quiz: question.quiz,
        user: question.user,
        type: question.type,
        points: question.points,
        answers: question.answers,
    });
    const handleSave = async (updatedQuestion: any) => {
        await questionsClient.updateQuestion(updatedQuestion);
        dispatch(updateQuestion(updatedQuestion));
    };
    const handleCorrectAnswer = (answerId: string) => {
        const updatedAnswers = editingQuestion.answers.map((answer: any) => ({
            ...answer,
            correct: answer._id === answerId
        }));
        setEditingQuestion({
            ...editingQuestion,
            answers: updatedAnswers
        });
    };
    const handleAnswerChange = (answerId: string, newDescription: string) => {
        const updatedAnswers = editingQuestion.answers.map((answer: any) =>
            answer._id === answerId
                ? { ...answer, description: newDescription }
                : answer
        );
        setEditingQuestion({
            ...editingQuestion,
            answers: updatedAnswers
        });
    };
    const handleAddAnswer = () => {
        const newAnswer = {
            _id: uuidv4(),
            description: "New answer",
            correct: editingQuestion.answers.length === 0
        };
        setEditingQuestion({
            ...editingQuestion,
            answers: [...editingQuestion.answers, newAnswer]
        });
    };
    const handleDeleteAnswer = (answerId: string) => {
        const updatedAnswers = editingQuestion.answers.filter((answer: any) => answer._id !== answerId);

        if (editingQuestion.answers.find((a: any) => a._id === answerId)?.correct && updatedAnswers.length > 0) {
            updatedAnswers[0].correct = true;
        }

        setEditingQuestion({
            ...editingQuestion,
            answers: updatedAnswers
        });
    };
    const dispatch = useDispatch();
    return (
        <div>
            <Form>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label><strong>Question Title</strong></Form.Label>
                            <Form.Control
                                id="wd-title"
                                defaultValue={question.title}
                                onChange={(e) => setEditingQuestion({ ...editingQuestion, title: e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label><strong>Question Type</strong></Form.Label>
                            <Form.Select
                                defaultValue={question.type}
                                onChange={(e) => setEditingQuestion({ ...editingQuestion, type: e.target.value })}
                                id="wd-select-type"
                            >
                                <option value="Multiple Choice">Multiple Choice</option>
                                <option value="True/False">True/False</option>
                                <option value="Fill In">Fill In</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label><strong>Points</strong></Form.Label>
                            <Form.Control id="wd-points" defaultValue={question.points} onChange={(e) => setEditingQuestion({ ...editingQuestion, points: e.target.value })} />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label><strong>Question</strong></Form.Label>
                    <Form.Control as="textarea" id="wd-question" defaultValue={question.question} onChange={(e) => setEditingQuestion(({ ...editingQuestion, question: e.target.value }))} rows={5} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label><strong>Answers</strong></Form.Label>
                    {editingQuestion.answers && editingQuestion.answers.map((answer: any) => (
                        <Row className="mb-2 align-items-center">
                            <Col md={1}>
                                <Form.Check
                                    type="radio"
                                    id={`answer-radio-${answer._id}`}
                                    name="correctAnswer"
                                    checked={answer.correct}
                                    onChange={() => handleCorrectAnswer(answer._id)}
                                    label=""
                                />
                            </Col>
                            <Col md={9}>
                                <Form.Control
                                    value={answer.description}
                                    onChange={(e) => handleAnswerChange(answer._id, e.target.value)}
                                    placeholder="Answer text"
                                />
                            </Col>
                            <Col md={2}>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="me-1"
                                    onClick={() => handleDeleteAnswer(answer._id)}>
                                    <FaTrash className="danger"/> Delete
                                </Button>
                            </Col>
                        </Row>
                    ))}
                    <br />
                    <Button
                        variant="success"
                        size="sm"
                        className="mt-2"
                        onClick={handleAddAnswer}>
                        <FaPlus className="me-1" /> Add Answer
                    </Button>
                </Form.Group>
                <Button variant="secondary" size="sm" className="me-1 float-start mb-1" id="wd-cancel-question-btn"
                    onClick={() => dispatch(cancelEditQuestion(question._id))}>
                    CANCEL
                </Button>
                <Button variant="danger" size="sm" className="me-1 float-start mb-1" id="wd-cancel-question-btn"
                    onClick={() => handleSave({ ...editingQuestion, editing: false })}>
                    SAVE
                </Button>
            </Form>
        </div>
    );
}