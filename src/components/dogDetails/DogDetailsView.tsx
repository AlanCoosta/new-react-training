interface Props {
  name: string;
  image: string;
  onBark: () => void;
}

const DogDetailsView = ({ name, image, onBark }: Props) => {
  return (
    <>
      <h1>{name}</h1>
      <img src={image} alt={`${name}`} style={{ width: 200 }} />
      <button onClick={onBark}>Bark!</button>
    </>
  );
};

export default DogDetailsView;
