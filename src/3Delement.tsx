// import { RootState, useFrame } from "@react-three/fiber";
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
            refWireMesh.current.material = refMesh.current.material
        }
    }, [xSize,ySize,zSize,xSegments,ySegments,zSegments]);
    
    return(
        <>
        <OrbitControls/>

        <ambientLight intensity={0.2}/>
        <directionalLight position={[0,1,0]} />
        <directionalLight position={[1,2,8]} intensity={0.7}/>
        
        {/* 물체의x,y,z 표시선 */}
        {/* <axesHelper scale={10}/> */}

        {/* mesh의 rotation은 라디안 단위로 지정해줘야함 */}
        {/* mesh의 position 순서 {[x,y,z]} */}
        {/* mesh의 scale은 모든 축에 대해서 줄이거나 늘릴수있다 */}
        
        <mesh ref={refMesh} 
        position={[0.7,0,0]}
        // rotation-z={THREE.MathUtils.degToRad(45)} 
        // rotation={[0, 45*Math.PI/180, 0]}
        >
            <boxGeometry 
            // args={[xSize,ySize,zSize,xSegments,ySegments,zSegments]}
            />
            {/* 매쉬가 랜더링되는 픽센단위로 광원의 영향을 계산하는 재질 */}
            <meshPhongMaterial
            // mesh가 보일지 안 보일지 설정
            visible={true}
            // 투명도 사용여부
            transparent={true}
            // 투명도 값 설정 0~1 // transparent가 true일때만 사용가능 
            opacity={0.5}
            // 랜더링 화면에 대한 z-buffer 값을 이용하여 검수 할 것인지 여부
            // 화면에 가까운 픽셀의 z-buffer값이 더 작고 멀수록 커진다
            // z-buffer 값이 작을수록 어둡게, 클수록 밝게 표현된다
            // 가까운 객체와 멀리있는 객체가 화면상 동일한 픽셀위에 그려질때 
            // 멀리있는 픽셀이 가까이에 있는 픽셀을 덮어씌우지 않도록 설정함
            depthTest={true}
            // 렌더링되고있는 메쉬의 픽셀에 대한 z값을 뎊스 버퍼에 기록할것인지 여부
            depthWrite={true}
            // 메쉬를 구성하는 면에 대해서 앞면만 랜더링 할 것인지 뒷면만 랜더링 할 것인지 또는 둘다 랜더링 할것인지
            // 삼각형의 좌표가 시계방향,반시계방향 구성인지에 따라 앞면이 다름 반시계방향이 앞면
            side={THREE.FrontSide}
            color={"#d25383"}
            // 재질 자체에서 발산하는 색상값
            emissive={0x666600}
            wireframe={false}
            />
        </mesh>

        <mesh ref={refWireMesh} 
        position={[-0.7,0,0]}
        // rotation-z={THREE.MathUtils.degToRad(45)} 
        >
            <torusGeometry args={[0.5, 0.2]}/>
        </mesh>

        </>
    )
}
