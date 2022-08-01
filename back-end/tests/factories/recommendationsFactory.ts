import { prisma } from "../../src/database.js";
import { CreateRecommendationData } from "../../src/services/recommendationsService.js";

export function validBody() {
  const body: CreateRecommendationData = {
    name: "mockVideo",
    youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
  };

  return body;
}

export async function getIdByName(name: string) {
  const result = await prisma.recommendation.findFirst({
    where: {
      name,
    },
  });
  return result.id;
}

export function expectedObject(id: number) {
  const object = {
    id,
    name: "mockVideo",
    youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
    score: 0,
  };

  return object;
}
