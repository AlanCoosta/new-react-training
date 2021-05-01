import { shallow } from "enzyme";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import DogDetailsView from "./DogDetailsView";
import { DogDetailsStyle } from "./DogDetailsView.styles";
import { capitalize } from "lodash";

jest.mock("./DogDetailsView.styles.ts");

describe("DogDetailsView", () => {
  const dogBreedMock = {
    name: "affenpinscher",
    image:
      "https://www.petlove.com.br/static/pets/dog/48881/hd_1531952446-photo.jpg",
  };
  const onBarkMock = jest.fn();
  const onScoldMock = jest.fn();

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

    expect(wrapper.find(Typography).first().text()).toEqual("Affenpinscher");
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
      />
    );

    expect(
      wrapper.matchesElement(
        <div className={"container"}>
          <Typography variant="h2" gutterBottom>
            {capitalize(dogBreedMock.name)}
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

          <Button
            // onClick={() => onScoldMock(dogBreedMock.name)}
            variant="contained"
            color="primary"
          >
            Scold!
          </Button>
        </div>
      )
    ).toBe(true);
  });

  it('should be render in Typography h2 "Name of breed" if breed is not selected', () => {
    const wrapper = shallow(
      <DogDetailsView
        name=""
        image=""
        onBark={onBarkMock}
        onScold={onScoldMock}
      />
    );

    expect(wrapper.find(Typography).first().text()).toBe("Name of breed");
  });

  it("should call function onScold", () => {
    const wrapper = shallow(
      <DogDetailsView
        name={dogBreedMock.name}
        image={dogBreedMock.image}
        onBark={onBarkMock}
        onScold={onScoldMock}
      />
    );

    const buttonScold = wrapper.find(Button).at(1);
    buttonScold.simulate("click");

    expect(onScoldMock).toHaveBeenCalled();
  });
});
