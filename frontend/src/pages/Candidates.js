import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CandidateCard from "../components/CandidateCard";
import {fetchCandidates} from '../backendService';

const MainDiv = styled.div`
  display: grid;
  grid-column-gap: 10px;
  padding: 50px;
`;

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates(setCandidates);
  }, []);

  console.log(candidates);
  return (
    <MainDiv>
      <div>
        <h3>Available Candidates</h3>
        {candidates.map((e, i) => (
          <CandidateCard key={i} candidate={e} />
        ))}
      </div>
    </MainDiv>
  );
}
