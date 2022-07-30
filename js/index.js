const gui = new dat.GUI();
const world = {
    plane: {
        width: 10,
    },
};

gui.add(world.plane, "width", 1, 20).onChange(() => {
    planeMesh.geometry.dispose();
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 4;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#050e1b");
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);

document.getElementById("hero").appendChild(renderer.domElement);

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0x05e1b,
    flatShading: THREE.FlatShading,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

const planeArray = planeMesh.geometry.vertices;
for (const vertice of planeArray) {
    const num = Math.floor(Math.random() * 10) * 0.03;
    vertice.z += num;
}

scene.add(planeMesh);
const light = new THREE.DirectionalLight(0xffffff, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

renderer.render(scene, camera);

animate();
