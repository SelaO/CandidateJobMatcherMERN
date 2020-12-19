
const matchResultEnum = {
    FULL_TITLE_AND_SKILL: "FULL_TITLE_AND_SKILL",
    PARTIAL_TITLE_AND_SKILL: "PARTIAL_TITLE_AND_SKILL",
    FULL_TITLE: "FULL_TITLE",
    PARTIAL_TITLE: "PARTIAL_TITLE",
    SKILL: "SKILL",
  };
  
  const matchResultPrecedenceValueMap = {
    [matchResultEnum.FULL_TITLE_AND_SKILL]: 0,
    [matchResultEnum.PARTIAL_TITLE_AND_SKILL]: 1,
    [matchResultEnum.FULL_TITLE]: 2,
    [matchResultEnum.PARTIAL_TITLE]: 3,
    [matchResultEnum.SKILL]: 4,
  };
  
  const matchResultMap = {
    0: [matchResultEnum.FULL_TITLE_AND_SKILL],
    1: [matchResultEnum.PARTIAL_TITLE_AND_SKILL],
    2: [matchResultEnum.FULL_TITLE],
    3: [matchResultEnum.PARTIAL_TITLE],
    4: [matchResultEnum.SKILL],
  };

  module.exports = {
    matchResultEnum,
    matchResultPrecedenceValueMap,
    matchResultMap
  }