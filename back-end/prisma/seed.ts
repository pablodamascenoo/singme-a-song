import { prisma } from "../src/database.js";
import crypto from "node:crypto";
import { faker } from "@faker-js/faker";

async function main() {
  const youtubeURI = "https://www.youtube.com/watch?v=";

  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;

  await prisma.recommendation.createMany({
    data: [
      {
        name: faker.music.songName(),
        youtubeLink: youtubeURI + crypto.randomBytes(11).toString("hex"),
        score: 15,
      },
      {
        name: faker.music.songName(),
        youtubeLink: youtubeURI + crypto.randomBytes(11).toString("hex"),
        score: 10,
      },
      {
        name: faker.music.songName(),
        youtubeLink: youtubeURI + crypto.randomBytes(11).toString("hex"),
        score: -5,
      },
      {
        name: faker.music.songName(),
        youtubeLink: youtubeURI + crypto.randomBytes(11).toString("hex"),
      },
      {
        name: faker.music.songName(),
        youtubeLink: youtubeURI + crypto.randomBytes(11).toString("hex"),
      },
      {
        name: faker.music.songName(),
        youtubeLink: youtubeURI + crypto.randomBytes(11).toString("hex"),
      },
      {
        name: faker.music.songName(),
        youtubeLink: youtubeURI + crypto.randomBytes(11).toString("hex"),
      },
      {
        name: faker.music.songName(),
        youtubeLink: youtubeURI + crypto.randomBytes(11).toString("hex"),
      },
      {
        name: faker.music.songName(),
        youtubeLink: youtubeURI + crypto.randomBytes(11).toString("hex"),
      },
      {
        name: faker.music.songName(),
        youtubeLink: youtubeURI + crypto.randomBytes(11).toString("hex"),
      },
    ],
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
