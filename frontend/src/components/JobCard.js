import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
} from "reactstrap";

import styled from "styled-components";

const CenteredCol = styled.div` 
  align-self: center;
`;


const MyCard = styled(Card)`
  margin: 5px 0;
  width: 600px;
`;

const MyButton = styled(Button)`
  &&& {
    background-color: #cd204d;
    color: white;
  }
`;

const MyRow = styled.div` 
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 5px;
`

const JobCard = (props) => {
  const { title, skill, onClick, id } = props;
  return (
    <MyCard>
      <MyRow>
          <CenteredCol>
            <CardTitle tag="h5">Job: {title}</CardTitle>
            <CardSubtitle tag="h5">Required Skill: {skill}</CardSubtitle>
          </CenteredCol>
        <CenteredCol>
          {onClick ? (
            <MyButton onClick={() => onClick(id)}>Find Best Candidate</MyButton>
          ) : null}
        </CenteredCol>
      </MyRow>
    </MyCard>
  );
};

export default JobCard;
