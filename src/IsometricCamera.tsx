import { OrthographicCamera } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useState } from 'react';
import * as THREE from 'three';

export const useIsometricCamera = () => {
	const { camera, size } = useThree();
	const [targetAngle, setTargetAngle] = useState(Math.PI / 4);
	const [currentAngle, setCurrentAngle] = useState(Math.PI / 4);
	const [canRotate, setCanRotate] = useState(true);
	const radius = 5; // Augmenté de 20 à 25 pour reculer la caméra
	const aspect = size.width / size.height;
	const zoom = 1.5; // Légèrement réduit pour compenser le recul de la caméra

	useFrame((_, delta) => {
		const lerpFactor = 1 - Math.pow(0.2, delta);
		const newAngle = THREE.MathUtils.lerp(
			currentAngle,
			targetAngle,
			lerpFactor
		);
		setCurrentAngle(newAngle);

		const x = Math.cos(newAngle) * radius;
		const y = radius;
		const z = Math.sin(newAngle) * radius;
		camera.position.set(x, y, z);
		camera.lookAt(0, 0, 0);

		if (camera instanceof THREE.OrthographicCamera) {
			const frustumSize = 40;
			camera.left = (-frustumSize * aspect) / 2;
			camera.right = (frustumSize * aspect) / 2;
			camera.top = frustumSize / 2;
			camera.bottom = -frustumSize / 2;
			camera.zoom = zoom;
			camera.updateProjectionMatrix();
		}

		if (Math.abs(newAngle - targetAngle) < 0.01 && !canRotate) {
			setCanRotate(true);
		}
	});

	const handleCameraRotate = useCallback(
		(event: KeyboardEvent) => {
			if (!canRotate) return;

			if (event.key === 'a') {
				setTargetAngle((prev) => prev + Math.PI / 2);
				setCanRotate(false);
			} else if (event.key === 'd') {
				setTargetAngle((prev) => prev - Math.PI / 2);
				setCanRotate(false);
			}

			setTimeout(() => {
				setCanRotate(true);
			}, 1000);
		},
		[canRotate]
	);

	useEffect(() => {
		window.addEventListener('keydown', handleCameraRotate);
		return () => {
			window.removeEventListener('keydown', handleCameraRotate);
		};
	}, [handleCameraRotate]);

	return { camera };
};

export const IsometricCamera = () => {
	const { camera } = useIsometricCamera();
	const radius = 5;
	const zoom = 1.5;

	return (
		<OrthographicCamera
			makeDefault
			zoom={zoom}
			position={[
				radius * Math.cos(camera.rotation.y),
				radius,
				radius * Math.sin(camera.rotation.y),
			]}
			left={-22}
			right={22}
			top={22}
			bottom={-22}
			near={0.1}
			far={1000}
		/>
	);
};
