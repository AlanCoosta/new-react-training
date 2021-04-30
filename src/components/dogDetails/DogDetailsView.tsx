interface Props {
  name: string;
  image: string;
  onBark: () => void;
  onScold: () => void;
  scoldCounter: number;
}

const DogDetailsView = ({
  name,
  image,
  onBark,
  onScold,
  scoldCounter,
}: Props) => {
  return (
    <>
      <h1>{name}</h1>
      <img src={image} alt={`${name}`} style={{ width: 200 }} />
      <button onClick={onBark}>Bark!</button>

      <br />

      <p>
        Scold counter: <b>{scoldCounter}</b>{" "}
        <button onClick={onScold}>Scold!</button>
      </p>
    </>
  );
};

export default DogDetailsView;
