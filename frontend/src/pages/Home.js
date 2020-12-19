import React, { useState, useEffect } from "react";
import styled from "styled-components";
import JobCard from "../components/JobCard";
import CandidateCard from "../components/CandidateCard";
import {fetchBestCandidate, fetchJobs} from '../backendService';

const MainDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  padding: 50px;
`;

export default function Home() {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [bestCandidate, setBestCandidate] = useState(null);

  useEffect(() => {
    fetchJobs(setJobs);
  }, []);

  useEffect(() => {
    if (selectedJobId) {
      fetchBestCandidate(selectedJobId, setBestCandidate);
    }
  }, [selectedJobId]);

  return (
    <MainDiv>
      <div>
        <h3>Available Jobs</h3>
        {jobs.map((e, i) => (
          <JobCard key={i} {...e} onClick={setSelectedJobId} />
        ))}
      </div>
      <div>
        <h3>Best Candidate For Selected Job</h3>
        {bestCandidate ? <CandidateCard {...bestCandidate} /> : "N/A"}
      </div>
    </MainDiv>
  );
}

