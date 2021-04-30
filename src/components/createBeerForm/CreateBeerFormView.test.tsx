import { shallow } from "enzyme";

import CreateBeerFormView from "./CreateBeerFormView";
import { typeBeerMock } from "../../mocks/typeBeerMock";

describe("CreateBeerFormView", () => {
  const onSubmitMock = jest.fn((f) => f);
  const onChangeTextMock = jest.fn((f) => f);
  const onChangeCheckBoxMock = jest.fn((f) => f);
  const beerMock = {
    name: "beer test",
    type: "Brahma",
    hasCorn: true,
    ingredients: "ingredients test",
    onChangeText: onChangeTextMock,
    onChangeCheckBox: onChangeCheckBoxMock,
  };

  const {
    name,
    type,
    hasCorn,
    ingredients,
    onChangeText,
    onChangeCheckBox,
  } = beerMock;

  it("should render CreateBeerFormView with right props and correct elements", () => {
    const wrapper = shallow(
      <CreateBeerFormView onSubmit={onSubmitMock} {...beerMock} />
    );

    expect(
      wrapper.matchesElement(
        <div>
          <form onSubmit={onSubmitMock}>
            <h4>Create Beer Form</h4>

            <label htmlFor="name">Nome da bebida: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChangeText}
            />

            <br />

            <label htmlFor="type">Tipo de bebida: </label>
            <select name="type" id="type" onChange={onChangeText} value={type}>
              <option value="" disabled>
                Selecione uma opção
              </option>

              {typeBeerMock.map((item) => (
                <option key={item.id} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>

            <br />

            <label htmlFor="hasCorn">Tem cevada?: </label>
            <input
              type="checkbox"
              name="hasCorn"
              id="hasCorn"
              onChange={onChangeCheckBox}
              checked={hasCorn}
            />

            <br />

            <label htmlFor="ingredients">Ingredientes: </label>
            <textarea
              name="ingredients"
              id="ingredients"
              placeholder="Digite os ingredientes"
              onChange={onChangeText}
              value={ingredients}
            />

            <button type="submit" disabled={!name || !type || !ingredients}>
              Enviar
            </button>
          </form>
        </div>
      )
    ).toBe(true);
  });

  it("should submit form", () => {
    const wrapper = shallow(
      <CreateBeerFormView onSubmit={onSubmitMock} {...beerMock} />
    );

    wrapper.find("form").first().simulate("submit");
    expect(onSubmitMock).toHaveBeenCalled();
  });

  it("should render all list type of beer in select", () => {
    const wrapper = shallow(
      <CreateBeerFormView onSubmit={onSubmitMock} {...beerMock} />
    );

    const SELECT_OPTION_DISABLED_COUNT = 1;

    expect(wrapper.find("select").children()).toHaveLength(
      SELECT_OPTION_DISABLED_COUNT + typeBeerMock.length
    );
  });
});
