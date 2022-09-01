import { Space } from "../model/Model";

export class DataService {
  public async getSpaces(): Promise<Space[]> {
    const result: Space[] = [];
    result.push({
      location: "Bulgaria",
      name: "Silistra",
      spaceId: "123",
    });

    result.push({
      location: "Bulgaria",
      name: "Silistra",
      spaceId: "124",
    });

    result.push({
      location: "Bulgaria",
      name: "Silistra",
      spaceId: "126",
    });

    return result;
  }
}
