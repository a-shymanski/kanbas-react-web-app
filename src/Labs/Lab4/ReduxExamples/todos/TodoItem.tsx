import { ListGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  const dispatch = useDispatch();
  return (
    <ListGroup.Item className="d-flex align-items-center">
      <span className="flex-grow-1">{todo.title}</span>
      <Button variant="primary" className="me-1"
              onClick={() => dispatch(setTodo(todo))}
              id="wd-set-todo-click"> Edit </Button>
      <Button variant="danger"
              onClick={() => dispatch(deleteTodo(todo.id))}
              id="wd-delete-todo-click"> Delete </Button>
    </ListGroup.Item>);}
