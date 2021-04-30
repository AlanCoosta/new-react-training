import { shallow } from "enzyme";
import DogDetailsView from "./DogDetailsView";

const dogBreedMock = {
  name: "Golden Retriever",
  image:
    "https://www.petlove.com.br/static/pets/dog/48881/hd_1531952446-photo.jpg",
};

describe("DogDetailsView", () => {
  const onBarkMock = jest.fn();
  const onScoldMock = jest.fn();
  const scoldCounterMock = 0;

  it("should be render DogDetailsView Component with the right props", () => {
    const wrapper = shallow(
      <DogDetailsView name={dogBreedMock.name} image={dogBreedMock.image} />
    );

    expect(wrapper.find("h1").text()).toEqual("Golden Retriever");
    expect(wrapper.find("img").prop("src")).toEqual(
      "https://www.petlove.com.br/static/pets/dog/48881/hd_1531952446-photo.jpg"
    );
    expect(wrapper.find("img").prop("alt")).toEqual("Golden Retriever");
  });

  it("should be render DogDetailsView with correct elements", () => {
    const wrapper = shallow(
      <DogDetailsView
        name={dogBreedMock.name}
        image={dogBreedMock.image}
        onBark={onBarkMock}
        onScold={onScoldMock}
        scoldCounter={scoldCounterMock}
      />
    );

    expect(
      wrapper.matchesElement(
        <>
          <h1>{dogBreedMock.name}</h1>
          <img
            src={dogBreedMock.image}
            alt={`${dogBreedMock.name}`}
            style={{ width: 200 }}
          />
          <button onClick={onBarkMock}>Bark!</button>

          <br />

          <p>
            Scold counter: <b>{scoldCounterMock}</b>{" "}
            <button onClick={onScoldMock}>Scold!</button>
          </p>
        </>
      )
    ).toBe(true);
  });
});
