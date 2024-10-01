export const Lights = () => {
	return (
		<>
			<ambientLight intensity={0.5} />
			<pointLight position={[10, 10, 10]} />
			<mesh position={[15, 15, 15]}>
				<sphereGeometry args={[1, 32, 32]} />
			</mesh>
			<pointLight position={[15, 15, 15]} intensity={1} color="#FB8133" />
		</>
	);
};
