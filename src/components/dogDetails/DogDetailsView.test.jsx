import { shallow } from "enzyme";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import DogDetailsView from "./DogDetailsView";
import { DogDetailsStyle } from "./DogDetailsView.styles";

jest.mock("./DogDetailsView.styles.ts");

describe("DogDetailsView", () => {
  const dogBreedMock = {
    name: "affenpinscher",
    image:
      "https://www.petlove.com.br/static/pets/dog/48881/hd_1531952446-photo.jpg",
  };
  const onBarkMock = jest.fn();
  const onScoldMock = jest.fn();
  const scoldCounterMock = 0;

  beforeEach(() => {
    DogDetailsStyle.mockReturnValue({
      container: "container",
      image: "image",
      buttonBark: "buttonBark",
    });
  });

  it("should be render DogDetailsView Component with the right props", () => {
    const wrapper = shallow(
      <DogDetailsView name={dogBreedMock.name} image={dogBreedMock.image} />
    );

    expect(wrapper.find(Typography).first().text()).toEqual("affenpinscher");
    expect(wrapper.find("img").prop("src")).toEqual(
      "https://www.petlove.com.br/static/pets/dog/48881/hd_1531952446-photo.jpg"
    );
    expect(wrapper.find("img").prop("alt")).toEqual("affenpinscher");
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
        <div className={"container"}>
          <Typography variant="h2" gutterBottom>
            {dogBreedMock.name}
          </Typography>

          <img
            src={dogBreedMock.image}
            alt={dogBreedMock.name}
            className={"image"}
          />

          <Button
            onClick={onBarkMock}
            id="button"
            variant="contained"
            color="primary"
            className={"buttonBark"}
          >
            Bark!
          </Button>

          <Typography variant="h4" gutterBottom>
            Scold counter: <b>{scoldCounterMock}</b>{" "}
            <Button onClick={onScoldMock} variant="contained" color="primary">
              Scold!
            </Button>
          </Typography>
        </div>
      )
    ).toBe(true);
  });
});
