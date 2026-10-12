import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useCursor, globalMousePos } from '../../context/CursorContext';
import { centralLoop } from '../../utils/unifiedLoop';

interface Phone3DCanvasProps {
  className?: string;
  activeProduct?: string;
  allowColorChange?: boolean;
  onFoldStateChange?: (state: string) => void;
}

export const Phone3DCanvas: React.FC<Phone3DCanvasProps> = ({
  className = '',
  activeProduct = 'fold',
  allowColorChange = false,
  onFoldStateChange
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor, isMobile, setIsDragging3D } = useCursor();
  const [hasWebGlError, setHasWebGlError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rootGroupRef = useRef<THREE.Group | null>(null);
  const leftFlapRef = useRef<THREE.Group | null>(null);
  const rightFlapRef = useRef<THREE.Group | null>(null);
  const hingeMeshRef = useRef<THREE.Mesh | null>(null);

  // Drag & idle interaction tracking
  const isDragging = useRef(false);
  const previousPointerPosition = useRef({ x: 0, y: 0 });
  const baseRotation = useRef({ x: 0.12, y: -0.38 });
  const targetRotation = useRef({ x: 0.12, y: -0.38 });
  const currentFoldAngle = useRef(2.18); // Elegant ~125 deg book mode pose

  // High-fidelity wallpaper texture for inner AMOLED display
  const createFoldableWallpaperTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.Texture();

    // Deep Jade & Obsidian luxury backdrop
    const grad = ctx.createRadialGradient(512, 512, 40, 512, 512, 600);
    grad.addColorStop(0, '#0a383f');
    grad.addColorStop(0.45, '#072D33');
    grad.addColorStop(0.85, '#03171a');
    grad.addColorStop(1, '#020b0d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Elegant champagne and jade ribbons (crisp flagship presentation)
    ctx.save();
    for (let i = 0; i < 4; i++) {
      const waveGrad = ctx.createLinearGradient(120, 120 + i * 160, 900, 420 + i * 140);
      if (i % 2 === 0) {
        waveGrad.addColorStop(0, 'rgba(223, 190, 139, 0)');
        waveGrad.addColorStop(0.35, 'rgba(223, 190, 139, 0.70)');
        waveGrad.addColorStop(0.75, 'rgba(154, 188, 171, 0.50)');
        waveGrad.addColorStop(1, 'rgba(58, 117, 100, 0)');
      } else {
        waveGrad.addColorStop(0, 'rgba(245, 240, 230, 0)');
        waveGrad.addColorStop(0.4, 'rgba(245, 240, 230, 0.75)');
        waveGrad.addColorStop(0.8, 'rgba(223, 190, 139, 0.45)');
        waveGrad.addColorStop(1, 'rgba(7, 45, 51, 0)');
      }

      ctx.fillStyle = waveGrad;
      ctx.beginPath();
      ctx.moveTo(100, 220 + i * 120);
      ctx.bezierCurveTo(360, 100 + i * 100, 680, 380 + i * 120, 940, 280 + i * 130);
      ctx.bezierCurveTo(720, 480 + i * 100, 380, 260 + i * 120, 100, 340 + i * 120);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Subtle central crease shadow indicator
    const creaseGrad = ctx.createLinearGradient(500, 0, 524, 0);
    creaseGrad.addColorStop(0, 'rgba(0,0,0,0)');
    creaseGrad.addColorStop(0.5, 'rgba(0,0,0,0.3)');
    creaseGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = creaseGrad;
    ctx.fillRect(500, 0, 24, 1024);

    // Status bar: 5G, Wi-Fi, 100% Battery
    ctx.fillStyle = '#F5F0E6';
    ctx.font = '600 24px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('5G', 80, 70);

    // Battery icon
    ctx.strokeStyle = '#F5F0E6';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(895, 52, 38, 22);
    ctx.fillRect(900, 56, 30, 14);
    ctx.fillRect(935, 58, 3, 10);

    // Clock
    ctx.font = '700 88px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#F5F0E6';
    ctx.textAlign = 'center';
    ctx.fillText('9:41', 512, 280);

    ctx.font = '600 22px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#DFBE8B';
    ctx.fillText('Josan Computer & Mobile • Punjab', 512, 335);

    // Bottom home indicator bar
    ctx.fillStyle = '#F5F0E6';
    ctx.beginPath();
    ctx.roundRect(512 - 80, 980, 160, 6, 3);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }, []);

  // Build the 3D smartphone scene
  useEffect(() => {
    let renderer: THREE.WebGLRenderer | null = null;
    let unsubscribeLoop: (() => void) | null = null;

    try {
      const container = mountRef.current;
      if (!container) return;

      const width = container.clientWidth || 440;
      const height = container.clientHeight || 560;

      // 1. Scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // 2. Camera: carefully framed so the phone is never clipped
      const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 50);
      camera.position.set(0, 0, 6.4);
      cameraRef.current = camera;

      // 3. Renderer with antialiasing
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // 4. Studio Lighting matching premium dark-teal and champagne showroom
      const hemiLight = new THREE.HemisphereLight(0x3a7564, 0x072d33, 2.2);
      scene.add(hemiLight);

      const ambientLight = new THREE.AmbientLight(0x0e2f36, 1.6);
      scene.add(ambientLight);

      // Key light: Warm Champagne
      const keyDir = new THREE.DirectionalLight(0xdfbe8b, 2.4);
      keyDir.position.set(3.5, 4, 4);
      scene.add(keyDir);

      // Plum / Jade rim light on back panel
      const plumRim = new THREE.DirectionalLight(0x8a5563, 2.0);
      plumRim.position.set(-4, -1, 1.5);
      scene.add(plumRim);

      // Soft Sage rim light from behind
      const sageBack = new THREE.DirectionalLight(0x9abcab, 1.6);
      sageBack.position.set(0, 3, -4);
      scene.add(sageBack);

      // Frontal fill light for crisp display
      const frontalSoftLight = new THREE.DirectionalLight(0xf5f0e6, 1.2);
      frontalSoftLight.position.set(0, 0, 5.5);
      scene.add(frontalSoftLight);

      // 5. Build Foldable Phone Mesh with realistic proportions
      const rootGroup = new THREE.Group();
      rootGroupRef.current = rootGroup;
      rootGroup.position.set(0, -0.05, 0);
      scene.add(rootGroup);

      const flapWidth = 1.35;
      const flapHeight = 3.65;
      const flapDepth = 0.12;

      // Titanium frame material
      const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0xdfbe8b,
        metalness: 0.90,
        roughness: 0.22
      });

      // Frosted back panel glass
      const backMaterial = new THREE.MeshStandardMaterial({
        color: 0x8a5563, // Premium Rose Plum Fold finish
        metalness: 0.65,
        roughness: 0.24
      });

      // Camera Bump Material
      const cameraPlateMat = new THREE.MeshStandardMaterial({
        color: 0x14050b,
        metalness: 0.85,
        roughness: 0.18
      });

      // Screen Wallpaper Material
      const wallpaperTexture = createFoldableWallpaperTexture();
      const screenMat = new THREE.MeshStandardMaterial({
        map: wallpaperTexture,
        roughness: 0.08,
        metalness: 0.08,
        emissive: 0xdfbe8b,
        emissiveIntensity: 0.18,
        emissiveMap: wallpaperTexture
      });

      // Central Cylindrical Hinge Spine
      const hingeGeo = new THREE.CylinderGeometry(flapDepth * 0.75, flapDepth * 0.75, flapHeight * 0.99, 24);
      const hingeMesh = new THREE.Mesh(hingeGeo, frameMaterial);
      rootGroup.add(hingeMesh);
      hingeMeshRef.current = hingeMesh;

      // LEFT FLAP
      const leftFlap = new THREE.Group();
      leftFlapRef.current = leftFlap;
      rootGroup.add(leftFlap);

      const leftFrameGeo = new THREE.BoxGeometry(flapWidth, flapHeight, flapDepth);
      const leftFrame = new THREE.Mesh(leftFrameGeo, frameMaterial);
      leftFrame.position.x = -flapWidth / 2;
      leftFlap.add(leftFrame);

      const leftBackGeo = new THREE.PlaneGeometry(flapWidth * 0.96, flapHeight * 0.96);
      const leftBack = new THREE.Mesh(leftBackGeo, backMaterial);
      leftBack.position.set(-flapWidth / 2, 0, -flapDepth / 2 - 0.003);
      leftBack.rotation.y = Math.PI;
      leftFlap.add(leftBack);

      const leftScreenGeo = new THREE.PlaneGeometry(flapWidth * 0.97, flapHeight * 0.97);
      const leftScreenMat = screenMat.clone();
      const leftTexture = wallpaperTexture.clone();
      leftTexture.repeat.set(0.5, 1);
      leftTexture.offset.set(0, 0);
      leftTexture.needsUpdate = true;
      leftScreenMat.map = leftTexture;
      leftScreenMat.emissiveMap = leftTexture;

      const leftScreen = new THREE.Mesh(leftScreenGeo, leftScreenMat);
      leftScreen.position.set(-flapWidth / 2, 0, flapDepth / 2 + 0.003);
      leftFlap.add(leftScreen);

      // Camera Island
      const camPlateWidth = flapWidth * 0.65;
      const camPlateHeight = flapWidth * 0.72;
      const camPlateGeo = new THREE.BoxGeometry(camPlateWidth, camPlateHeight, 0.04);
      const camPlate = new THREE.Mesh(camPlateGeo, cameraPlateMat);
      camPlate.position.set(-flapWidth * 0.58, flapHeight * 0.28, -flapDepth / 2 - 0.024);
      leftFlap.add(camPlate);

      // 3 Precision Camera Lenses
      const lensBezelGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.045, 24);
      const lensGlassGeo = new THREE.CircleGeometry(0.09, 24);
      const lensGlassMat = new THREE.MeshBasicMaterial({ color: 0x020a0d });

      const lensOffsets = [
        { x: -0.15, y: 0.14 },
        { x: -0.15, y: -0.14 },
        { x: 0.13, y: 0.0 }
      ];

      lensOffsets.forEach((pos) => {
        const bezel = new THREE.Mesh(lensBezelGeo, frameMaterial);
        bezel.rotation.x = Math.PI / 2;
        bezel.position.set(-flapWidth * 0.58 + pos.x, flapHeight * 0.28 + pos.y, -flapDepth / 2 - 0.045);
        leftFlap.add(bezel);

        const glass = new THREE.Mesh(lensGlassGeo, lensGlassMat);
        glass.rotation.y = Math.PI;
        glass.position.set(-flapWidth * 0.58 + pos.x, flapHeight * 0.28 + pos.y, -flapDepth / 2 - 0.068);
        leftFlap.add(glass);
      });

      // RIGHT FLAP
      const rightFlap = new THREE.Group();
      rightFlapRef.current = rightFlap;
      rootGroup.add(rightFlap);

      const rightFrameGeo = new THREE.BoxGeometry(flapWidth, flapHeight, flapDepth);
      const rightFrame = new THREE.Mesh(rightFrameGeo, frameMaterial);
      rightFrame.position.x = flapWidth / 2;
      rightFlap.add(rightFrame);

      const rightBackGeo = new THREE.PlaneGeometry(flapWidth * 0.96, flapHeight * 0.96);
      const rightBack = new THREE.Mesh(rightBackGeo, backMaterial);
      rightBack.position.set(flapWidth / 2, 0, -flapDepth / 2 - 0.003);
      rightBack.rotation.y = Math.PI;
      rightFlap.add(rightBack);

      const rightScreenGeo = new THREE.PlaneGeometry(flapWidth * 0.97, flapHeight * 0.97);
      const rightScreenMat = screenMat.clone();
      const rightTexture = wallpaperTexture.clone();
      rightTexture.repeat.set(0.5, 1);
      rightTexture.offset.set(0.5, 0);
      rightTexture.needsUpdate = true;
      rightScreenMat.map = rightTexture;
      rightScreenMat.emissiveMap = rightTexture;

      const rightScreen = new THREE.Mesh(rightScreenGeo, rightScreenMat);
      rightScreen.position.set(flapWidth / 2, 0, flapDepth / 2 + 0.003);
      rightFlap.add(rightScreen);

      // Set initial balanced fold angle (~125 deg)
      const halfFold = (Math.PI - currentFoldAngle.current) / 2;
      leftFlap.rotation.y = halfFold;
      rightFlap.rotation.y = -halfFold;

      rootGroup.rotation.x = baseRotation.current.x;
      rootGroup.rotation.y = baseRotation.current.y;

      setIsReady(true);

      // Subtle animation loop via centralLoop: smooth idle float & mouse responsiveness
      let elapsed = 0;
      const onTick = (deltaMs: number) => {
        if (!rootGroupRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;
        elapsed += deltaMs * 0.001;

        if (!isDragging.current) {
          // Gentle idle float & restrained mouse parallax
          const idleTiltY = Math.sin(elapsed * 0.8) * 0.06;
          const idleTiltX = Math.cos(elapsed * 0.6) * 0.04;
          const mouseTiltY = globalMousePos.normX * 0.12;
          const mouseTiltX = -globalMousePos.normY * 0.08;

          targetRotation.current.y = baseRotation.current.y + idleTiltY + mouseTiltY;
          targetRotation.current.x = baseRotation.current.x + idleTiltX + mouseTiltX;

          // Smooth interpolation
          rootGroupRef.current.rotation.y += (targetRotation.current.y - rootGroupRef.current.rotation.y) * 0.08;
          rootGroupRef.current.rotation.x += (targetRotation.current.x - rootGroupRef.current.rotation.x) * 0.08;
        }

        rendererRef.current.render(sceneRef.current, cameraRef.current);
      };

      unsubscribeLoop = centralLoop.subscribe('hero-3d-phone', onTick, 0);

      // Resize handler
      const handleResize = () => {
        if (!container || !cameraRef.current || !rendererRef.current) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      };
      window.addEventListener('resize', handleResize, { passive: true });

      return () => {
        window.removeEventListener('resize', handleResize);
        if (unsubscribeLoop) unsubscribeLoop();
        if (renderer && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };
    } catch (err) {
      console.warn('WebGL initialization failed, falling back to static render:', err);
      setHasWebGlError(true);
    }
  }, [isMobile, createFoldableWallpaperTexture]);

  // Subtle interactive pointer drag for manual rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    setIsDragging3D(true);
    previousPointerPosition.current = { x: e.clientX, y: e.clientY };
    setCursor('drag', 'ROTATE');
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !rootGroupRef.current) return;
    const deltaX = e.clientX - previousPointerPosition.current.x;
    const deltaY = e.clientY - previousPointerPosition.current.y;

    baseRotation.current.y += deltaX * 0.01;
    baseRotation.current.x = Math.max(-0.4, Math.min(0.5, baseRotation.current.x + deltaY * 0.01));

    rootGroupRef.current.rotation.y = baseRotation.current.y;
    rootGroupRef.current.rotation.x = baseRotation.current.x;

    previousPointerPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setIsDragging3D(false);
    resetCursor();
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onMouseEnter={() => setCursor('drag', 'ROTATE')}
        onMouseLeave={resetCursor}
        className={`w-full h-full cursor-grab active:cursor-grabbing touch-none flex items-center justify-center transition-opacity duration-700 ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ minHeight: '420px', maxHeight: '560px' }}
      />

      {/* Graceful Fallback Render if WebGL fails or while loading */}
      {(hasWebGlError || !isReady) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
          <div className="relative w-64 sm:w-72 h-[420px] rounded-[36px] bg-[#072D33] border-2 border-[#DFBE8B]/70 p-3 shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#33091B]/80 via-transparent to-[#DFBE8B]/15" />
            
            {/* Status notch */}
            <div className="relative z-10 flex items-center justify-between text-[11px] font-bold text-[#F5F0E6] px-2 pt-1">
              <span>9:41</span>
              <div className="w-20 h-4 rounded-full bg-black/60 mx-auto" />
              <span>5G</span>
            </div>

            {/* Middle screen graphics */}
            <div className="relative z-10 text-center my-auto space-y-2">
              <span className="text-[11px] tracking-widest uppercase font-mono text-[#DFBE8B]">
                ✦ JOSAN SHOWROOM ✦
              </span>
              <h4 className="text-xl font-black text-[#F5F0E6] tracking-tight">
                FLAGSHIP FOLDABLE
              </h4>
              <p className="text-xs text-[#9ABCAB]">
                Ultra-Thin Titanium Architecture
              </p>
            </div>

            {/* Bottom bar */}
            <div className="relative z-10 w-24 h-1 rounded-full bg-[#F5F0E6]/50 mx-auto mb-1" />
          </div>
        </div>
      )}
    </div>
  );
};
