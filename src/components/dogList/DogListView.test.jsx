import Card from "@material-ui/core/Card";
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
      list: "list",
    });
  });

  const dogBreedsMock = ["affenpinscher", "basenji"];

  it("should render list from api", () => {
    const wrapper = shallow(<DogListView dogBreeds={dogBreedsMock} />);

    expect(
      wrapper.matchesElement(
        <Card className={"card"}>
          <Typography variant="h4" gutterBottom>
            DogListView
          </Typography>

          <List className={"list"}>
            {dogBreedsMock.map((item) => (
              <ListItem key={item}>
                <ListItemText>{capitalize(item)}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Card>
      )
    ).toBe(true);
  });

  it("should render two ListItem", () => {
    const wrapper = shallow(<DogListView dogBreeds={dogBreedsMock} />);

    expect(wrapper.find(ListItem)).toHaveLength(2);
  });

  it("should first ListItem to render Affenpinscher", () => {
    const wrapper = shallow(<DogListView dogBreeds={dogBreedsMock} />);

    const affenpinscherCapitalize = capitalize(dogBreedsMock[0]);

    expect(wrapper.find(ListItemText).first().text()).toEqual(
      affenpinscherCapitalize
    );
  });

  it("should second ListItem to render Basenji", () => {
    const wrapper = shallow(<DogListView dogBreeds={dogBreedsMock} />);

    const basenjiCapitalize = capitalize(dogBreedsMock[1]);

    expect(wrapper.find(ListItemText).at(1).text()).toEqual(basenjiCapitalize);
  });
});
