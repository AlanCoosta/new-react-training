import { shallow } from "enzyme";

import DogList from "./DogList";
import DogListView from "./DogListView";

jest.mock("../../services/dogList/DogListService.ts");
jest.mock("../../services/dogImage/DogImageService.ts");

describe("DogList", () => {
  it("should DogList have type of DogListView", () => {
    const wrapper = shallow(<DogList />);

    expect(wrapper.type()).toBe(DogListView);
    expect(wrapper.matchesElement(<DogListView />));
  });
});
