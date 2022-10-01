import { FC, useRef } from "react";

import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas, MeshProps, ThreeElements, useFrame } from "@react-three/fiber";
import { styled } from "@stitches/react";

import { useStore } from "../store";

export const VisualOutput = () => {
  return (
    <VisualOutputContainer>
      <Canvas>
        {/*@ts-ignore*/}
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={60} />
        <OrbitControls autoRotate={true} autoRotateSpeed={5} />
        <Visualizer />
      </Canvas>
    </VisualOutputContainer>
  );
};

const VisualOutputContainer = styled("div", {
  height: "100%",
  flexGrow: 1,
});

const Visualizer = () => {
  const audio = useStore(store => store.audio);
  useFrame(() => {
    if (audio) {
      audio.analyzer.getByteFrequencyData(audio.frequencyDataBuffer);
    }
  });

  return (
    <>
      <ambientLight />
      {Array.from({ length: 255 }).map((_, index) => (
        <PointBall
          key={index}
          index={index}
          position={[
            2 * Math.cos((2 * Math.PI * (index + 255 * 0.25)) / 255),
            2 * Math.sin((2 * Math.PI * (index + 255 * 0.25)) / 255),
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
  const [x, y] = props.position;
  const initialScale = 0.025;

  useFrame(() => {
    const ball = meshRef.current;
    const material = materialRef.current;
    if (audio && ball && material) {
      const intensity =
        audio.frequencyDataBuffer[index > 127 ? Math.abs(254 - index) : index];
      ball.position.x = x + x * intensity * 0.01;
      ball.position.y = y + y * intensity * 0.01;
      ball.scale.x = initialScale + 0.001 * intensity;
      ball.scale.y = initialScale + 0.001 * intensity;
      ball.scale.z = initialScale + 0.001 * intensity;
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
