import { Cube } from './Cube';

interface CubePositionsProps {
	cubePosition: [number, number, number];
	previewPositions: [number, number, number][];
}

export const CubePositions = ({
	cubePosition,
	previewPositions,
}: CubePositionsProps) => {
	return (
		<>
			<Cube position={cubePosition} color="red" />
			{previewPositions.map((pos, index) => (
				<Cube key={index} position={pos} color="blue" opacity={0.5} />
			))}
		</>
	);
};
