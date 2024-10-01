import { Box, Edges, useTexture } from '@react-three/drei';

interface CubeProps {
	position: [number, number, number];
	color: string;
	opacity?: number;
}

export const Cube = ({ position, color, opacity = 1 }: CubeProps) => {
	const texture = useTexture('/Floor32.png');

	return (
		<Box position={position} args={[1, 1, 1]}>
			<meshStandardMaterial
				map={texture}
				transparent
				opacity={opacity}
				emissive={color}
				emissiveIntensity={0.25}
			/>
			<Edges color="black" />
		</Box>
	);
};
