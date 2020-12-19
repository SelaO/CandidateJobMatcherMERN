import React from "react";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import styled from "styled-components";
import {matchReasons} from './CommonEnums';

const MyCard = styled(Card)`
    margin: 5px;
    width: 600px;
`

const CandidateCard = (props) => {
  const { candidate, matchReason } = props;
  let title, skills;
  if (candidate) {
    title = candidate.title;
    skills = candidate.skills;
  }

  return (
    <div>
      <MyCard>
        <CardBody>
          <CardTitle tag="h5">Title: {title}</CardTitle>
          {matchReason ? <CardTitle tag="h6">{matchReasons[matchReason]}</CardTitle> : null}
          <CardSubtitle tag="h6">Skills:</CardSubtitle>
          <CardText>{skills && skills.length > 0 ? skills.join(", ") : ''}</CardText>
        </CardBody>
      </MyCard>
    </div>
  );
};

export default CandidateCard;
