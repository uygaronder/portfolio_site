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

document.getElementById("hero").appendChild(renderer.domElement);

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

const geometry = new THREE.SphereGeometry(1, 10, 10);
const material = new THREE.MeshLambertMaterial({ color: 0xfff });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
const light = new THREE.PointLight(0xfff, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);
renderer.render(scene, camera);
