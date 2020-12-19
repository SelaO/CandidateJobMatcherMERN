const Skill = require("./entities/skill");
const Candidate = require("./entities/candidate");
const Job = require("./entities/job");

const createOptions = { upsert: true, new: true, setDefaultsOnInsert: true };

// create a new candidate, add its skills if they don't exist
// connect skills to candidates and candidates to skills with a many to many relationship
const createCandidate = async (req) => {
  const obj = {
    title: req.title,
    skills: [],
  };
  try {
    const result = await new Candidate(obj).save();
    try {
      const promises = [];
      for (const skill of req.skills) {
        promises.push(
          Skill.findOneAndUpdate(
            { name: skill },
            { $push: { candidates: result._id } },
            createOptions
          )
        );
      }
      Promise.all(promises).then((documents) => {
        result.skills = documents.map((e) => e._id);
        result.save();
      });
    } catch (err) {
      console.log(err);
    }
  } catch (error) {
    console.error(error);
  }
};

// create a new job and add a skill if it doesn't exist
const createJob = (req) => {
  const obj = {
    title: req.title,
    skill: null,
  };
  new Job(obj)
    .save()
    .then((result) => {
      try {
        Skill.findOneAndUpdate({ name: req.skill }, {}, createOptions).then(
          (document) => {
            result.skill = document._id;
            result.save();
          }
        );
      } catch (err) {
        console.log(err);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const findBestCandidate = async (id) => {
  try {
    const job = await Job.findById(id).exec();

    if (job) {
      const search = `(${job.title.replaceAll(" ", "|")})`;
      const regex = new RegExp(search, "i"); // i for case insensitive
      const candidates = await Candidate.find({
        title: { $regex: regex },
      }).exec();

      return { candidates, job };
    } else {
      console.error(`didn't find jobid:${id}`);
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};

const getSomeCandidateBySkill = async (skillId) => {
  const skill = await Skill.findById(skillId);

  if (skill.candidates && skill.candidates.length > 0) {
    return await Candidate.findById(skill.candidates[0]);
  } else {
    console.error(`no candidates for skillId:${skillId}`);
    return null;
  }
};

const getSkillsNamesByIds = async (skillsIds) => {
  const skillEntities = await Skill.find({ _id: skillsIds });
  return skillEntities.map((e) => e.name);
};

const getSkillsIdsMap = async (skillsIds) => {
  const skillEntities = await Skill.find({ _id: skillsIds });

  const result = {};
  for (const s of skillEntities) {
    result[s._id] = s.name;
  }

  return result;
};

const getAllCandidates = async () => {
  console.log("trying to fetch all candidates");
  const candidates = await Candidate.find();
  const result = [];

  const allSkills = candidates.flatMap((e) => e.skills);
  const skillsMap = await getSkillsIdsMap(allSkills);
  for (const c of candidates) {
    result.push({
      title: c.title,
      skills: c.skills.map((e) => skillsMap[e]),
      id: c._id,
    });
  }

  return result;
};

const getAllJobs = async () => {
    console.log("trying to fetch all jobs");
    const jobs = await Job.find();
    const result = [];
  
    const allSkills = jobs.flatMap((e) => e.skill);
    const skillsMap = await getSkillsIdsMap(allSkills);
    for (const job of jobs) {
      result.push({
        title: job.title,
        skill: skillsMap[job.skill],
        id: job._id,
      });
    }
  
    return result;
  };

module.exports = {
  createCandidate,
  createJob,
  findBestCandidate,
  getSomeCandidateBySkill,
  getSkillsNamesByIds,
  getAllCandidates,
  getAllJobs,
};
