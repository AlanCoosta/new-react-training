import { shallow } from "enzyme";
import DogDetailsView from "./DogDetailsView";

const dogInfo = {
  name: "Golden Retriever",
  image:
    "https://www.petlove.com.br/static/pets/dog/48881/hd_1531952446-photo.jpg",
};

describe("DogDetailsView", () => {
  it("should be render DogDetailsView Component with the right props", () => {
    const wrapper = shallow(
      <DogDetailsView name={dogInfo.name} image={dogInfo.image} />
    );

    expect(wrapper.find("h1").text()).toEqual("Golden Retriever");
    expect(wrapper.find("img").prop("src")).toEqual(
      "https://www.petlove.com.br/static/pets/dog/48881/hd_1531952446-photo.jpg"
    );
    expect(wrapper.find("img").prop("alt")).toEqual("Golden Retriever");
  });

  it("should be render DogDetailsView with correct elements", () => {
    const wrapper = shallow(
      <DogDetailsView name={dogInfo.name} image={dogInfo.image} />
    );

    expect(
      wrapper.matchesElement(
        <>
          <h1>{dogInfo.name}</h1>
          <img
            src={dogInfo.image}
            alt={`${dogInfo.name}`}
            style={{ width: 200 }}
          />
          <button>Bark!</button>
        </>
      )
    ).toBe(true);
  });
});
