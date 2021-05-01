import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import { shallow } from "enzyme";
import capitalize from "lodash/capitalize";

import DogListView from "./DogListView";
import { DogListStyle } from "./DogListView.styles";

jest.mock("./DogListView.styles.ts");

describe("DogListView", () => {
  beforeEach(() => {
    DogListStyle.mockReturnValue({
      card: "card",
      loading: "loading",
      list: "list",
      listItemImage: "listItemImage",
    });
  });

  const handleSelectDogMock = jest.fn((f) => f);

  const dogBreedsMock = [
    {
      name: "affenpinscher",
      image: "https://images.dog.ceo/breeds/affenpinscher/n02110627_13782.jpg",
    },
    {
      name: "basenji",
      image: "https://images.dog.ceo/breeds/basenji/n02110806_238.jpg",
    },
  ];
  const dogBreedSelectedEmpty = {
    name: "",
    image: "",
  };

  it("should render list from api", () => {
    const wrapper = shallow(
      <DogListView
        dogBreeds={dogBreedsMock}
        isLoading={false}
        dogSelected={dogBreedSelectedEmpty}
        handleSelectDog={handleSelectDogMock}
      />
    );

    expect(
      wrapper.matchesElement(
        <Card className={"card"}>
          <Typography variant="h4" gutterBottom>
            DogListView
          </Typography>

          <List className={"list"}>
            {dogBreedsMock.map((item) => (
              <ListItem key={item.image}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={"listItemImage"}
                />
                <ListItemText>{capitalize(item.name)}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Card>
      )
    ).toBe(true);
  });

  it("should render two ListItem", () => {
    const wrapper = shallow(
      <DogListView
        dogBreeds={dogBreedsMock}
        isLoading={false}
        dogSelected={dogBreedSelectedEmpty}
        handleSelectDog={handleSelectDogMock}
      />
    );

    expect(wrapper.find(ListItem)).toHaveLength(2);
  });

  it("should first ListItem to render Affenpinscher", () => {
    const wrapper = shallow(
      <DogListView
        dogBreeds={dogBreedsMock}
        isLoading={false}
        dogSelected={dogBreedSelectedEmpty}
        handleSelectDog={handleSelectDogMock}
      />
    );

    const affenpinscherCapitalize = capitalize(dogBreedsMock[0].name);

    expect(wrapper.find(ListItemText).first().text()).toEqual(
      affenpinscherCapitalize
    );
  });

  it("should second ListItem to render Basenji", () => {
    const wrapper = shallow(
      <DogListView
        dogBreeds={dogBreedsMock}
        isLoading={false}
        dogSelected={dogBreedSelectedEmpty}
        handleSelectDog={handleSelectDogMock}
      />
    );

    const basenjiCapitalize = capitalize(dogBreedsMock[1].name);

    expect(wrapper.find(ListItemText).at(1).text()).toEqual(basenjiCapitalize);
  });

  it("should render loading when communication with the api is called", () => {
    const wrapper = shallow(
      <DogListView
        dogBreeds={dogBreedsMock}
        isLoading={true}
        dogSelected={dogBreedSelectedEmpty}
        handleSelectDog={handleSelectDogMock}
      />
    );

    expect(
      wrapper.matchesElement(
        <Card className={"card"}>
          <Typography variant="h4" gutterBottom>
            DogListView
          </Typography>

          <Card className={"loading"}>
            <CircularProgress />
          </Card>
        </Card>
      )
    ).toBe(true);
  });

  it("should select a breed", () => {
    const wrapper = shallow(
      <DogListView
        dogBreeds={dogBreedsMock}
        isLoading={false}
        dogSelected={dogBreedsMock[0]}
        handleSelectDog={handleSelectDogMock}
      />
    );

    wrapper.find(ListItem).first().simulate("click");

    expect(handleSelectDogMock).toHaveBeenCalled();
  });
});
