import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface StarFieldProps {
    className?: string;
}

interface ShootingStarUserData {
    direction: THREE.Vector3;
    speed: number;
    life: number;
    maxLife: number;
}

interface ShootingStar extends THREE.Points {
    userData: ShootingStarUserData;
    material: THREE.PointsMaterial;
}

const StarField: React.FC<StarFieldProps> = ({ className = "" }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Scene setup
        const scene: THREE.Scene = new THREE.Scene();
        const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        sceneRef.current = scene;
        rendererRef.current = renderer;

        // Create stars
        const starGeometry: THREE.BufferGeometry = new THREE.BufferGeometry();
        const starCount: number = 2000;
        const starPositions: Float32Array = new Float32Array(starCount * 3);
        const starColors: Float32Array = new Float32Array(starCount * 3);
        const starSizes: Float32Array = new Float32Array(starCount);

        for (let i = 0; i < starCount; i++) {
            const i3: number = i * 3;
            // Randomly distribute stars in a sphere
            const radius: number = Math.random() * 500 + 50;
            const theta: number = Math.random() * Math.PI * 2;
            const phi: number = Math.acos(2 * Math.random() - 1);

            starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            starPositions[i3 + 2] = radius * Math.cos(phi);

            // Random colors from white to light blue
            const color: THREE.Color = new THREE.Color().setHSL(
                0.6 + Math.random() * 0.1, 
                0.3 + Math.random() * 0.3, 
                0.8 + Math.random() * 0.2
            );
            starColors[i3] = color.r;
            starColors[i3 + 1] = color.g;
            starColors[i3 + 2] = color.b;

            starSizes[i] = Math.random() * 3 + 1;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
        starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

        // Star material
        const starMaterial: THREE.ShaderMaterial = new THREE.ShaderMaterial({
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                void main() {
                  vColor = color;
                  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                  gl_PointSize = size * (300.0 / -mvPosition.z);
                  gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                void main() {
                  float distanceFromCenter = length(gl_PointCoord - vec2(0.5));
                  if (distanceFromCenter > 0.5) discard;
                  float alpha = 1.0 - (distanceFromCenter * 2.0);
                  gl_FragColor = vec4(vColor, alpha);
                }
            `,
            transparent: true,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            depthWrite: false
        });

        const stars: THREE.Points = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Shooting stars
        const shootingStars: ShootingStar[] = [];
        const maxShootingStars: number = 3;

        const createShootingStar = (): ShootingStar => {
            const geometry: THREE.BufferGeometry = new THREE.BufferGeometry();
            const positions: number[] = [];
            const colors: number[] = [];
            const trailLength: number = 50;

            // Random starting position
            const startX: number = (Math.random() - 0.5) * 1000;
            const startY: number = (Math.random() - 0.5) * 1000;
            const startZ: number = (Math.random() - 0.5) * 1000;

            // Random direction
            const direction: THREE.Vector3 = new THREE.Vector3(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            ).normalize();

            for (let i = 0; i < trailLength; i++) {
                const alpha: number = i / trailLength;
                const position: THREE.Vector3 = new THREE.Vector3(
                    startX + direction.x * i * 5,
                    startY + direction.y * i * 5,
                    startZ + direction.z * i * 5
                );

                positions.push(position.x, position.y, position.z);

                // Fade from white to blue
                const color: THREE.Color = new THREE.Color().setHSL(0.6, 0.8, 1.0 - alpha * 0.5);
                colors.push(color.r, color.g, color.b);
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

            const material: THREE.PointsMaterial = new THREE.PointsMaterial({
                size: 3,
                transparent: true,
                opacity: 0.8,
                vertexColors: true,
                blending: THREE.AdditiveBlending,
                depthTest: false
            });

            const shootingStar = new THREE.Points(geometry, material) as ShootingStar;
            shootingStar.userData = {
                direction: direction,
                speed: 5 + Math.random() * 10,
                life: 0,
                maxLife: 100
            };

            return shootingStar;
        };

        // Animation loop
        const animate = (): void => {
            animationRef.current = requestAnimationFrame(animate);

            // Slowly rotate the star field
            stars.rotation.y += 0.0002;
            stars.rotation.x += 0.0001;

            // Update shooting stars
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const shootingStar: ShootingStar = shootingStars[i];
                const userData: ShootingStarUserData = shootingStar.userData;

                // Move shooting star
                shootingStar.position.add(userData.direction.clone().multiplyScalar(userData.speed));

                // Fade out over time
                userData.life++;
                const alpha: number = 1 - (userData.life / userData.maxLife);
                shootingStar.material.opacity = Math.max(0, alpha);

                // Remove if expired
                if (userData.life >= userData.maxLife) {
                    scene.remove(shootingStar);
                    shootingStars.splice(i, 1);
                }
            }

            // Randomly create new shooting stars
            if (shootingStars.length < maxShootingStars && Math.random() < 0.003) {
                const newStar: ShootingStar = createShootingStar();
                scene.add(newStar);
                shootingStars.push(newStar);
            }

            renderer.render(scene, camera);
        };

        // Start animation
        animate();

        // Handle resize
        const handleResize = (): void => {
            if (renderer && camera) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return (): void => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (renderer) {
                renderer.dispose();
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none ${className}`}
            style={{ zIndex: -1 }}
        />
    );
};

export default StarField;