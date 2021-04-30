import { shallow } from "enzyme";
import DogDetails from "./DogDetails";
import DogDetailsView from "./DogDetailsView";

const dogBreedMock = {
  name: "Golden Retriever",
  image:
    "https://www.petlove.com.br/static/pets/dog/48881/hd_1531952446-photo.jpg",
};

describe("DogDetails", () => {
  it("should be render DogDetails with the right props", () => {
    const wrapper = shallow(
      <DogDetails name={dogBreedMock.name} image={dogBreedMock.image} />
    );

    expect(wrapper.type()).toBe(DogDetailsView);
    expect(wrapper.props()).toMatchObject({
      name: "Golden Retriever",
      image:
        "https://www.petlove.com.br/static/pets/dog/48881/hd_1531952446-photo.jpg",
    });
  });

  it("should render alert when onBark function is called", () => {
    window.alert = jest.fn();

    const wrapper = shallow(<DogDetails />);

    wrapper.invoke("onBark")("");

    expect(window.alert).toHaveBeenCalledWith("Woof! Woof!");
  });
});
