import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import loading from "../../public/loading.json";

export default function Loader() {

  if (!loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Lottie
        animationData={loading}
        loop={true}
        style={{ width: 180, height: 180 }}
      />
    </div>
  );
}