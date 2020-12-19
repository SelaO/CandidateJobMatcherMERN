export const matchResultEnum = {
    FULL_TITLE_AND_SKILL: "FULL_TITLE_AND_SKILL",
    PARTIAL_TITLE_AND_SKILL: "PARTIAL_TITLE_AND_SKILL",
    FULL_TITLE: "FULL_TITLE",
    PARTIAL_TITLE: "PARTIAL_TITLE",
    SKILL: "SKILL",
  };
  
  export const matchReasons = {
    [matchResultEnum.FULL_TITLE_AND_SKILL]: "Matched by full title and a matching skill",
    [matchResultEnum.PARTIAL_TITLE_AND_SKILL]: "Matched by partial title and a matching skill",
    [matchResultEnum.FULL_TITLE]: "Matched by full title only",
    [matchResultEnum.PARTIAL_TITLE]: "Matched by partial title",
    [matchResultEnum.SKILL]: "Matched by skill only",
  };