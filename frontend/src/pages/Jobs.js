import React, { useState, useEffect } from "react";
import styled from "styled-components";
import JobCard from "../components/JobCard";
import {fetchJobs} from '../backendService';

const MainDiv = styled.div`
  display: grid;
  grid-column-gap: 10px;
  padding: 50px;
`;

export default function Jobs() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchJobs(setCandidates);
  }, []);

  return (
    <MainDiv>
      <div>
        <h3>Available Jobs</h3>
        {candidates.map((e, i) => (
          <JobCard key={i} {...e} />
        ))}
      </div>
    </MainDiv>
  );
}
