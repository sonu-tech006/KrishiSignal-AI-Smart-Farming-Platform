import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Sun, CloudRain, Wind, Layers, Eye } from 'lucide-react';

interface FarmField3DProps {
  isRaining?: boolean;
  cropType?: string;
  soilMoisturePercent?: number;
  temperature?: number;
  compact?: boolean;
}

export const FarmField3D: React.FC<FarmField3DProps> = ({
  isRaining = false,
  cropType = 'Wheat (गेहूँ)',
  soilMoisturePercent = 42,
  compact = false
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePin, setActivePin] = useState<string | null>('moisture');
  const [viewMode, setViewMode] = useState<'realistic' | 'thermal' | 'top'>('realistic');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 340;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(viewMode === 'thermal' ? 0x051329 : 0xecfdf5); // Soft pale mint or dark thermal
    scene.fog = new THREE.FogExp2(viewMode === 'thermal' ? 0x051329 : 0xecfdf5, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(12, 10, 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, isRaining ? 0.6 : 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(isRaining ? 0x93c5fd : 0xfef08a, isRaining ? 0.8 : 1.6);
    sunLight.position.set(15, 20, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    // 1. Terrain Ground
    const groundGeo = new THREE.PlaneGeometry(18, 18, 32, 32);
    // Slight wavy agricultural field contour
    const pos = groundGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = Math.sin(x * 0.4) * 0.2 + Math.cos(y * 0.4) * 0.2;
      pos.setZ(i, z);
    }
    groundGeo.computeVertexNormals();

    const groundColor = viewMode === 'thermal' 
      ? 0x1e3a8a 
      : (soilMoisturePercent > 40 ? 0x452311 : 0x784421); // Rich dark moist loam vs dry soil
    const groundMat = new THREE.MeshStandardMaterial({
      color: groundColor,
      roughness: 0.9,
      metalness: 0.1,
      flatShading: true
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 2. Crop Rows (Furrows with instanced crops)
    const cropGroup = new THREE.Group();
    const cropColor = viewMode === 'thermal' 
      ? 0x10b981 
      : (cropType.includes('Mustard') ? 0xeab308 : 0x15803d);

    const stalkGeo = new THREE.CylinderGeometry(0.04, 0.06, 1.2, 4);
    const stalkMat = new THREE.MeshStandardMaterial({ color: cropColor, roughness: 0.6 });
    
    const earGeo = new THREE.ConeGeometry(0.12, 0.4, 5);
    const earMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.5 }); // Golden wheat head

    const stalks: THREE.Mesh[] = [];

    // Create 7 crop rows
    for (let row = -6; row <= 6; row += 1.8) {
      for (let col = -6; col <= 6; col += 0.8) {
        const stalk = new THREE.Mesh(stalkGeo, stalkMat);
        stalk.position.set(col + (Math.random() - 0.5) * 0.2, 0.6, row);
        stalk.castShadow = true;
        cropGroup.add(stalk);
        stalks.push(stalk);

        // Add wheat grain head or mustard flower
        const ear = new THREE.Mesh(earGeo, earMat);
        ear.position.set(stalk.position.x, 1.2, stalk.position.z);
        cropGroup.add(ear);
      }
    }
    scene.add(cropGroup);

    // 3. Sensor Station & Irrigation Droplets
    const poleGeo = new THREE.CylinderGeometry(0.1, 0.1, 2.5, 8);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(0, 1.25, 0);
    scene.add(pole);

    // Blinking Sensor Light
    const beaconGeo = new THREE.SphereGeometry(0.25, 12, 12);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(0, 2.6, 0);
    scene.add(beacon);

    // 4. Rain Particles (if isRaining)
    let rainParticles: THREE.Points | null = null;
    if (isRaining) {
      const rainCount = 800;
      const rainGeo = new THREE.BufferGeometry();
      const rainPos = new Float32Array(rainCount * 3);
      for (let i = 0; i < rainCount * 3; i += 3) {
        rainPos[i] = (Math.random() - 0.5) * 20;
        rainPos[i + 1] = Math.random() * 12 + 1;
        rainPos[i + 2] = (Math.random() - 0.5) * 20;
      }
      rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
      const rainMat = new THREE.PointsMaterial({
        color: 0x60a5fa,
        size: 0.12,
        transparent: true,
        opacity: 0.7
      });
      rainParticles = new THREE.Points(rainGeo, rainMat);
      scene.add(rainParticles);
    } else {
      // Golden pollen particles floating
      const pollenCount = 80;
      const pollenGeo = new THREE.BufferGeometry();
      const pollenPos = new Float32Array(pollenCount * 3);
      for (let i = 0; i < pollenCount * 3; i += 3) {
        pollenPos[i] = (Math.random() - 0.5) * 16;
        pollenPos[i + 1] = Math.random() * 4 + 0.5;
        pollenPos[i + 2] = (Math.random() - 0.5) * 16;
      }
      pollenGeo.setAttribute('position', new THREE.BufferAttribute(pollenPos, 3));
      const pollenMat = new THREE.PointsMaterial({
        color: 0xfef08a,
        size: 0.15,
        transparent: true,
        opacity: 0.6
      });
      const pollen = new THREE.Points(pollenGeo, pollenMat);
      scene.add(pollen);
    }

    // Interactive Drag Controls (Manual Orbit)
    let isDragging = false;
    let prevMouseX = 0;
    let rotationAngle = 0.8;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      prevMouseX = e.clientX;
      rotationAngle += deltaX * 0.008;
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow smooth auto-rotate if not dragging
      if (!isDragging) {
        rotationAngle += 0.0015;
      }

      // Camera positioning around scene
      const radius = 17;
      camera.position.x = Math.sin(rotationAngle) * radius;
      camera.position.z = Math.cos(rotationAngle) * radius;
      camera.position.y = viewMode === 'top' ? 22 : 11;
      camera.lookAt(0, 0, 0);

      // Wind sway for wheat stalks
      const windOffset = Math.sin(elapsedTime * 2.5) * 0.08;
      stalks.forEach((stalk, idx) => {
        stalk.rotation.z = windOffset + Math.sin(elapsedTime * 2 + idx) * 0.04;
      });

      // Beacon pulse
      beaconMat.color.setRGB(
        0.1,
        0.7 + Math.sin(elapsedTime * 4) * 0.3,
        0.3
      );

      // Rain animation
      if (rainParticles) {
        const positions = rainParticles.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] -= 0.35;
          if (positions[i] < 0) {
            positions[i] = 12;
          }
        }
        rainParticles.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || (compact ? 240 : 360);
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      stalkGeo.dispose();
      stalkMat.dispose();
    };
  }, [isRaining, cropType, soilMoisturePercent, viewMode, compact]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-emerald-950/5 via-slate-900/5 to-emerald-900/10 border border-emerald-800/20 shadow-inner group">
      {/* 3D WebGL Canvas */}
      <div 
        ref={mountRef} 
        className={`w-full cursor-grab active:cursor-grabbing ${compact ? 'h-64' : 'h-80 sm:h-96'}`}
      />

      {/* Modern Floating UI HUD Over 3D Canvas */}
      <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 pointer-events-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-xs font-semibold border border-emerald-500/30 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          3D Smart Farm Digital Twin
        </span>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/70 backdrop-blur-md text-slate-200 text-xs border border-white/10">
          <Wind className="w-3.5 h-3.5 text-sky-400" />
          Micro-Climate Synced
        </span>
      </div>

      {/* View Mode Controls */}
      <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-1 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 text-xs">
        <button
          onClick={() => setViewMode('realistic')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
            viewMode === 'realistic' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Visual
        </button>
        <button
          onClick={() => setViewMode('thermal')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
            viewMode === 'thermal' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Soil Moisture
        </button>
        <button
          onClick={() => setViewMode('top')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
            viewMode === 'top' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Bird's Eye
        </button>
      </div>

      {/* Interactive Telemetry Overlay Badges */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
          {/* Soil Moisture Pill */}
          <button
            onClick={() => setActivePin(activePin === 'moisture' ? null : 'moisture')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all shadow-md flex items-center gap-2 border ${
              activePin === 'moisture'
                ? 'bg-emerald-600 text-white border-emerald-400'
                : 'bg-white/90 text-slate-800 border-slate-200 hover:bg-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Root-Zone Moisture: <strong>{soilMoisturePercent}% (Optimal)</strong></span>
          </button>

          {/* Weather Status */}
          <div className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/85 backdrop-blur-md text-slate-800 border border-slate-200/80 shadow-md flex items-center gap-1.5">
            {isRaining ? (
              <>
                <CloudRain className="w-3.5 h-3.5 text-blue-500 animate-bounce" />
                <span>Precipitation Active</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Clear Sunlight • 24°C</span>
              </>
            )}
          </div>
        </div>

        {/* Drag Hint */}
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-500 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <Eye className="w-3 h-3" />
          <span>Click & drag to rotate 3D view</span>
        </div>
      </div>
    </div>
  );
};
