/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useConvexHull, useTrimesh } from "@react-three/rapier";
import { useRef } from "react";
import { Group, Mesh, MeshPhysicalMaterial, MeshStandardMaterial } from "three";

type GLTFResult = GLTF & {
  nodes: {
    plinko: Mesh;
    container: Mesh;
    wall: Mesh;
  };
  materials: {
    blue: MeshStandardMaterial;
    Material: MeshPhysicalMaterial;
    ["Material.001"]: MeshPhysicalMaterial;
  };
};

export default function Plinko({ ...props }: JSX.IntrinsicElements["group"]) {
  const group = useRef<Group>(null);

  const { nodes, materials } = useGLTF(
    // @ts-ignore
    new URL("plinko.glb", import.meta.url).toString()
  ) as unknown as GLTFResult;

  const [plinko] = useTrimesh.fromMesh<Mesh>(nodes.plinko, {
    type: "fixed",
  });

  const [wall] = useConvexHull.fromMesh<Mesh>(nodes.wall, {
    type: "fixed"
  });

  const [container] = useTrimesh.fromMesh<Mesh>(nodes.container, {
    type: "fixed"
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, -.4]}>
      <mesh
        ref={plinko}
        geometry={nodes.plinko.geometry}
        material={materials.blue}
        material-color="blue"
        castShadow
        receiveShadow
        position={[0, 7.58, -1.06]}
      />
      </group>
      <mesh
        ref={container}
        geometry={nodes.container.geometry}
        material={materials.Material}
        castShadow
      />
      <mesh
        ref={wall}
        geometry={nodes.wall.geometry}
        material={materials["Material.001"]}
        position={[0, -0.39, 0]}
      />
    </group>
  );
}
