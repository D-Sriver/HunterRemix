import { Box, useTexture } from '@react-three/drei';

interface FloorCubeProps {
	position: [number, number, number];
	color?: string; // Ajout d'une prop optionnelle pour la couleur
}

export const FloorCube = ({ position, color = 'green' }: FloorCubeProps) => {
	const texture = useTexture('/Floor32.png');

	return (
		<Box position={position} args={[1, 0.1, 1]} castShadow>
			<meshStandardMaterial
				map={texture}
				emissive={color}
				emissiveIntensity={0.3}
			/>
		</Box>
	);
};
