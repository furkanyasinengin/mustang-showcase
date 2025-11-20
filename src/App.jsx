import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Center,
  Loader,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import gsap from "gsap";
import { Model as Mustang_1965 } from "./components/Mustang-1965";
import { Model as Mustang_1969 } from "./components/Mustang-1969";
import { Model as Mustang_2005 } from "./components/Mustang-2005";
import { Model as Mustang_2017 } from "./components/Mustang-2017-gt";
import { Model as Mustang_GT500 } from "./components/Mustang-shelby-gt500";
const CAR_DATA = [
  {
    id: 0,
    title: "MUSTANG",
    subtitle: "1965 CLASSIC EDITION",
    author: "Pooya_dh",
    carName: "Ford Mustang 1965",
    carlink: "https://skfb.ly/oFE7V",
    license: "Creative Commons Attribution-NonCommercial",
    licenseLink: "http://creativecommons.org/licenses/by-nc/4.0/",
  },
  {
    id: 1,
    title: "MUSTANG",
    subtitle: "John Bowe 1969",
    author: "vecarz",
    carName: "Ford Mustang John Bowe 1969 | www.vecarz.com",
    carLink: "https://skfb.ly/pxVwR",
    license: "Creative Commons Attribution",
    licenseLink: "http://creativecommons.org/licenses/by/4.0/",
  },
  {
    id: 2,
    title: "MUSTANG",
    subtitle: "2005 Ford Mustang GT",
    author: "Ricy",
    carName: "2005 Ford Mustang GT",
    carLink: "https://skfb.ly/oTXPT",
    license: "Creative Commons Attribution",
    licenseLink: "http://creativecommons.org/licenses/by/4.0/",
  },
  {
    id: 3,
    title: "MUSTANG",
    subtitle: "2017 Ford Mustang GT",
    author: "IsaacOldton",
    carName: "2017 Ford Mustang GT",
    carLink: "https://skfb.ly/oQuMG",
    license: "Creative Commons Attribution",
    licenseLink: "http://creativecommons.org/licenses/by/4.0/",
  },
  {
    id: 4,
    title: "MUSTANG",
    subtitle: "Shelby GT500",
    author: "Jiaxing",
    carName: "Ford Mustang Shelby GT500",
    carLink: "https://skfb.ly/ozAnK",
    license: "Creative Commons Attribution",
    licenseLink: "http://creativecommons.org/licenses/by/4.0/",
  },
];
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.85, 0]}>
      <circleGeometry args={[2.5, 60]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={40}
        roughness={0.5}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#101010"
        metalness={0.1}
        mirror={0.5}
      />
    </mesh>
  );
}

function CameraRig({ v, controlsRef }) {
  const { camera } = useThree();
  const previousView = useRef(v);
  useEffect(() => {
    if (previousView.current === v) {
      return;
    }
    previousView.current = v;
    let targetPos = [3, -1, 4];
    let targetLook = [0, 0, 0];

    if (v === "front_quarter") {
      targetPos = [-4, 1.5, 4];
      targetLook = [0, 0, 0];
    } else if (v === "front") {
      targetPos = [0, 0.5, 6.5];
      targetLook = [0, 0, 0];
    } else if (v === "back") {
      targetPos = [0, 0.5, -6.5];
      targetLook = [0, 0, 0];
    } else if (v === "side") {
      targetPos = [6.5, 0.2, 0];
      targetLook = [0, 0, 0];
    } else if (v === "rear_quarter") {
      targetPos = [4.5, 2.5, -4.5];
      targetLook = [0, 0, 0];
    } else if (v === "top") {
      targetPos = [0, 9, 0.01];
      targetLook = [0, 0, 0];
    }
    gsap.to(camera.position, {
      x: targetPos[0],
      y: targetPos[1],
      z: targetPos[2],
      duration: 1.5,
      ease: "power3.inOut",
    });

    if (controlsRef.current) {
      gsap.to(controlsRef.current.target, {
        x: targetLook[0],
        y: targetLook[1],
        z: targetLook[2],
        duration: 1.5,
        ease: "power3.inOut",
        onUpdate: () => controlsRef.current.update(),
      });
    }
  }, [v, camera, controlsRef]);
  return null;
}

