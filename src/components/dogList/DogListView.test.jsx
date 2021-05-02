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
const handleSelectDogMock = jest.fn((f) => f);

const dogBreedsMock = [
  {
    name: "affenpinscher",
    image: "https://images.dog.ceo/breeds/affenpinscher/n02110627_13782.jpg",
    counter: 0,
  },
  {
    name: "basenji",
    image: "https://images.dog.ceo/breeds/basenji/n02110806_238.jpg",
    counter: 0,
  },
];

const dogBreedsEmptyMock = [];

const dogBreedSelectedMock = {
  name: "affenpinscher",
  image: "https://images.dog.ceo/breeds/affenpinscher/n02110627_13782.jpg",
  counter: 0,
};

const dogBreedSelectedEmpty = {
  name: "",
  image: "",
  counter: 0,
};

describe("DogListView", () => {
  beforeEach(() => {
    DogListStyle.mockReturnValue({
      card: "card",
      loading: "loading",
      listEmpty: "listEmpty",
      list: "list",
      listItem: "listItem",
      listItemSelected: "listItemSelected",
      listItemImage: "listItemImage",
      listItemText: "listItemText",
    });
  });

  it("should render list from api", () => {
    const wrapper = shallow(
      <DogListView
        dogBreeds={dogBreedsMock}
        isLoading={false}
        dogBreedSelected={dogBreedSelectedMock}
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
              <ListItem
                key={item.image}
                onClick={handleSelectDogMock(item)}
                className={
                  item.name === dogBreedSelectedMock?.name
                    ? "listItemSelected"
                    : "listItem"
                }
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className={"listItemImage"}
                />
                <ListItemText className={"listItemText"}>
                  {capitalize(item.name)}
                </ListItemText>

                <ListItemText className={"listItemText"}>
                  Counter: {item.counter}
                </ListItemText>
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
        dogBreedSelected={dogBreedSelectedEmpty}
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
        dogBreedSelected={dogBreedSelectedEmpty}
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
        dogBreedSelected={dogBreedSelectedEmpty}
        handleSelectDog={handleSelectDogMock}
      />
    );

    const basenjiCapitalize = capitalize(dogBreedsMock[1].name);

    expect(wrapper.find(ListItemText).at(2).text()).toEqual(basenjiCapitalize);
  });

  it("should render loading when communication with the api is called", () => {
    const wrapper = shallow(
      <DogListView
        dogBreeds={dogBreedsMock}
        isLoading={true}
        dogBreedSelected={dogBreedSelectedEmpty}
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
        dogBreedSelected={dogBreedsMock[0]}
        handleSelectDog={handleSelectDogMock}
      />
    );

    wrapper.find(ListItem).first().simulate("click");

    expect(handleSelectDogMock).toHaveBeenCalled();
  });

  it("should render listEmpty if not have any breed", () => {
    const wrapper = shallow(
      <DogListView
        dogBreeds={dogBreedsEmptyMock}
        isLoading={false}
        dogBreedSelected={dogBreedSelectedMock}
        handleSelectDog={handleSelectDogMock}
      />
    );

    expect(
      wrapper.matchesElement(
        <Card className={"card"}>
          <Typography variant="h4" gutterBottom>
            DogListView
          </Typography>

          <div className={"listEmpty"}>
            <p>No one breed with this initial letter.</p>
            <p>Please select another breed.</p>
          </div>
        </Card>
      )
    ).toBe(true);
  });
});
