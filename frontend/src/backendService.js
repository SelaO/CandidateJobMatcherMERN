
const baseUrl = `http://localhost:3001`;

export function fetchJobs(setJobs) {
    fetch(`${baseUrl}/jobs`)
        .then((e) => (e.status === 404 ? null : e.json()))
        .then((response) => setJobs(response))
        .catch((error) => console.log(error));
}

export function fetchBestCandidate(selectedJobId, setBestCandidate) {
    fetch(`${baseUrl}/candidates/${selectedJobId}`)
        .then((e) => (e.status === 404 ? null : e.json()))
        .then((response) => setBestCandidate(response))
        .catch((error) => {
            console.log(error);
        });
}

export function fetchCandidates(setCandidates) {
    fetch(`${baseUrl}/candidates`)
    .then((e) => (e.status === 404 ? null : e.json()))
    .then((response) => setCandidates(response))
    .catch((error) => console.log(error));
}