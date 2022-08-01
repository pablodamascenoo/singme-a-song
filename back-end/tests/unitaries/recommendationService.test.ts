import { jest } from "@jest/globals";
import { recommendationService } from "../../src/services/recommendationsService.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { validBody } from "../factories/recommendationsFactory.js";

describe("recommendations service post tests", () => {
  it("create recommendation", async () => {
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});
    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {});
    const recommendation = validBody();
    await recommendationService.insert(recommendation);
    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.create).toBeCalled();
  });

  it("conflict on same name recommendations", async () => {
    const recommendation = validBody();
    const recommendationData = { ...recommendation, id: 1, score: 0 };
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {
        return recommendationData;
      });

    const response = recommendationService.insert(recommendation);

    expect(response).rejects.toEqual({
      message: "Recommendations names must be unique",
      type: "conflict",
    });
  });

  it("upvote recommendation", async () => {
    const recommendation = validBody();
    const recommendationData = { ...recommendation, id: 1, score: 0 };
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => recommendationData);
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {});

    await recommendationService.upvote(recommendationData.id);

    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });

  it("not found upvote recommendation", async () => {
    const recommendation = validBody();
    const recommendationData = { ...recommendation, id: 1, score: 0 };

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {});

    const response = recommendationService.upvote(recommendationData.id);

    expect(response).rejects.toEqual({ message: "", type: "not_found" });
  });

  it("downvote recommendation", async () => {
    const recommendation = validBody();
    const recommendationData = { ...recommendation, id: 1, score: 0 };
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => recommendationData);
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return { ...recommendationData, score: 1 };
      });

    await recommendationService.downvote(recommendationData.id);

    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });

  it("delete recommendation whit score less than -5", async () => {
    const recommendation = validBody();
    const recommendationData = { ...recommendation, id: 1, score: 0 };
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => recommendationData);
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return { ...recommendationData, score: -6 };
      });

    jest
      .spyOn(recommendationRepository, "remove")
      .mockImplementationOnce((): any => {});

    await recommendationService.downvote(recommendationData.id);

    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
    expect(recommendationRepository.remove).toBeCalled();
  });
});

describe("recommendations service get tests", () => {
  it("get all recommendations", async () => {
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {});

    await recommendationService.get();

    expect(recommendationRepository.findAll).toBeCalled();
  });

  it("get top 10 recommendations", async () => {
    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockImplementationOnce((): any => {});

    await recommendationService.getTop(10);

    expect(recommendationRepository.getAmountByScore).toBeCalled();
  });

  it("return recommendation with score bigger than 10", async () => {
    const recommendation = validBody();
    const recommendationData = { ...recommendation, id: 1, score: 15 };
    jest.spyOn(Math, "random").mockImplementationOnce((): any => {
      return 0.6;
    });
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return [recommendationData];
      });

    const returnRecommendation = await recommendationService.getRandom();

    expect(recommendationRepository.findAll).toBeCalled();
    expect(returnRecommendation).toBe(recommendationData);
  });

  it("found no recommendations in random function", async () => {
    jest.spyOn(Math, "random").mockImplementationOnce((): any => {
      return 0.8;
    });
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return [];
      });

    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => []);

    const response = recommendationService.getRandom();

    expect(recommendationRepository.findAll).toBeCalled();
    expect(response).rejects.toEqual({ message: "", type: "not_found" });
  });
});
