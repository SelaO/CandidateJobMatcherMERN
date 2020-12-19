const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require("./model/database");

const port = 3001;

// for cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const {
  createCandidate,
  findBestCandidate,
  getSomeCandidateBySkill,
  getSkillsNamesByIds,
  getAllCandidates,
  getAllJobs,
} = require("./model/dbUtils");
const { matchResultPrecedenceValueMap, matchResultMap } = require("./enums");

// CandidateFinder
app.get("/candidates/:jobId", async (req, res) => {
  console.log(`in CandidateFinder with job id:${req.params.jobId}`);
  const findBestCandidateResult = await findBestCandidate(req.params.jobId);
  if (findBestCandidateResult === null) {
    res.status(404).send(new Error("Job not found"));
    return;
  }
  const { candidates, job } = findBestCandidateResult;

  // what we return will be in the following order:
  // 1. full title match and skill match
  // 2. partial title match and skill match
  // 3. full title match
  // 4. partial title match
  // 5. skill match

  const bestMatch = {
    candidate: null,
    matchReason: Number.MAX_VALUE,
  };

  console.log(
    matchResultPrecedenceValueMap,
    matchResultPrecedenceValueMap.FULL_TITLE
  );
  for (const c of candidates) {
    const skillMatch = c.skills.indexOf(job.skill) >= 0;
    if (c.title === job.title) {
      if (skillMatch) {
        bestMatch.candidate = c;
        bestMatch.matchReason =
          matchResultPrecedenceValueMap.FULL_TITLE_AND_SKILL;
        console.log("found candidate by full title and skill: ", c);
        break;
      } else if (
        bestMatch.matchReason > matchResultPrecedenceValueMap.FULL_TITLE
      ) {
        bestMatch.candidate = c;
        bestMatch.matchReason = matchResultPrecedenceValueMap.FULL_TITLE;
      }
    } else if (
      skillMatch &&
      bestMatch.matchReason >
        matchResultPrecedenceValueMap.PARTIAL_TITLE_AND_SKILL
    ) {
      bestMatch.candidate = c;
      bestMatch.matchReason =
        matchResultPrecedenceValueMap.PARTIAL_TITLE_AND_SKILL;
      // no break because we might find a better candidate later
    } else if (
      bestMatch.matchReason > matchResultPrecedenceValueMap.PARTIAL_TITLE
    ) {
      bestMatch.candidate = c;
      bestMatch.matchReason = matchResultPrecedenceValueMap.PARTIAL_TITLE;
    }
  }

  if (bestMatch.candidate === null) {
    // no match by title, need to find by skill only
    const getSomeCandidateBySkillResult = await getSomeCandidateBySkill(
      job.skill
    );
    console.log(
      "found candidate by skill only: ",
      getSomeCandidateBySkillResult
    );
    if (getSomeCandidateBySkillResult) {
      bestMatch.candidate = getSomeCandidateBySkillResult;
      bestMatch.matchReason = matchResultPrecedenceValueMap.SKILL;
    }
  }

  if (bestMatch.candidate != null) {
    bestMatch.matchReason = matchResultMap[bestMatch.matchReason];
    const skillNames = await getSkillsNamesByIds(bestMatch.candidate.skills);
    bestMatch.candidate = {
      title: bestMatch.candidate.title,
      skills: skillNames,
      id: bestMatch.candidate.id,
    };
    console.log("CandidateFinder result: ", bestMatch);
    res.send(bestMatch);
  } else {
    const errMessage = `Couldn't find a match for jobId: ${req.params.jobId}`;
    console.error(errMessage);
    res.status(404).send(new Error(errMessage));
  }
});

app.get("/candidates", async (req, res) => {
  const result = await getAllCandidates();
  res.send(result);
});

app.get("/jobs", async (req, res) => {
  const result = await getAllJobs();
  res.send(result);
});

app.post("/candidates", async (req, res) => {
  const candidate = await createCandidate(req.body);
  res.send({
    title: candidate.title,
    skills: candidate.skills,
    id: candidate._id,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log();
});
