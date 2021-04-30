import { typeBeerMock } from "../../mocks/typeBeerMock";

interface Props {
  name: string;
  type: string;
  hasCorn: boolean;
  ingredients: string;
  onChangeText: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onChangeCheckBox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
}

const CreateBeerFormView = ({
  name,
  type,
  hasCorn,
  ingredients,
  onChangeText,
  onChangeCheckBox,
  onSubmit,
}: Props) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
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
  );
};

export default CreateBeerFormView;
