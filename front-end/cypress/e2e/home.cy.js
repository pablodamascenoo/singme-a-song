/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

describe("home page tests", () => {
  const songName = faker.music.songName();
  const youtubeURI = `https://www.youtube.com/watch?v=`;

  it("invalid create recommendation", () => {
    cy.resetAndSeed();
    cy.visit("http://localhost:3000");
    cy.get("input")
      .last()
      .type(youtubeURI + faker.random.alphaNumeric(11));
    cy.get("button").click();
    cy.on("window:alert", (t) => {
      expect(t).to.contains("Error creating recommendation!");
    });
  });

  it("valid create recommendation", () => {
    cy.get("input").first().type(songName);
    cy.get("input")
      .last()
      .type(youtubeURI + faker.random.alphaNumeric(11));
    cy.intercept("POST", "/recommendations").as("postRecommendation");
    cy.get("button").click();
    cy.wait("@postRecommendation");
    cy.contains(songName).should("be.visible");
    cy.end();
  });

  it("upvote recommendation", () => {
    cy.get("#root article:first div:last").should("have.text", "0");
    cy.get("#root article:first div:last svg:first").click();
    cy.get("#root article:first div:last").should("have.text", "1");
    cy.end();
  });

  it("remove recommendation with downvote lower than -5", () => {
    cy.get("#root article:last div:last").should("have.text", "-5");
    cy.get("#root article:last div:last svg:last").click();
    cy.contains("badVideo").should("not.exist");
    cy.end();
  });
});
