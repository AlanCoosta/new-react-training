import { ChangeEvent } from "react";
import { shallow } from "enzyme";

import CreateBeerForm from "./CreateBeerForm";
import CreateBeerFormView from "./CreateBeerFormView";

describe("CreateBeerForm", () => {
  it("should render CreateBeerForm with right props", () => {
    const wrapper = shallow(<CreateBeerForm />);

    expect(wrapper.type()).toBe(CreateBeerFormView);
    expect(wrapper.prop("name")).toBe("");
    expect(wrapper.prop("type")).toBe("");
    expect(wrapper.prop("hasCorn")).toBe(false);
    expect(wrapper.prop("ingredients")).toBe("");
  });

  it("should digit in input beer name", () => {
    const event = {
      target: {
        name: "name",
        value: "Brahma",
      },
    } as ChangeEvent<HTMLInputElement>;

    const wrapper = shallow(<CreateBeerForm />);

    wrapper.invoke("onChangeText")(event);
    expect(wrapper.prop("name")).toBe("Brahma");
  });

  it("should change select in select beer type", () => {
    const event = {
      target: {
        name: "type",
        value: "Lager",
      },
    } as ChangeEvent<HTMLSelectElement>;

    const wrapper = shallow(<CreateBeerForm />);

    wrapper.invoke("onChangeText")(event);
    expect(wrapper.prop("type")).toBe("Lager");
  });

  it("should change value of checkbox has corn", () => {
    const wrapper = shallow(<CreateBeerForm />);

    wrapper.invoke("onChangeCheckBox")();

    expect(wrapper.prop("hasCorn")).toBe(true);
  });

  it("should submit form with all fields filled", () => {
    const event = {
      preventDefault: jest.fn(),
    };

    const beer = {
      name: "",
      type: "",
      hasCorn: false,
      ingredients: "",
    };

    console.log = jest.fn();

    const wrapper = shallow(<CreateBeerForm />);

    wrapper.invoke("onSubmit")(event);

    expect(console.log).toBeCalledWith(beer);
  });
});
