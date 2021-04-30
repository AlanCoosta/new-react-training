import DogDetailsView from "./DogDetailsView";

interface Props {
  name: string;
  image: string;
}

const DogDetails = ({ name, image }: Props) => {
  return <DogDetailsView name={name} image={image} />;
};

export default DogDetails;