function App() {
  const [currentCar, setCurrentCar] = useState(0);
  const [carColor, setCarColor] = useState("#2b373d");
  const [view, setView] = useState("default");
  const controlsRef = useRef();

  return (
    <div className="w-full h-full relative bg-black select-none">
      {/* başlık ve logo */}
      <div className="absolute top-8 left-8 z-10 text-white pointer-events-none">
        <h1 className="text-6xl font-bold tracking-tighter font-serif">
          Mustang
        </h1>
        <p className="text-xl font-light tracking-widest text-white mt-2">
          {CAR_DATA[currentCar].subtitle}
        </p>
        <div className="w-24 h-1 bg-red-600 mt-4"></div>
      </div>

      {/* Kamera açı butonları */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl">
        <button
          onClick={() => setView("default")}
          className={`text-white font-light text-sm tracking-widest py-2 px-4 border-l-2 transition-all hover:bg-white/10 ${
            view === "default"
              ? "border-red-600 bg-white/5"
              : "border-transparent opacity-50 hover:opacity-100"
          }`}
        >
          GENEL BAKIŞ
        </button>
        <button
          onClick={() => setView("front")}
          className={`text-white font-light text-sm tracking-widest py-2 px-4 border-l-2 transition-all hover:bg-white/10 ${
            view === "front"
              ? "border-red-600 bg-white/5"
              : "border-transparent opacity-50 hover:opacity-100"
          }`}
        >
          ÖN
        </button>
        <button
          onClick={() => setView("back")}
          className={`text-white font-light text-sm tracking-widest py-2 px-4 border-l-2 transition-all hover:bg-white/10 ${
            view === "back"
              ? "border-red-600 bg-white/5"
              : "border-transparent opacity-50 hover:opacity-100"
          }`}
        >
          ARKA
        </button>
        <button
          onClick={() => setView("side")}
          className={`text-white font-light text-sm tracking-widest py-2 px-4 border-l-2 transition-all hover:bg-white/10 ${
            view === "side"
              ? "border-red-600 bg-white/5"
              : "border-transparent opacity-50 hover:opacity-100"
          }`}
        >
          YAN
        </button>
        <button
          onClick={() => setView("top")}
          className={`text-white font-light text-sm tracking-widest py-2 px-4 border-l-2 transition-all hover:bg-white/10 ${
            view === "top"
              ? "border-red-600 bg-white/5"
              : "border-transparent opacity-50 hover:opacity-100"
          }`}
        >
          ÜST
        </button>
        <button
          onClick={() => setView("rear_quarter")}
          className={`text-white font-light text-sm tracking-widest py-2 px-4 border-l-2 transition-all hover:bg-white/10 ${
            view === "rear_quarter"
              ? "border-red-600 bg-white/5"
              : "border-transparent opacity-50 hover:opacity-100"
          }`}
        >
          ARKA ÇAPRAZ
        </button>
        <button
          onClick={() => setView("front_quarter")}
          className={`text-white font-light text-sm tracking-widest py-2 px-4 border-l-2 transition-all hover:bg-white/10 ${
            view === "front_quarter"
              ? "border-red-600 bg-white/5"
              : "border-transparent opacity-50 hover:opacity-100"
          }`}
        >
          ÖN ÇAPRAZ
        </button>
      </div>

      {/* model seçme butonları */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 flex gap-4 bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
        <button
          onClick={() => setCurrentCar(0)}
          className={`text-white text-xs font-bold px-4 py-2 rounded-lg transition-all ${
            currentCar === 0 ? "bg-red-600" : "hover:bg-white/10"
          }`}
        >
          1965
        </button>
        <button
          onClick={() => setCurrentCar(1)}
          className={`text-white text-xs font-bold px-4 py-2 rounded-lg transition-all ${
            currentCar === 1 ? "bg-red-600" : "hover:bg-white/10"
          }`}
        >
          1969
        </button>
        <button
          onClick={() => setCurrentCar(2)}
          className={`text-white text-xs font-bold px-4 py-2 rounded-lg transition-all ${
            currentCar === 2 ? "bg-red-600" : "hover:bg-white/10"
          }`}
        >
          2005
        </button>
        <button
          onClick={() => setCurrentCar(3)}
          className={`text-white text-xs font-bold px-4 py-2 rounded-lg transition-all ${
            currentCar === 3 ? "bg-red-600" : "hover:bg-white/10"
          }`}
        >
          2017
        </button>
        <button
          onClick={() => setCurrentCar(4)}
          className={`text-white text-xs font-bold px-4 py-2 rounded-lg transition-all ${
            currentCar === 4 ? "bg-red-600" : "hover:bg-white/10"
          }`}
        >
          Shelby GT500
        </button>
      </div>

      {/* 3D sahne başlangıcı */}
      <Canvas camera={{ position: [3, -1, 4], fov: 40 }}>
        {/* sahne arka planı */}
        <color attach="background" args={["#050505"]} />
        {/* ışıklandırma */}
        <ambientLight intensity={2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={10}
          castShadow
        />
        <spotLight
          position={[-10, 10, -10]}
          angle={0.15}
          penumbra={1}
          intensity={5}
          color="blue"
        />
        {/* yansıma */}
        <Environment preset="city" />

        <Suspense fallback={null}>
          <Center position={[0, -0.05, 0]}>
            {currentCar === 0 && <Mustang_1965 color={carColor} scale={2.5} />}
            {currentCar === 1 && <Mustang_1969 color={carColor} scale={0.01} />}
            {currentCar === 2 && <Mustang_2005 color={carColor} scale={1.1} />}
            {currentCar === 3 && <Mustang_2017 color={carColor} scale={1} />}
            {currentCar === 4 && (
              <Mustang_GT500
                color={carColor}
                scale={1}
                position={[0, 0, -2.25]}
              />
            )}
          </Center>
          {/* zemin */}
          <Ground />
        </Suspense>

        <CameraRig v={view} controlsRef={controlsRef} />

        {/* otomatik döndürme  */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          autoRotate={view === "default"}
          autoRotateSpeed={0.5}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          enablePan={false}
          enableZoom={true}
          maxDistance={10}
          minDistance={3}
        />

        {/* parlak yerlerin ışık saçmasını sağlar  */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.6}
            luminanceSmoothing={0.9}
            intensity={0.2}
          />
        </EffectComposer>
      </Canvas>
      <Loader
        dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
        containerStyles={{ background: "#050505" }}
        barStyles={{ backgroundColor: "#ef4444", height: 5 }}
        dataStyles={{
          color: "white",
          fontSize: "14px",
          fontFamily: "sans-serif",
        }}
      />
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
        <div className="flex gap-4 p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
          {/* koyu gök mavisi */}
          <button
            className="w-10 h-10 rounded-full bg-sky-900 border-2 border-white/20 hover:border-white hover:scale-110 transition-all"
            onClick={() => setCarColor("#2b373d")}
          />
          {/* kırmızı */}
          <button
            className="w-10 h-10 rounded-full bg-rose-600 border-2 border-white/20 hover:border-white hover:scale-110 transition-all"
            onClick={() => setCarColor("#ba3025")}
          />
          {/* koyu gri */}
          <button
            className="w-10 h-10 rounded-full bg-gray-700 border-2 border-white/20 hover:border-white hover:scale-110 transition-all"
            onClick={() => setCarColor("#313338")}
          />
          {/* mat mavi */}
          <button
            className="w-10 h-10 rounded-full bg-blue-200 border-2 border-white/20 hover:border-white hover:scale-110 transition-all"
            onClick={() => setCarColor("#4a576b")}
          />
          {/* koyu kırmızı */}
          <button
            className="w-10 h-10 rounded-full bg-rose-900 border-2 border-white/20 hover:border-white hover:scale-110 transition-all"
            onClick={() => setCarColor("#4d0c17")}
          />
          {/* gök mavisi */}
          <button
            className="w-10 h-10 rounded-full bg-orange-500 border-2 border-white/20 hover:border-white hover:scale-110 transition-all"
            onClick={() => setCarColor("#df6127")}
          />
        </div>
      </div>
      {/* Lisans bilgisi */}
      <div className="absolute bottom-2 right-4 text-xs text-white">
        <a href={CAR_DATA[currentCar].carLink}>
          {CAR_DATA[currentCar].carName}
        </a>{" "}
        by {CAR_DATA[currentCar].author} is licensed under{" "}
        <a href={CAR_DATA[currentCar].licenseLink}>
          {CAR_DATA[currentCar].license}
        </a>
      </div>
    </div>
  );
}

export default App;
