import { FC, useRef } from "react";

import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { MeshProps, ThreeElements, useFrame } from "@react-three/fiber";

import { useStore } from "../../store";

export const BloatRing = () => {
  const audio = useStore(store => store.audio);
  useFrame(() => {
    if (audio) {
      audio.analyzer.getByteFrequencyData(audio.frequencyDataBuffer);
    }
  });

  return (
    <>
      {/*@ts-ignore*/}
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={15} />
      <OrbitControls autoRotate={true} autoRotateSpeed={5} />
      <ambientLight />
      {Array.from({ length: 255 }).map((_, index) => (
        <PointBall
          key={index}
          index={index}
          position={[
            8 * Math.cos((2 * Math.PI * (index + 255 * 0.25)) / 255),
            8 * Math.sin((2 * Math.PI * (index + 255 * 0.25)) / 255),
            0,
          ]}
        />
      ))}
    </>
  );
};

const PointBall: FC<MeshProps & { index: number }> = ({ index, ...props }) => {
  const audio = useStore(store => store.audio);
  const meshRef = useRef<ThreeElements["mesh"]>(null);
  const materialRef = useRef<ThreeElements["meshStandardMaterial"]>(null);
  const initialScale = 0.025;

  useFrame(() => {
    const ball = meshRef.current;
    const material = materialRef.current;
    if (audio && ball && material) {
      const intensity =
        audio.frequencyDataBuffer[index > 127 ? Math.abs(254 - index) : index];
      ball.scale.x = initialScale + 0.01 * intensity;
      ball.scale.y = initialScale + 0.01 * intensity;
      ball.scale.z = initialScale + 0.01 * intensity;
      material.color.g = Math.max(0, 1 - intensity / 150);
      material.color.b = Math.max(0.667, 1.667 - intensity / 150);
    }
  });

  return (
    <mesh ref={meshRef} scale={initialScale} {...props}>
      <sphereGeometry />
      <meshBasicMaterial ref={materialRef} />
    </mesh>
  );
};
