import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function Model({ hovered }) {
    const group = useRef()
    // Ensure the GLB exists in /public/models/personnage_opti.glb
    const { nodes } = useGLTF('/models/personnage_opti.glb')

    // Custom black material to simulate ink silhouette
    const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x010101 })

    useFrame((state, delta) => {
        // Gentle floating
        const t = state.clock.getElapsedTime()
        const floatOffset = Math.sin(t * 1.5) * 0.05
        group.current.position.y = -1.5 + floatOffset

        // Look at cursor smoothly
        const targetX = (state.pointer.x * Math.PI) / 4
        const targetY = (state.pointer.y * Math.PI) / 6

        // Adding reaction on hover
        const wiggeX = hovered ? Math.sin(t * 15) * 0.08 : 0
        const wiggleY = hovered ? Math.cos(t * 15) * 0.08 : 0

        group.current.rotation.y += (targetX + wiggeX - group.current.rotation.y) * 0.05
        group.current.rotation.x += (-targetY + wiggleY - group.current.rotation.x) * 0.05
    })

    return (
        <group ref={group} dispose={null} scale={0.5} position={[0, -1.5, 0]}>
            {Object.values(nodes).map((node, i) => {
                if (node.isMesh) {
                    return (
                        <mesh
                            key={i}
                            geometry={node.geometry}
                            material={blackMaterial}
                            position={node.position}
                            rotation={node.rotation}
                            scale={node.scale}
                        />
                    )
                }
                return null
            })}
        </group>
    )
}

export default function CharacterGraphic() {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            style={{
                position: 'fixed',
                bottom: '-20px',
                right: '20px',
                width: '320px',
                height: '350px',
                zIndex: 50,
                cursor: 'none' // Fallback to let the custom cursor work
            }}
        >
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: 'none' }}>
                <ambientLight intensity={1} />
                <Model hovered={hovered} />
            </Canvas>
        </div>
    )
}

// Preload the model to ensure it appears instantly
useGLTF.preload('/models/personnage_opti.glb')
