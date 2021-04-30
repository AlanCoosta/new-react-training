import { shallow } from "enzyme";
import App from "./App";

describe("App", () => {
  it("should be render App Component", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.exists()).toBe(true);
  });

  it("should be click in button and show alert", () => {
    jest.spyOn(window, "alert").mockImplementation(() => jest.fn());

    const wrapper = shallow(<App />);

    const button = wrapper.find("button");
    button.simulate("click");

    expect(button.text()).toBe("Alert");
    expect(window.alert).toHaveBeenCalledWith("Welcome to the React Training");
  });
});
