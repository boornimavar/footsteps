import { useParams } from "react-router-dom";
import Header from "./Header";

export default function Travel() {
  const { placeName } = useParams();
  return (
    <div className="">
      <Header />
      <h1>Welcome to {placeName}</h1>;
    </div>
  );
}
