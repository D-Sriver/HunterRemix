import { FloorCube } from '../Cube/FloorCube.tsx'; // Ajout de l'extension .tsx
import { Grid } from './Grid';

export const Floor = () => {
	return (
		<>
			{Array.from({ length: 19 }, (_, i) =>
				Array.from({ length: 19 }, (_, j) => (
					<FloorCube key={`${i}-${j}`} position={[i - 9, -0.05, j - 9]} />
				))
			)}
			<Grid />
		</>
	);
};
