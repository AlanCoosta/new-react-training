interface Props {
  name: string;
  image: string;
}

const DogDetailsView = ({ name, image }: Props) => {
  return (
    <>
      <h1>{name}</h1>
      <img src={image} alt={`${name}`} style={{ width: 200 }} />
      <button>Bark!</button>
    </>
  );
};

export default DogDetailsView;
