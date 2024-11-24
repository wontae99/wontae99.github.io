---
title: Threejs 공부하기 (R3F) - (1)
date: '2023-11-26'
tags: ['Threejs', "R3F"]
draft: false
summary: 3D 웹 개발 공부 - Three.js, React Three Fiber(R3F) - Canvas, Transformation, Geometry
---

얼마전 개인 포트폴리오 사이트를 만들면서 처음으로 three.js를 사용해 3D 요소가 포함된 웹 어플리케이션을 개발해 보았다.

[포트폴리오 사이트](https://wontae-portfolio.vercel.app)

포폴 사이트를 만들면서 3D 웹 개발에 더 흥미를 갖게되어 공부해 보기로 했다!

<br/>

## DEMO

 https://r3f-practice.vercel.app/

<br/>

# 3D 웹 개발 요소

3D 웹 개발은 우선 웹 표준 기술인 **WebGL** 과 **WebGPU** 을 사용한다. 하지만 WebGL과 WebGPU는 매우 복잡하고 어렵다. 출력을 위한 파이프라인과 수학적인 내용 그리고 **shader** 라고하는 새로운 프로그래밍 언어인 GLSL과 WGSL을 알아야 한다🤯

하지만! 이를 쉽게 사용할 수 있도록 하는 라이브러리가 존재하고 대표적으로 **Three.js** 가 있다. Three.js는 WebGL과 WebGPU를 **Wrapping** 한 라이브러리이다.

그리고 프론트엔드 개발에 있어 가장 많이 사용되는 라이브러리는 **React** 이다. 앞서 말한 Three.js를 React에서 사용하기 위해서는 **R3F(React Three Fiber)** 라는 라이브러리를 사용하면 된다.

<br/><br/>

## Canvas

Canvas를 구성하는 요소는 크게 3가지이다.

- Renderer
  - GPU를 이용해 빠르게 3D 그래픽 출력
- Scene (3D 장면)
  - 3D 모델
  - 조명
  - 카메라
- Camera

R3F는 캔버스를 생성할때, 자동으로 이 3개의 객체를 자동으로 생성해 준다.

<br/>

## Transformation

3D 공간의 좌표계는 기본적으로 X축, Y축, Z축으로 이루어 져 있다. X축은 모니터의 기준 수평 방향으로 오른쪽이 + 방향, 왼쪽인 - 방향이다. Y축은 모니터의 수직 방향으로 위쪽이 +, 아래쪽이 - 방향이다. Z축은 모니터에서 사용자 쪽으로의 방향이 +방향, 그 반대가 - 방향이다.

회전 방향은 반시계 방향이 +, 시계 방향이 - 방향이다. 각도의 단위는 **radian** 으로 degree에 **PI/180** 곱해주면 구할 수 있다.

<br/>

```javascript
const MyElement3D = (props: Props) => {
  const meshRef = useRef<Mesh>(null!);

  return (
    <>
      <axesHelper scale={10} />  // World 좌표계 표시
      <OrbitControls />  // mesh를 마우스로 회전 가능
      <mesh 
      ref={meshRef} 
      position={[0,2,0]} // y축 +2만큼 이동하여 위치
      scale={2} 
      rotation={[0, (45 * Math.PI) / 180, 0]}> // y축이 45도 회전된 상태
        <boxGeometry />
        <meshStandardMaterial color="#32a897" />
      </mesh>
    </>
  );
};

export default MyElement3D;
```

![image](https://github.com/wontae99/portfolio/assets/109476712/e8d58ed3-55f1-4f93-9f6f-1421d315ad85)


## Geometry

모든 Geometry는 __BufferGeometry__ 클래스를 상속받는데 이 클래스는 Attribute 데이터를 가진다.

- BufferGeometry
  - Position - 형상을 정의하는 3차원 정점
  - Normal - 모델의 면에 대한 수직 벡터
  - Color - 정점의 색상
  - UV - 텍스쳐 맵핑을 위한 좌표
  - Vertex Index - 삼각형 면 구성을 위한 정점 인덱스

기본 지오메트리는 __mesh__ 의 모양을 결정하는 여러 BufferGeometry 클래스들을 가지고 있다. (BoxGeometry, CircleGeometry, ConeGeometry 등)

### 예시

```javascript
// Box Geometry Demo 코드
const MyGeometry = (props: Props) => {
  const meshRef = useRef<Mesh>(null!);
  const wireMeshRef = useRef<Mesh>(null!);

// leva의 useControls로 args 값들 조정
  const { xSize, ySize, zSize, xSeg, ySeg, zSeg } = useControls({
    xSize: { value: 1, min: 0.1, max: 5, step: 0.01 },
    ySize: { value: 1, min: 0.1, max: 5, step: 0.01 },
    zSize: { value: 1, min: 0.1, max: 5, step: 0.01 },
    xSeg: { value: 1, min: 1, max: 10, step: 1 }, // segment는 1이상의 정수 값이 어야함
    ySeg: { value: 1, min: 1, max: 10, step: 1 },
    zSeg: { value: 1, min: 1, max: 10, step: 1 },
  });

  useEffect(() => {
    wireMeshRef.current.geometry = meshRef.current.geometry;
  }, [xSize, ySize, zSize, xSeg, ySeg, zSeg]);

  return (
    <>
      <directionalLight />
      <ambientLight />
      <pointLight />
      <hemisphereLight />

      <OrbitControls />
    //   Box Geometry mesh
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[xSize, ySize, zSize, xSeg, ySeg, zSeg]} />
        <meshStandardMaterial color="#1abc9c" />
      </mesh>
    // wire mesh
      <mesh ref={wireMeshRef}>
        <meshStandardMaterial emissive="yellow" wireframe={true} />
      </mesh>
    // x, y, z 축
      <axesHelper scale={10} />
    </>
  );
};

export default MyGeometry;
```

위의 코드로 출력된 Box Geometry 매쉬

![image](https://github.com/wontae99/portfolio/assets/109476712/4f0bfdd0-7154-4de3-a97a-42dbcfb4243a)


이외 geometry에 대한 자세한 내용은 [ThreeJS Docs](https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry)를 참고하면 볼 수 있다.


<br/><br/>

## Material

3차원 객체를 표현할때, 다음과 같이 크게 3가지로 분류할 수 있다.

- Point - 점
- Line - 선
- Mesh - 면

R3F에서는 __Drei__ 라이브러리를 통해 MeshReflectorMaterial, MeshRefractionMaterial, shaderMaterial 등 또다른 재질 컴포넌트들을 제공해 준다.

### 예시
```javascript
const MyMaterial = (props: Props) => {
  const meshRef1 = useRef<Mesh>(null!);
  const meshRef2 = useRef<Mesh>(null!);

  const { roughness, metalness } = useControls({
    roughness: { value: 0, min: 0, max: 1, step: 0.01 },
    metalness: { value: 0, min: 0, max: 1, step: 0.01 },
  });

  useEffect(() => {
    meshRef2.current.material = meshRef1.current.material;
  }, []);

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <mesh ref={meshRef1} position={[0.7, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial
          visible={true}
          transparent={false}
          opacity={0.5} // transparent가 true일때 작동
          depthTest={true}
          depthWrite={true}
          side={THREE.FrontSide}
          color={0xff0000}
          emissive={0x00000}
          roughness={roughness}
          metalness={metalness}
          wireframe={false}
        />
      </mesh>

      <mesh ref={meshRef2} position={[-0.7, 0, 0]}>
        <torusGeometry args={[0.5, 0.2]} />
      </mesh>
    </>
  );
};

export default MyMaterial;
```

위의 코드로 출력된 Mesh Standard Material 매쉬

![image](https://github.com/wontae99/portfolio/assets/109476712/9f8013e8-3412-428b-bf40-1603469c4441)

이외의 material의 자세한 내용은 [Threejs Doc](https://threejs.org/docs/index.html?q=mesh#api/en/materials/MeshStandardMaterial)을 참고하면 된다.

참고 사항 - MeshPhysicalMaterial 은 MeshStandardMaterial 의 extension으로 다음과 같은 더 많은 물리 레더링 프로퍼티를 제공해 준다. 

- __clearcoat__ - 일부 재료, 예를 들면 자동차 도료, 탄소 섬유, 그리고 젖은 표면과 같은 것들 표현 가능
- __transmission__ - 유리같은 투명한 material 표현 가능.
- __sheen(광채)__


