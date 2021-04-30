import { shallow } from "enzyme";
import Button from "@material-ui/core/Button";

import App from "./App";

describe("App", () => {
  it("should be render App Component", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render alert "Welcome to the React Training" when button is clicked', () => {
    jest.spyOn(window, "alert").mockImplementation(() => jest.fn());

    const wrapper = shallow(<App />);

    const button = wrapper.find(Button);
    button.simulate("click");

    expect(window.alert).toHaveBeenCalledWith("Welcome to the React Training");
  });

  it("should button have the title correct", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(Button).text()).toBe("Alert");
  });
});
