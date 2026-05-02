import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function Loader() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/loading.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.log(err));
  }, []);

  if (!animationData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ width: 180, height: 180 }}
      />
    </div>
  );
}