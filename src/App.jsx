import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  ContactShadows,
  Center,
  Loader,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
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

function App() {
  const [carcolor, setCarcolor] = useState("#173f5f");
  return (
    <div className="w-full h-full relative select-none">
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
            <Mustang color={carcolor} scale={2} />
          </Center>
        </Suspense>

        {/* zemin */}
        <Ground />

        {/* otomatik döndürme  */}
        <OrbitControls
          makeDefault
          autoRotate
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
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 p-4">
        {/* kırmızı buton */}
        <button
          className="w-12 h-12 rounded-full bg-red-600 border-2 border-white shadow-lg transform hover:scale-110 transition-all"
          onClick={() => setCarcolor("#ef4444")}
        />
        {/* mavi buton */}
        <button
          className="w-12 h-12 rounded-full bg-blue-800 border-2 border-white shadow-lg transform hover:scale-110 transition-all"
          onClick={() => setCarcolor("#173f5f")}
        />
        {/* siyah buton */}
        <button
          className="w-12 h-12 rounded-full bg-black border-2 border-white shadow-lg transform hover:scale-110 transition-all"
          onClick={() => setCarcolor("#000000")}
        />
        {/* sarı buton */}
        <button
          className="w-12 h-12 rounded-full bg-yellow-500 border-2 border-white shadow-lg transform hover:scale-110 transition-all"
          onClick={() => setCarcolor("#eab308")}
        />
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
