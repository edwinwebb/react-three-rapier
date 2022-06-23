import { Box, Cylinder } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RigidBodyApi, useRevoluteJoint } from "@react-three/rapier";
import { createRef, useRef } from "react";
import { Demo } from "../App";

const RevoluteJoint = ({ a, b, anchors }) => {
  const joint = useRevoluteJoint(a, b, anchors);
  return null;
};

export const Car: Demo = ({ setUI }) => {
  
  const boxRef = useRef<RigidBodyApi>(null)
  const refs = useRef(
    Array.from({ length: 4 }).map(() => createRef<RigidBodyApi>())
  );
    
  setUI("");

  useFrame(() => {
    refs.current.forEach((ref) => {
      ref.current?.applyTorqueImpulse({x:0,y:0,z:.1})
    });
  });

  return ( 
    <group>
      <RigidBody colliders="cuboid" position={[0,0,0]} ref={boxRef}>
        <Box 
          scale={[6,1,1]}
          castShadow
          receiveShadow
         />
      </RigidBody>
      {Array.from({ length: 4 }).map((_, i) => (
        <RigidBody
          position={[i % 2 ? -3 : 3, .5, i > 1 ? -2 : 2]}
          rotation={[Math.PI/2, 0, 0]}
          colliders="ball"
          ref={refs.current[i]}
          key={i}
        >
          <Cylinder 
            castShadow 
            receiveShadow
          />
        </RigidBody>
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <RevoluteJoint a={refs.current[i]} b={boxRef} key={i} anchors={[[0, i > 1 ? -2 : 2, 0], [i % 2 ? -3 : 3, 0, 0], [0, 1, 0]]} />
      ))}    
    </group>
  );
};