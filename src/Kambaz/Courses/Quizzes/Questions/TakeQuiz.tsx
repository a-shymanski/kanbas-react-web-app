import { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import * as quizzesClient from "../client";

export default function QuizTaker() {
    const { qid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState<any>({});

    const fetchQuestions = async () => {
        const questions = await quizzesClient.findQuestionsForQuizAndUser(qid as string, currentUser._id);
        setQuestions(questions);
    };

    useEffect(() => {
        fetchQuestions();
    }, [qid]);

    const handleAnswerChange = (questionId: string, answerId: string) => {
        setUserAnswers((prev: any) => ({
            ...prev,
            [questionId]: answerId,
        }));
    };

    const handleSubmit = async () => {
        await quizzesClient.submitUserSubmissions(qid as string, userAnswers);
        console.log("User submitted answers:", userAnswers);
        alert("Quiz submitted! Check console for selected answers.");
    };
    
    return (
        <div>
            <h5>TAKE QUIZ</h5>
            <Form>
                {questions.map((question: any, index: number) => (
                    <div key={question._id} className="border rounded p-3 mb-4">
                        <Row className="mb-2">
                            <Col><strong>{index + 1}. {question.title}</strong></Col>
                            <Col className="text-end"><strong>Points:</strong> {question.points}</Col>
                        </Row>
                        <p>{question.question}</p>
                        {question.answers.map((answer: any) => (
                            <Form.Check
                                key={answer._id}
                                type="radio"
                                id={`${question._id}-${answer._id}`}
                                name={question._id}
                                label={answer.description}
                                checked={userAnswers[question._id] === answer._id}
                                onChange={() => handleAnswerChange(question._id, answer._id)}
                            />
                        ))}
                    </div>
                ))}
                <Button variant="primary" size="lg" onClick={handleSubmit}>
                    Submit Quiz
                </Button>
            </Form>
        </div>
    );
}