---
title: Threejs 공부하기 (R3F) - (2)
date: '2023-11-28'
tags: ['Threejs', "R3F"]
draft: false
summary: 3D 웹 개발 공부 - Three.js, React Three Fiber(R3F) - Light, Camera, Shadow
---

# DEMO

 https://r3f-practice.vercel.app/


<br/>

# Light (광원)

R3F에서의 광원(Three.js에서 제공하는 광원 클래스)는 다음과 같다.

- AmbientLight (주변광)
- HemisphereLight (주변광, 색상 2개 - 하늘, 지상 색상 값)
- DirectionalLight (특정 방향으로 향하는 빛)
- PointLight (모든 방향으로 비추는 빛)
- SpotLight (조명광)
- RectAreaLight (혀왁ㅇ등처럼 비추는 빛)

이외에 __Drei__ 에서 제공하는 Environment (주위 환경을 촬영한 이미지를 이용한 빛) 또한 효과적인 광원으로 사용할 수 있다.


### 예시

```javascript
// 고리 geometry, material 정의
const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: "#9b59b6",
  roughness: 0.5,
  metalness: 0.9,
});

const LightModel = (props: Props) => {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const smallSpherePivot = state.scene.getObjectByName("smallSpherePivot")!;
    // 그룹 객체의 이름으로 객체를 가져옴
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50);
    smallSpherePivot.children[0].getWorldPosition(
      light.current.target.position
    );
  }); // 매 프레임 마다 callback function 호출되어 실행

  const light = useRef<THREE.DirectionalLight>(null!);

  useHelper(light, THREE.DirectionalLightHelper); // 광원의 방향 표시 helper

  const { scene } = useThree();

  useEffect(() => {
    let current = light.current;
    scene.add(current.target);
    return () => {
      scene.remove(current.target);
    };
  }, [light, scene]);

  return (
    <>
      <OrbitControls />

      {/* <ambientLight color="#ffffff" intensity={10} /> */}
      {/* <hemisphereLight args={["#00f", "#f00", 2]} /> */}
      <directionalLight
        ref={light}
        color={0xffffff}
        intensity={2}
        position={[0, 5, 0]}
        target-position={[1, 0, 0]}
      />

      <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color="#2c3e50"
          roughness={0.5}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
        <sphereGeometry args={[1.5, 64, 64, 0, Math.PI]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.2} />
      </mesh>

      {/* 8개의 고리(torus) group 생성 */}
      {new Array(8).fill(null).map((item, index) => {
        return (
          <group key={index} rotation-y={THREE.MathUtils.degToRad(45 * index)}>
            <mesh
              geometry={torusGeometry}
              material={torusMaterial}
              position={[3, 0.5, 0]}
            ></mesh>
          </group>
        );
      })}
      {/* 고리 안을 통과하는 구 오브젝트 생성 */}
      <group name="smallSpherePivot">
        <mesh position={[3, 0.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="red"
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      </group>
    </>
  );
};

export default LightModel;
```

