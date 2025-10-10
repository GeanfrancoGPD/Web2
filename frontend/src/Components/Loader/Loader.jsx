import React from "react";
import LogoAnimation from "../LogoAnimation/LogoAnimation";

export default function Loader({ onFinish, animationData, loop = false }) {
  return (
    <div className="loader-container">
      <LogoAnimation
        animationData={animationData}
        loop={loop}
        onComplete={onFinish}
      />
    </div>
  );
}
