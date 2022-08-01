import { prisma } from "../database.js";

export async function reset() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
}

export async function seed() {
  await prisma.recommendation.create({
    data: {
      name: "badVideo",
      youtubeLink: "https://www.youtube.com/watch?v=aJ21VdjasiA",
      score: -5,
    },
  });
}

const testsRepository = {
  reset,
  seed,
};

export default testsRepository;
