import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

interface Props {
  category: ICategory;
  showModal: (value: boolean) => void;
  setEditForm:(value: boolean) => void;
  categoryToEdit: (id: string) => void;
  categoryDeletion: (id: string) => void;
}

const CategoryCard: React.FC<Props> =
  ({category, categoryToEdit, showModal, setEditForm, categoryDeletion}) => {
  const handleEdit = () => {
    categoryToEdit(category.id);
    setEditForm(true);
    showModal(true);
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>{category.name}</Col>
          <Col className={category.type === "expense"? "text-danger" : "text-success"}>{category.type}</Col>
          <Col>
            <Button
              variant="outline-primary"
              onClick={handleEdit}
            >Edit</Button>
            <Button
              variant="outline-danger"
              onClick={() => categoryDeletion(category.id)}
              className="ms-3"
            >Delete</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;