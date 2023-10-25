import { RootState, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react"
import { Mesh } from "three"
import * as THREE from "three"
import { Box, OrbitControls } from "@react-three/drei"
import MyBox from "./MyBox";
import { useControls } from "leva";



export default function _3Delement(){
    const refMesh = useRef<Mesh>(null);
    const refWireMesh = useRef<Mesh>(null);
    
    const {xSize,ySize,zSize,xSegments,ySegments,zSegments} = useControls({
        xSize: {value: 1, min: 0.1, max: 5, step: 0.01},
        ySize: {value: 1, min: 0.1, max: 5, step: 0.01},
        zSize: {value: 1, min: 0.1, max: 5, step: 0.01},
        xSegments: {value: 1, min: 1, max: 10, step: 1},
        ySegments: {value: 1, min: 1, max: 10, step: 1},
        zSegments: {value: 1, min: 1, max: 10, step: 1},
    })

    // delta 이전 프레임과 현재 프레임사이의 경과시간, 단위 ms
    // useFrame((state:RootState, delta:number) => {
    //     state = state;
    //     if(refMesh.current){
    //         refMesh.current.rotation.y += delta
    //     }
    // });

    useEffect(() => {
        if(refWireMesh.current && refMesh.current){
            refWireMesh.current.geometry = refMesh.current.geometry
        }
    }, [xSize,ySize,zSize,xSegments,ySegments,zSegments]);
    
    return(
        <>
        <OrbitControls/>

        <ambientLight intensity={0.1}/>
        <directionalLight position={[2,1,3]} intensity={0.5}/>
        
        {/* 물체의x,y,z 표시선 */}
        {/* <axesHelper scale={10}/> */}

        {/* mesh의 rotation은 라디안 단위로 지정해줘야함 */}
        {/* mesh의 position 순서 {[x,y,z]} */}
        {/* mesh의 scale은 모든 축에 대해서 줄이거나 늘릴수있다 */}
        
        <mesh ref={refMesh} 
        position={[2,0,0]}
        // rotation-z={THREE.MathUtils.degToRad(45)} 
        // rotation={[0, 45*Math.PI/180, 0]}
        >
            <boxGeometry args={[xSize,ySize,zSize,xSegments,ySegments,zSegments]}/>
            <meshStandardMaterial
            color={"#e67e22"}
            opacity={0.5}
            transparent={true}
            />
        </mesh>

        <mesh ref={refWireMesh} 
        position={[2,0,0]}
        // rotation-z={THREE.MathUtils.degToRad(45)} 
        >
            <meshStandardMaterial
            color={"yellow"}
            wireframe={true}
            />
        </mesh>

        
        <Box position={[1.2,0,0]}>
        <meshStandardMaterial color={"#8e44ad"}/>
        </Box>

        <MyBox position={[-1.2,0,0]}>
        <meshStandardMaterial color={"#e74c3c"}/>
        </MyBox>

        </>
    )
}
