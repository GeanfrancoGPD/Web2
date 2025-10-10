import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import defaultAnim from "../../Assets/Logo_Animated.json";

export default function LogoAnimation({
  animationData = defaultAnim,
  loop = false,
  onComplete,
  className = "logo",
  autoplay = true,
}) {
  const lottieRef = useRef(null);

  useEffect(() => {
    const inst = lottieRef.current;
    // lottie-react expone la instancia a través de lottieRef.getLottie() en algunas versiones
    const player =
      inst && typeof inst.getLottie === "function" ? inst.getLottie() : null;

    if (player && typeof player.addEventListener === "function") {
      const handler = () => onComplete?.();
      player.addEventListener("complete", handler);
      return () => player.removeEventListener("complete", handler);
    }

    // Fallback: calcular duración desde el JSON si no podemos suscribirnos
    if (animationData && typeof animationData.fr === "number") {
      const fr = animationData.fr || 60;
      const ip = typeof animationData.ip === "number" ? animationData.ip : 0;
      const op = typeof animationData.op === "number" ? animationData.op : 240;
      const ms = ((op - ip) / fr) * 1000;
      const t = setTimeout(() => onComplete?.(), Math.ceil(ms + 60));
      return () => clearTimeout(t);
    }
  }, [animationData, onComplete]);

  return (
    <div className="logo-container">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        className={className}
      />
    </div>
  );
}
