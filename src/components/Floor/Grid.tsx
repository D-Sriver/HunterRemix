export const Grid = () => {
	return (
		<>
			<gridHelper
				args={[19, 19, '#000000', '#000000']}
				position={[0, 0.01, 0]}
			/>
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.51, 0]}>
				<planeGeometry args={[19, 19]} />
				<meshStandardMaterial color="#a0e0a0" />
			</mesh>
		</>
	);
};
