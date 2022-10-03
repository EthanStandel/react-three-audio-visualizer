import { FC, useEffect, useRef } from "react";

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { MeshProps, ThreeElements, useFrame } from "@react-three/fiber";

import { useStore } from "../../store";

export const StarField = () => {
  const audio = useStore(store => store.audio);
  useFrame(() => {
    if (audio) {
      audio.analyzer.getByteFrequencyData(audio.frequencyDataBuffer);
    }
  });
  const ref = useRef();
  useEffect(() => {
    console.log(ref);
  }, []);

  return (
    <>
      {/*@ts-ignore*/}
      <PerspectiveCamera
        ref={ref}
        makeDefault
        position={[1000, 1000, 1000]}
        zoom={100}
      />
      <OrbitControls />
      <ambientLight />
      {Array.from({ length: 512 }).map((_, index) => (
        <PointBall
          key={index}
          index={index}
          position={[
            Math.random() * 20,
            Math.random() * 20,
            Math.random() * 20,
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
  let test = true;
  useFrame(() => {
    const ball = meshRef.current;
    const material = materialRef.current;
    if (audio && ball && material) {
      const repeatNote = Math.floor(index / 127);
      const intensity =
        audio.frequencyDataBuffer[
          index > 127 ? Math.abs(127 * repeatNote - index) : index
        ];
      if (test) {
        console.log(index, repeatNote, Math.abs(127 * repeatNote));
        test = false;
      }
      ball.scale.x = initialScale + 0.0025 * intensity;
      ball.scale.y = initialScale + 0.0025 * intensity;
      ball.scale.z = initialScale + 0.0025 * intensity;
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
