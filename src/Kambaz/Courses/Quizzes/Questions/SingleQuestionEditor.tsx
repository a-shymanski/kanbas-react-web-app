import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateQuestion, cancelEditQuestion } from "./reducer";
import * as questionsClient from "./client"
import { useState } from "react";

export default function SingleQuestionEditor({ question }: { question: any }) {
    const [editingQuestion, setEditingQuestion] = useState({
        title: question.title,
        question: question.question,
        quiz: question.quiz,
        user: question.user,
        type: question.type,
        points: question.points,
        answers: question.answers,
    });
    const handleSave = async (question: any) => {
        await questionsClient.updateQuestion(question);
        dispatch(updateQuestion(question));
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
                            <Form.Control id="wd-points" defaultValue={question.points} onChange={(e) => setEditingQuestion({ ...question, points: e.target.value })} />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label><strong>Question</strong></Form.Label>
                    <Form.Control as="textarea" id="wd-question" defaultValue={question.question} onChange={(e) => setEditingQuestion(({ ...question, question: e.target.value }))} rows={5} />
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