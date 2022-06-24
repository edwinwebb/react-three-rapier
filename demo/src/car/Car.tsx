import { Box, Cylinder } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Debug, RigidBody, RigidBodyApi, useRevoluteJoint } from "@react-three/rapier";
import { createRef, useRef } from "react";
import { Demo } from "../App";

const RevoluteJoint = ({ body, wheel, anchors }) => {
  const joint = useRevoluteJoint(body, wheel, anchors);
  return null;
};

export const Car: Demo = ({ setUI }) => {
  
  const bodyRef = useRef<RigidBodyApi>(null)
  const frontLeftRef = useRef<RigidBodyApi>(null)
  const frontRightRef = useRef<RigidBodyApi>(null)
  const rearLeftRef = useRef<RigidBodyApi>(null)
  const rearRightRef = useRef<RigidBodyApi>(null)
  const refs = useRef(
    Array.from({ length: 4 }).map(() => createRef<RigidBodyApi>())
  );
    
  setUI("");

  useFrame(() => {
    refs.current.forEach((ref) => {
      //ref.current?.applyTorqueImpulse({x:0,y:0,z:.1})
    });
    frontLeftRef.current?.applyTorqueImpulse({x:0,y:0,z:.1})
    frontRightRef.current?.applyTorqueImpulse({x:0,y:0,z:.1})
    rearLeftRef.current?.applyTorqueImpulse({x:0,y:0,z:.1})
    rearRightRef.current?.applyTorqueImpulse({x:0,y:0,z:.1})
  });

  //useRevoluteJoint(bodyRef, frontLeftRef, [[0,0,0],[0,0,0],[0,0,0]]);

  return ( 
    <group>
      <Debug />
      <RigidBody
        colliders="cuboid"
        ref={bodyRef}
        type="dynamic"
        >
          <Box 
          scale={[6,1,1.9]}
          castShadow
          receiveShadow
          name="chassis"
         />
      </RigidBody>
      <RigidBody
        position={[-3, 0, -2]}
        colliders="hull"
        type="dynamic"
        ref={frontLeftRef}
        >
        <Cylinder 
          rotation={[Math.PI/2, 0, 0]}
          args={[1,1,1,32]}
        />
      </RigidBody>
      <RevoluteJoint body={bodyRef} wheel={frontLeftRef}  anchors={[[-3, 0, -2], [0,0,0], [0, 0, 1]]} />
      <RigidBody
        position={[-3, 0, 2]}
        colliders="hull"
        type="dynamic"
        ref={frontRightRef}
        >
        <Cylinder 
          rotation={[Math.PI/2, 0, 0]}
          args={[1,1,1,32]}
        />
      </RigidBody>
      <RevoluteJoint body={bodyRef} wheel={frontRightRef} anchors={[[-3, 0, 2], [0,0,0], [0, 0, 1]]} />
      <RigidBody
        position={[3, 0, -2]}
        colliders="hull"
        type="dynamic"
        ref={rearLeftRef}
        >
        <Cylinder 
          rotation={[Math.PI/2, 0, 0]}
          args={[1,1,1,32]}
        />
      </RigidBody>
      <RevoluteJoint body={bodyRef} wheel={rearLeftRef}  anchors={[[3, 0, -2], [0,0,0], [0, 0, 1]]} />
      <RigidBody
        position={[3, 0, 2]}
        colliders="hull"
        type="dynamic"
        ref={rearRightRef}
        >
        <Cylinder 
          rotation={[Math.PI/2, 0, 0]}
          args={[1,1,1,32]}
        />
      </RigidBody>
      <RevoluteJoint body={bodyRef} wheel={rearRightRef} anchors={[[3, 0, 2], [0,0,0], [0, 0, 1]]} />
    </group>
  );
};