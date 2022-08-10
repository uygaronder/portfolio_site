const gui = new dat.GUI();
const world = {
    plane: {
        height: 20,
        width: 20,
        widthSegment: 30,
        heightSegment: 40,
    },
};
/*
gui.add(world.plane, "width", 1, 20).onChange(() => generateBack());
gui.add(world.plane, "height", 1, 20).onChange(() => generateBack());
gui.add(world.plane, "widthSegment", 1, 200).onChange(() => generateBack());
gui.add(world.plane, "heightSegment", 1, 200).onChange(() => generateBack());
*/

function generateBack() {
    planeMesh.geometry.dispose();
    planeMesh.geometry = new THREE.PlaneGeometry(
        world.plane.width,
        world.plane.height,
        world.plane.widthSegment,
        world.plane.heightSegment
    );

    const planeArray = planeMesh.geometry.vertices;
    verticePositions(planeArray);
}

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

const planeGeometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegment,
    world.plane.heightSegment
);
const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0x050e1b,
    flatShading: THREE.FlatShading,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

const planeArray = planeMesh.geometry.vertices;
verticePositions(planeArray);
const originalPositions = planeMesh.geometry.vertices;

scene.add(planeMesh);
const light = new THREE.DirectionalLight(0xffffff, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

let frame = 0;
// vertice positions
function verticePositions(array) {
    for (const vertice of array) {
        const znum = Math.floor((Math.random() - 0.5) * 10) * 0.03;
        const xnum = Math.floor((Math.random() - 0.5) * 3) * 0.03;
        vertice.z += znum;
        vertice.x += xnum;
    }
}

function randomizeVertices() {
    for (let i = 0; i < planeMesh.geometry.vertices.length; i++) {
        planeMesh.geometry.vertices[i].x +=
            Math.cos(frame) * 0.0001 + (Math.random() - 0.5) * 0.01;
        planeMesh.geometry.vertices[i].y +=
            Math.cos(frame) * 0.0001 + (Math.random() - 0.5) * 0.01;
        planeMesh.geometry.vertices[i].z +=
            Math.cos(frame) * 0.0001 + (Math.random() - 0.5) * 0.01;
    }

    planeMesh.geometry.verticesNeedUpdate = true;
}

/* skill octahedron */

const octahedronGeometry = new THREE.OctahedronGeometry(10, 1);
const octahedronMaterial = new THREE.MeshPhongMaterial({
    color: 0x050e1b,
    flatShading: THREE.FlatShading,
});
const octahedronMesh = new THREE.Mesh(octahedronGeometry, octahedronMaterial);

const octahedronLight = new THREE.DirectionalLight(0xffffff, 1, 500);
octahedronLight.position.set(10, 0, 25);

const octahedronScene = new THREE.Scene();
const octahedronCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

octahedronScene.add(octahedronMesh);
octahedronScene.add(octahedronCamera);
octahedronScene.add(octahedronLight);

camera.position.z = 4;
const octaRenderer = new THREE.WebGLRenderer({ antialias: true });
octaRenderer.setClearColor("#050e1b");
octaRenderer.setSize(window.innerWidth / 2.5, window.innerHeight / 2);
octaRenderer.setPixelRatio(devicePixelRatio);
document.getElementById("about").appendChild(octaRenderer.domElement);
/* skill octahedron end */

function animate() {
    frame += 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    randomizeVertices();
}

randomizeVertices();

renderer.render(scene, camera);

animate();
