type Plan = "FREE" | "PRO" | "TEAMS";

const PRO_PLANS: Plan[] = ["PRO", "TEAMS"];

export function canAccessLesson(userPlan: Plan, lessonIsFree: boolean): boolean {
  if (lessonIsFree) return true;
  return PRO_PLANS.includes(userPlan);
}

export function canUseAITutor(userPlan: Plan): boolean {
  return PRO_PLANS.includes(userPlan);
}

export function canDownloadAudio(userPlan: Plan): boolean {
  return PRO_PLANS.includes(userPlan);
}

export function canGenerateCertificate(userPlan: Plan): boolean {
  return PRO_PLANS.includes(userPlan);
}

export function canAccessTeamFeatures(userPlan: Plan): boolean {
  return userPlan === "TEAMS";
}

export function getPlanLimits(userPlan: Plan) {
  switch (userPlan) {
    case "FREE":
      return {
        aiTutorRequests: 0,
        audioDownloads: 0,
        spacedRepDecks: 3,
      };
    case "PRO":
      return {
        aiTutorRequests: 100,
        audioDownloads: 50,
        spacedRepDecks: Infinity,
      };
    case "TEAMS":
      return {
        aiTutorRequests: Infinity,
        audioDownloads: Infinity,
        spacedRepDecks: Infinity,
      };
  }
}
