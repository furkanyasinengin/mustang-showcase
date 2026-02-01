# Ford Mustang 3D Showroom

An interactive 3D web application showcasing the evolution of the Ford Mustang. This project utilizes React Three Fiber to render high-fidelity 3D models with real-time customization options for paint colors and viewing angles.

## Project Overview

This application serves as a 3D car configurator and virtual showroom. It allows users to explore five distinct generations of the Ford Mustang in a high-performance WebGL environment. The scene features realistic lighting, reflections, and post-processing effects to ensure a cinematic visual experience directly in the browser.

## Features

- **Multi-Generation Showcase:** Seamlessly switch between iconic models including the 1965 Classic, 1969 Edition, 2005 GT, 2017 GT, and the Shelby GT500.
- **Cinematic Camera Controls:** Integrated GSAP animations provide smooth transitions between predefined camera angles (Front, Side, Rear, Top, and Quarter views).
- **Real-Time Customization:** Users can dynamically apply different automotive paint colors to the active car model without reloading the scene.
- **Advanced Rendering:** Utilizes `MeshReflectorMaterial` for realistic floor reflections and `EffectComposer` with Bloom for photorealistic lighting effects.
- **Performance Optimization:** Implements React Suspense for asset loading and optimized geometry handling for smooth frame rates.

## Technologies Used

- **Core:** React, TypeScript
- **3D Engine:** Three.js, React Three Fiber (@react-three/fiber)
- **Helpers & Abstractions:** React Three Drei (@react-three/drei)
- **Post-Processing:** @react-three/postprocessing
- **Animation:** GSAP (GreenSock Animation Platform)
- **Styling:** Tailwind CSS

## 3D Model Credits

The 3D models used in this project are sourced from Sketchfab under Creative Commons licenses. Full attribution for each model (Author and License) is displayed dynamically within the application interface.
