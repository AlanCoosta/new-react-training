import { shallow } from "enzyme";

import CreateBeerFormikForm from "./CreateBeerFormikForm";
import CreateBeerFormikFormView from "./CreateBeerFormikFormView";

describe("CreateBeerFormikForm", () => {
  it("should render CreateBeerFormikForm with type of CreateBeerFormikFormView", () => {
    const wrapper = shallow(<CreateBeerFormikForm />);

    expect(wrapper.type()).toBe(CreateBeerFormikFormView);
  });

  it("should call function onSubmit and receive values in console.log", () => {
    const values = {
      name: "",
      type: "",
      hasCorn: false,
      ingredients: "",
    };
    console.log = jest.fn();

    const wrapper = shallow(<CreateBeerFormikForm />);

    wrapper.invoke("onSubmit")(values);
    expect(console.log).toBeCalledWith(values);
  });
});
