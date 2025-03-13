import { useState } from "react";
import { Button, ListGroup, Container } from "react-bootstrap";
export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (index: number) => {
        setArray(array.filter((_item, i) => i !== index));
    };
    return (
        <Container className="mt-3">
            <h2 className="mb-3">Array State Variable</h2>
            <Button variant="success" className="mb-3" id="wd-add-element" onClick={addElement}>
                Add Element
            </Button>
            <ListGroup>
                {array.map((item, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center" style={{ fontSize: "1.5rem", padding: "15px" }}>
                        {item}
                        <Button variant="danger" size="lg" id="wd-delete-element" onClick={() => deleteElement(index)}>
                            Delete
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}
