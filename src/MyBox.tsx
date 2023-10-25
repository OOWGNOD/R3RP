import * as THREE from "three"
import { MeshProps } from "@react-three/fiber"

export default function MyBox(props:MeshProps){
    const geom = new THREE.BoxGeometry()
    return <mesh {...props} geometry={geom}></mesh>
}