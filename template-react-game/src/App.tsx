import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

function App() {
	return (
		<Canvas>
			<Environment preset="sunset" />
			<OrbitControls autoRotate />

			<mesh>
				<dodecahedronGeometry />
				<meshPhysicalMaterial color="hotpink" />
			</mesh>
		</Canvas>
	)
}

export default App
