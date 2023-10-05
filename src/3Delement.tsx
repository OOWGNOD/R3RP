import { RootState, useFrame } from "@react-three/fiber";
import { useRef } from "react"
import { Mesh } from "three"
import * as THREE from "three"
import { OrbitControls } from "@react-three/drei"

export default function _3Delement(){
    const refMesh = useRef<Mesh>(null);
    // delta 이전 프레임과 현재 프레임사이의 경과시간, 단위 ms
    useFrame((state:RootState, delta:number) => {
        state = state;
        if(refMesh.current){
            refMesh.current.rotation.y += delta
        }
    })
    return(
        <>
        <directionalLight position={[1,1,1]}/>
        <axesHelper scale={10}/>
        <OrbitControls/>
        {/* mesh의 rotation은 라디안 단위로 지정해줘야함 */}
        {/* mesh의 position 순서 {[x,y,z]} */}
        {/* mesh의 scale은 모든 축에 대해서 줄이거나 늘릴수있다 */}
        <mesh ref={refMesh} 
        position={[2,0,0]}
        rotation-z={THREE.MathUtils.degToRad(45)} 
        // rotation={[0, 45*Math.PI/180, 0]}
        >
            <boxGeometry/>
            <meshStandardMaterial
            color={"#e67e22"}
            opacity={0.5}
            transparent={true}
            />
            <axesHelper/>
            <mesh scale={[0.1,0.1,0.1]}>
                <sphereGeometry/>
                <meshStandardMaterial color={"red"}/>
            </mesh>
        </mesh>
        </>
    )
}
