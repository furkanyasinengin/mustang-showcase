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
import { Model as Mustang } from "./components/Mustang";

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

    if (v === "rims") {
      targetPos = [1.6, -0.2, 2.92];
      targetLook = [-0.5, -0.2, -0.5];
    } else if (v === "hood") {
      targetPos = [-0.0, 3.5, 1.5];
      targetLook = [0, 0.5, 1.0];
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
  const [carColor, setCarColor] = useState("#173f5f");
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
          1965 CLASSIC EDITION
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
          onClick={() => setView("rims")}
          className={`text-white font-light text-sm tracking-widest py-2 px-4 border-l-2 transition-all hover:bg-white/10 ${
            view === "rims"
              ? "border-red-600 bg-white/5"
              : "border-transparent opacity-50 hover:opacity-100"
          }`}
        >
          JANT
        </button>
        <button
          onClick={() => setView("hood")}
          className={`text-white font-light text-sm tracking-widest py-2 px-4 border-l-2 transition-all hover:bg-white/10 ${
            view === "hood"
              ? "border-red-600 bg-white/5"
              : "border-transparent opacity-50 hover:opacity-100"
          }`}
        >
          KAPUT
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
          <Center position={[0, -0.26, 0]}>
            <Mustang color={carColor} scale={2} />
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
          {/* mavi buton */}
          <button
            className="w-10 h-10 rounded-full bg-blue-900 border-2 border-white/20 hover:border-white hover:scale-110 transition-all"
            onClick={() => setCarColor("#173F5F")}
          />
          {/* kırmızı buton */}
          <button
            className="w-10 h-10 rounded-full bg-red-600 border-2 border-white/20 hover:border-white hover:scale-110 transition-all"
            onClick={() => setCarColor("#ef4444")}
          />
          {/* siyah buton */}
          <button
            className="w-10 h-10 rounded-full bg-black border-2 border-white/20 hover:border-white hover:scale-110 transition-all"
            onClick={() => setCarColor("#000000")}
          />
          {/* white buton */}
          <button
            className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white/20 hover:border-white hover:scale-110 transition-all"
            onClick={() => setCarColor("#e5e7eb")}
          />
          {/* sarı buton */}
          <button
            className="w-10 h-10 rounded-full bg-yellow-500 border-2 border-white/20 hover:border-white hover:scale-110 transition-all"
            onClick={() => setCarColor("#a57f0e")}
          />
        </div>
      </div>
      {/* Lisans bilgisi */}
      <div className="absolute bottom-2 right-4 text-xs text-white">
        <a href="https://skfb.ly/oFE7V">Ford Mustang 1965</a> by Pooya_dh is
        licensed under{" "}
        <a href="http://creativecommons.org/licenses/by-nc/4.0/">
          Creative Commons Attribution-NonCommercial
        </a>
      </div>
    </div>
  );
}

export default App;
