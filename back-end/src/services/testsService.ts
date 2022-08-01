import testsRepository from "../repositories/testsRepository.js";

export async function resetDatabase() {
  await testsRepository.reset();
}

export async function seedBadVideo() {
  await testsRepository.seed();
}

const testsService = {
  resetDatabase,
  seedBadVideo,
};

export default testsService;
