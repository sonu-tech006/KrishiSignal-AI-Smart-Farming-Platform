import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ZoomIn, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

interface CropInspector3DProps {
  diseaseSpotActive?: boolean;
  cropName?: string;
  stageName?: string;
}

export const CropInspector3D: React.FC<CropInspector3DProps> = ({
  diseaseSpotActive = true,
  cropName = 'Wheat (गेहूँ - HD-2967)',
  stageName = 'Tillering Stage (42 DAS)'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedPart, setSelectedPart] = useState<'leaf' | 'stem' | 'root'>('leaf');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 1.5, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const light1 = new THREE.DirectionalLight(0xffffff, 1.2);
    light1.position.set(5, 8, 5);
    scene.add(light1);

    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    // Plant Root Group
    const plantGroup = new THREE.Group();

    // Stem
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -1.8, 0),
      new THREE.Vector3(0.1, -0.6, 0.1),
      new THREE.Vector3(-0.08, 0.6, 0),
      new THREE.Vector3(0.05, 1.8, -0.05)
    ]);
    const stemGeo = new THREE.TubeGeometry(stemCurve, 32, 0.08, 8, false);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.4
    });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    plantGroup.add(stem);

    // Leaves
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.quadraticCurveTo(0.4, 1.2, 0, 2.4);
    leafShape.quadraticCurveTo(-0.4, 1.2, 0, 0);
    const leafGeo = new THREE.ShapeGeometry(leafShape);
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x16a34a,
      side: THREE.DoubleSide,
      roughness: 0.5
    });

    const leaf1 = new THREE.Mesh(leafGeo, leafMat);
    leaf1.position.set(0, 0.2, 0);
    leaf1.rotation.set(0.4, 0.5, -0.6);
    leaf1.scale.set(0.8, 0.8, 0.8);
    plantGroup.add(leaf1);

    const leaf2 = new THREE.Mesh(leafGeo, leafMat);
    leaf2.position.set(0, -0.4, 0);
    leaf2.rotation.set(-0.3, -0.8, 0.7);
    leaf2.scale.set(0.9, 0.9, 0.9);
    plantGroup.add(leaf2);

    // Disease pustules (Yellow Rust spots)
    if (diseaseSpotActive) {
      const rustGroup = new THREE.Group();
      const spotGeo = new THREE.SphereGeometry(0.04, 6, 6);
      const spotMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b }); // Yellow/orange rust spores

      for (let s = 0; s < 14; s++) {
        const spot = new THREE.Mesh(spotGeo, spotMat);
        spot.position.set(
          (Math.random() - 0.5) * 0.25,
          0.6 + s * 0.1,
          0.06 + Math.random() * 0.02
        );
        rustGroup.add(spot);
      }
      leaf1.add(rustGroup);
    }

    // Roots
    const rootMat = new THREE.MeshStandardMaterial({ color: 0xca8a04, roughness: 0.8 });
    for (let r = 0; r < 6; r++) {
      const angle = (r / 6) * Math.PI * 2;
      const rootCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -1.8, 0),
        new THREE.Vector3(Math.cos(angle) * 0.4, -2.2, Math.sin(angle) * 0.4),
        new THREE.Vector3(Math.cos(angle) * 0.7, -2.6, Math.sin(angle) * 0.7)
      ]);
      const rootGeo = new THREE.TubeGeometry(rootCurve, 16, 0.03, 6, false);
      const rootMesh = new THREE.Mesh(rootGeo, rootMat);
      plantGroup.add(rootMesh);
    }

    scene.add(plantGroup);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      plantGroup.rotation.y += 0.008;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [diseaseSpotActive]);

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="text-sm font-bold text-slate-800">{cropName}</h4>
          <p className="text-xs text-slate-500">{stageName}</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
          3D Anatomy Model
        </span>
      </div>

      <div className="relative w-full h-56 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center">
        <div ref={mountRef} className="w-full h-full cursor-pointer" />

        {diseaseSpotActive && (
          <div className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-amber-500 text-white text-[11px] font-semibold flex items-center gap-1 shadow">
            <AlertCircle className="w-3.5 h-3.5" />
            Yellow Rust Spores Detected
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Crown Root: Well developed
        </span>
        <span className="flex items-center gap-1 text-amber-600 font-medium">
          Flag Leaf: Monitor fungal risk
        </span>
      </div>
    </div>
  );
};
