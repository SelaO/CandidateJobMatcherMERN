const { createCandidate, createJob, findBestCandidate } = require("./model/dbUtils");

require("./model/database");

// candidates

createCandidate({
  title: "software developer",
  skills: ["C", "C++", "C#", "js", "R", "python", "rockstar"],
});

createCandidate({
  title: "software developer",
  skills: ["C"],
});

createCandidate({
  title: "software developer",
  skills: ["C", "C++", "C#"],
});

createCandidate({
  title: "software engineer",
  skills: ["ninja", "python"],
});

createCandidate({
  title: "software developer",
  skills: ["AWS"],
});

createCandidate({
  title: "cat walker",
  skills: ["ninja"],
});

createCandidate({
    title: "cat",
    skills: ["sleeping", "eating", "meowing", "purring"],
  });
  

// jobs

createJob({
  title: "unrelated job title",
  skill: "AWS",
});

createJob({
  title: "software developer",
  skill: "rockstar",
});

createJob({
  title: "software engineer",
  skill: "AWS",
});

createJob({
  title: "CEO",
  skill: "people skills",
});

createJob({
  title: "cat walker",
  skill: "cats",
});

createJob({
    title: "cat patter",
    skill: "patting",
  });