[demo](https://r3f-practice.vercel.app/light)

<br/>

# Camera

동일한 장면이라도 카메라의 위치에 따라 다르게 연출되기 때문에, 카메라는 3차원 그래픽에서 매우 중요한 요소 중에 하나이다. R3F의 기반이 되는 Three.js에서 일반적으로 사용하는 카메라는 다음과 같이 크게 두 가지가 있다.

- Perspective Camera (원근 표현 카메라)
- Orthographic Camera (정사 투영 카메라, 거리에 상관 없이 물체에 크기에 따라 랜더링 사이즈가 결정)

두 카메라에 모두 절두체(Frustum)이라는 개념이 존재하는데, 절두체란 카메라의 시야를 나타내거나 렌더링 과정에서 화면에 표시될 객체들을 결정하는데 사용되는 공간이다.

카메라 생성을 위한 파라메터 값들은 즉, 이 절두체를 정의하기 위한 값들이다.

- Perspective Camera
  - Fov (화각)
  - Aspect (비율) - 자동으로 설정됨
  - zNear, 절두체에 대한 가장 가까운 거리 
  - zFar, 절두체에 대한 가장 먼 거리

- Orthographic Camera
  - xLeft, xRight - 자동으로 설정됨
  - yTop, yBottom - 자동으로 설정됨
  - Near
  - Far

### 예시

```javascript
const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: "#9b59b6",
  roughness: 0.5,
  metalness: 1.2,
});

const CameraModel = (props: Props) => {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const smallSpherePivot = state.scene.getObjectByName("smallSpherePivot")!;
    // 그룹 객체의 이름으로 객체를 가져옴
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50);

    const target = new THREE.Vector3();
    // 카메라 위치를 빨간 구 World 좌표계 좌표로 설정
    smallSpherePivot.children[0].getWorldPosition(target);
    state.camera.position.copy(target);

    // 카메라가 구의 앞(ghostSphere)를 바라보도록(lookAt) 설정
    const ghostSpherePivot = state.scene.getObjectByName("ghostSpherePivot")!;
    ghostSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50 + 30);
    ghostSpherePivot.children[0].getWorldPosition(target);
    state.camera.lookAt(target);
  }); // 매 프레임 마다 callback function 호출되어 실행

  const light = useRef<THREE.RectAreaLight>(null!);

  return (
    <>
      <OrbitControls />

      <rectAreaLight
        color="#ffffff"
        intensity={60}
        width={1}
        height={3}
        ref={light}
        position={[0, 5, 0]}
        rotation-x={THREE.MathUtils.degToRad(-90)}
      />

      <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color="#2c3e50"
          roughness={0.5}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
        <sphereGeometry args={[1.5, 64, 64, 0, Math.PI]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.2} />
      </mesh>

      {/* 8개의 고리(torus) 생성 */}
      {new Array(8).fill(null).map((item, index) => {
        return (
          <group key={index} rotation-y={THREE.MathUtils.degToRad(45 * index)}>
            <mesh
              geometry={torusGeometry}
              material={torusMaterial}
              position={[3, 0.5, 0]}
            ></mesh>
          </group>
        );
      })}
      <group name="smallSpherePivot">
        <mesh position={[3, 0.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="red" roughness={0.2} metalness={0.5} />
        </mesh>
      </group>

      <group name="ghostSpherePivot">
        <object3D position={[3, 0.5, 0]} />
      </group>
    </>
  );
};

export default CameraModel;
```

__lightModel__ 코드에서 조명과 __useFrame__ 훅을 살짝 수정하고, 보이지않는 ghostSpherePivot 그룹을 추가하여 카메라가 빨간원과 같은 위치를 갖고, 그 앞의 ghostSpherePivot을 바라보도록 설정하였다.

[demo](https://r3f-practice.vercel.app/camera)

<br/>

# Shadow

Three.js 광원 중 그림자를 지원하는 광원은 다음과 같이 3가지가 있다.
- DirectionalLight
- PointLight
- SpotLight

또한 AccumulativeShadows나 ContactShadow, SoftShadows 같은 Drei에서 제공하는 그림자 컴포넌트도 있다. 

그림자를 만들기 위해서는 우선 __Canvas__ 에 __shadows__ 속성을 추가한 후, 그림자를 만들어 낼 광원에 __castShadows__ 속성을 추가해 주어야 한다. 추가적으로, 그림자를 받아 자신의 표면에 그림자를 표현할 __mesh__ 에 __receiveShadows__ 속성을 추가해 주면 된다.

즉, 그림자를 만들어 낼 객체엔 __castShadows__ 속성을, 그림자를 받아낼 객체엔 __receiveShadows__ 속성을 추가한다. 

### 예시

이전 lightModel 컴포넌트에서는 평맨 mesh 가운데에 반 구 모형의 mesh를 두었던 반면, shadowModel에서는 그림자 속성을 더 잘 확인하기 위해 torusKnotGeometry를 사용한 mesh를 배치하였다.

또한 __useRef__ 훅을 이용해 카메라를 참조하였고, directionalLight의 그림자를 위한 카메라를 인자로 하여 카메라 헬퍼 객체를 생성하였다. 생성된 카메라 헬퍼 객체를 장면에 추가해줌으로써, 광원과 그림자를 더 잘 확인할 수 있게 하였다. 

```javascript
const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: "#9b59b6",
  roughness: 0.5,
  metalness: 1.2,
});

const ShadowModel = (props: Props) => {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const smallSpherePivot = state.scene.getObjectByName("smallSpherePivot")!;
    // 그룹 객체의 이름으로 객체를 가져옴
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50);
    smallSpherePivot.children[0].getWorldPosition(
      light.current.target.position
    );
  }); // 매 프레임 마다 callback function 호출되어 실행

  const light = useRef<THREE.DirectionalLight>(null!);
  const shadowCamera = useRef<THREE.CameraHelper>(null!);

  const { scene } = useThree();
  useEffect(() => {
    let current = light.current;
    scene.add(current.target);
    shadowCamera.current = new THREE.CameraHelper(light.current.shadow.camera);
    scene.add(shadowCamera.current);

    return () => {
      scene.remove(current.target);
      scene.remove(shadowCamera.current);
    };
  }, [light, scene]);

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.5} />
      <directionalLight
        ref={light}
        castShadow
        color={0xffffff}
        intensity={1.5}
        position={[0, 5, 0]}
        target-position={[0, 0, 0]}
      />

      <mesh receiveShadow rotation-x={THREE.MathUtils.degToRad(-90)}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color="#2c3e50"
          roughness={0.5}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh castShadow receiveShadow position-y={1.7}>
        <torusKnotGeometry args={[1, 0.2, 128, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.2} />
      </mesh>

      {/* 8개의 고리(torus) 생성 */}
      {new Array(10).fill(null).map((item, index) => {
        return (
          <group key={index} rotation-y={THREE.MathUtils.degToRad(45 * index)}>
            <mesh
              castShadow
              receiveShadow
              geometry={torusGeometry}
              material={torusMaterial}
              position={[3, 0.5, 0]}
            ></mesh>
          </group>
        );
      })}
      <group name="smallSpherePivot">
        <mesh castShadow receiveShadow position={[3, 0.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="red" roughness={0.2} metalness={0.5} />
        </mesh>
      </group>
    </>
  );
};

export default ShadowModel;
```

demo: https://r3f-practice.vercel.app

<br/>

# Animation

R3F에서 지원하는 3D 모델 파일 형식은 매우 다양한데 이중 가장 많이 사용되는 형식은 __3DS__, __GLTF__, __FBX__, __OBJ__ 이다. 특히 __GLTF__ 형신은 크로노스 그룹에서 정의한 표준으로, 효율성이 매우 뛰어나다. 이전 포트폴리오 사이트 작업에서 사용한 3D 모델에서도 이 GLTF 형식을 사용했다.


### 예시

해당 모델의 기본 위치는 발 밑에서 위로 배치되어있기 때문에, 모델의 크기를 구해 크기만큼 position-y 값을 밑으로 배치하였다.

__drei__ 의 uesAnimation 훅과 __leva__ 의 useControls 훅을 이용하여 재생할 수 있는 animation 목록을 UI로 출력, 조정할 수 있도록 하였다.

이후 UI에서 선택된 action이 실행될 수 있도록 __useEffect__ 훅에서 action이 변경될 때마다 변경된 action의 __play__ 메소드를 실행시켜 해당 action의 animation이 출력되도록 하였다.

```javascript
const AnimationModel = (props: Props) => {
  const group = useRef<THREE.Group>(null!);
  const model = useGLTF("./3d/animation/model.glb");
  const animation = useAnimations(model.animations, model.scene);
  const { actionName } = useControls({
    actionName: {
      value: animation.names[1],
      options: animation.names,
    },
  });

  useEffect(() => {
    const action = animation.actions[actionName];
    // 새로운 action이 선택될시, 원래 실행되던 action 리셋 후
    // 0.5텀을 갖고 새로운 action 실행
    action?.reset().fadeIn(0.5).play();

    return () => {
      // clean-up function을 통해 이전 action이 0.5에 걸쳐 fade-out되도록 설정
      action?.fadeOut(0.5);
    };
  }, [actionName, animation.actions]);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    const modelHeight = group.current.scale.y;
    setHeight(modelHeight);

    console.log("Model Height:", modelHeight);
  }, [model.scene]);

  return (
    <>
      <OrbitControls />
      <Environment preset="sunset" />

      <group ref={group}>
        <primitive object={model.scene} scale={5} position-y={-height * 5} />
      </group>
    </>
  );
};

export default AnimationModel;
```

demo: https://r3f-practice.vercel.app/animation

