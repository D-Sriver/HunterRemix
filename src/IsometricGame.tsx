import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene/Scene';
import { IsometricCamera } from './IsometricCamera';

const IsometricGame = () => {
	return (
		<Canvas>
			<IsometricCamera />
			<Scene maxMove={5} teleportSpeed={100} />
		</Canvas>
	);
};

export default IsometricGame;
