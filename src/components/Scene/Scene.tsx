import { useThree } from '@react-three/fiber';
import { useCallback, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Floor } from '../Floor/Floor';
import { Lights } from './Lights';

interface SceneProps {
	maxMove: number;
	teleportSpeed: number; // Ajoutez cette ligne
}

export const Scene: React.FC<SceneProps> = ({ maxMove, teleportSpeed }) => {
	const [cubePosition, setCubePosition] = useState<[number, number, number]>([
		//position initiale du cube
		0, 0.5, 0,
	]);
	const [previewPositions, setPreviewPositions] = useState<
		[number, number, number][]
	>([]);
	const [isAnimating, setIsAnimating] = useState(false);

	const { camera } = useThree();

	const updateCameraPosition = useCallback(
		(position: [number, number, number]) => {
			// position initiale de la camera
			camera.position.set(position[0] + 5, position[1] + 5, position[2] + 5);
			camera.lookAt(new THREE.Vector3(position[0], position[1], position[2]));
		},
		[camera]
	);

	const teleportCube = useCallback(
		(positions: [number, number, number][]) => {
			if (positions.length === 0) {
				setIsAnimating(false);
				return;
			}

			const [nextPosition, ...remainingPositions] = positions;
			setCubePosition(nextPosition);
			updateCameraPosition(nextPosition);
			setTimeout(() => teleportCube(remainingPositions), teleportSpeed); // Utilisation de teleportSpeed ici
		},
		[updateCameraPosition, teleportSpeed] // Ajout de teleportSpeed comme dépendance
	);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (isAnimating) return;

			const lastPosition =
				previewPositions.length > 0
					? previewPositions[previewPositions.length - 1]
					: cubePosition;
			const newPosition = [...lastPosition] as [number, number, number];
			const cameraDirection = new THREE.Vector3();
			camera.getWorldDirection(cameraDirection);

			let dx = 0;
			let dz = 0;

			switch (event.key) {
				case 'ArrowUp':
					dx = Math.round(cameraDirection.x);
					dz = Math.round(cameraDirection.z);
					break;
				case 'ArrowDown':
					dx = -Math.round(cameraDirection.x);
					dz = -Math.round(cameraDirection.z);
					break;
				case 'ArrowLeft':
					dx = Math.round(cameraDirection.z);
					dz = -Math.round(cameraDirection.x);
					break;
				case 'ArrowRight':
					dx = -Math.round(cameraDirection.z);
					dz = Math.round(cameraDirection.x);
					break;
				case 'Enter':
					if (previewPositions.length > 0) {
						setIsAnimating(true);
						teleportCube(previewPositions);
						setPreviewPositions([]);
					}
					return;
				default:
					return;
			}

			newPosition[0] += dx;
			newPosition[2] += dz;

			newPosition[0] = Math.max(Math.min(Math.round(newPosition[0]), 9), -9);
			newPosition[2] = Math.max(Math.min(Math.round(newPosition[2]), 9), -9);

			// Vérifier si la nouvelle position est déjà occupée par un cube bleu
			const isOccupied = previewPositions.some(
				(pos) => pos[0] === newPosition[0] && pos[2] === newPosition[2]
			);

			if (!isOccupied && previewPositions.length < maxMove) {
				setPreviewPositions((prev) => {
					const updatedPositions = [...prev, newPosition];
					return updatedPositions;
				});
			}
		},
		[isAnimating, previewPositions, cubePosition, camera, maxMove, teleportCube]
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			setIsAnimating(false);
		};
	}, [handleKeyDown]);

	return (
		<>
			<Lights />
			<Floor />
			<mesh position={cubePosition}>
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial color="red" />
			</mesh>
			{previewPositions.map((position, index) => (
				<mesh key={index} position={position}>
					<boxGeometry args={[1, 1, 1]} />
					<meshStandardMaterial color="blue" opacity={0.5} transparent />
				</mesh>
			))}
		</>
	);
};
