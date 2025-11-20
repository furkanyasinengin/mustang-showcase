import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  ContactShadows,
  Center,
} from "@react-three/drei";
import { Model as Mustang } from "./components/Mustang";
function App() {
  const [carcolor, setCarcolor] = useState("#173f5f");
  return (
    <div className="w-full h-full bg-gray-900 relative">
      {/* 3D sahne başlangıcı */}
      <Canvas camera={{ position: [4, 3, 6], fov: 45 }}>
        {/* ışıklandırma */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

        {/* yansıma */}
        <Environment preset="city" />

        <Suspense fallback={null}>
          <Center>
            <Mustang color={carcolor} scale={2} />
          </Center>
        </Suspense>

        {/* alt gölge  */}
        <ContactShadows
          resolution={1024}
          scale={10}
          blur={1.5}
          opacity={0.5}
          far={10}
          color="#000000"
        />

        {/* mouse ile kamera hareketi */}
        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
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
    </div>
  );
}

export default App;
