import { shallow } from "enzyme";
import DogDetails from "./DogDetails";
import DogDetailsView from "./DogDetailsView";

const dogBreedMock = {
  name: "Golden Retriever",
  image:
    "https://www.petlove.com.br/static/pets/dog/48881/hd_1531952446-photo.jpg",
};

const onBarkMock = jest.fn();

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

  it("should be counter", () => {
    const wrapper = shallow(
      <DogDetails
        name={dogBreedMock.name}
        image={dogBreedMock.image}
        onBark={onBarkMock}
      />
    );

    wrapper.invoke("onScold")();
    expect(wrapper.prop("scoldCounter")).toBe(1);
  });
});
