// buttons and observer animations

document.getElementById("homeButton").addEventListener("click", () => {
    scrollToSection("hero");
});
document.getElementById("aboutButton").addEventListener("click", () => {
    scrollToSection("about");
});
document.getElementById("scrollContainer").addEventListener("click", () => {
    scrollToSection("about");
});
document.getElementById("projectsButton").addEventListener("click", () => {
    scrollToSection("projects");
});
document.getElementById("contactButton").addEventListener("click", () => {
    scrollToSection("contact");
});

function scrollToSection(section) {
    document
        .getElementById(section)
        .scrollIntoView({ behavior: "smooth", block: "center" });
}

const projects = document.querySelectorAll(".project");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(
        (entry) => {
            entry.target.classList.toggle(
                entry.target.classList.contains("anim-right")
                    ? "fade-right-animation"
                    : "fade-left-animation",
                entry.isIntersecting
            );
            if (entry.isIntersecting) {
                entry.target.classList.remove("invisible");
                observer.unobserve(entry.target);
            }
        },
        {
            threshold: 1,
        }
    );
});

projects.forEach((project) => {
    observer.observe(project);
});

// mini projects image slider stuff

const moreContainers = document.querySelectorAll(".moreContainer");
moreContainers.forEach((container) => {
    container.addEventListener("click", (e) => {
        const toIgnore = [
            "miniProjectImages",
            "miniProjectInfo",
            "miniOutLinks",
        ];

        let exit = true;
        for (let div of e.path) {
            if (
                div.classList &&
                toIgnore.some((item) =>
                    Array.from(div.classList).includes(item)
                )
            ) {
                exit = false;
                break;
            }
        }

        if (exit) {
            document
                .getElementsByTagName("body")[0]
                .classList.remove("noScroll");
            container.classList.add("noDisplay");
        }
    });
});

const miniImages = document.querySelectorAll(".miniImage");
function deactivateOtherImages() {
    miniImages.forEach((image) => image.classList.remove("imgActive"));
}

const projectMorePrompts = document.querySelectorAll(".morePrompt");
projectMorePrompts.forEach((smallP) => {
    smallP.addEventListener("click", () => {
        deactivateOtherImages();
        const imagesDiv = smallP.parentElement
            .getElementsByClassName("moreContainer")[0]
            .getElementsByClassName("projectMore")[0]
            .getElementsByClassName("miniProjectImages")[0];

        const previewImages =
            imagesDiv.getElementsByClassName("imagesSmaller")[0];
        imagesDiv.getElementsByClassName("biggerImage")[0].src =
            previewImages.getElementsByClassName("miniImage")[0].src;
        previewImages
            .getElementsByClassName("miniImage")[0]
            .classList.add("imgActive");

        smallP.parentElement
            .getElementsByClassName("moreContainer")[0]
            .classList.remove("noDisplay");
        document.getElementsByTagName("body")[0].classList.add("noScroll");
    });
});

miniImages.forEach((image) => {
    image.addEventListener("click", (e) => {
        deactivateOtherImages();
        e.target.classList.add("imgActive");
        e.target.parentElement.getElementsByClassName("biggerImage").src =
            e.target.src;
        e.target.parentElement.parentElement.getElementsByClassName(
            "biggerImage"
        )[0].src = e.target.src;
    });
});

// hamburger menu stuff
const hamburgerButton = document.getElementById("hamburgerButton");
const mobileLinksContainer = document.getElementById("mobileLinksContainer");

function toggleHamburgerMenu() {
    const status = hamburgerButton.classList.contains("hamburgerActive");
    if (!status) {
        hamburgerButton.classList.add("hamburgerActive");
        mobileLinksContainer.classList.add("mobileLinksActive");
        document.getElementsByTagName("body")[0].classList.add("noScroll");
    } else {
        hamburgerButton.classList.remove("hamburgerActive");
        mobileLinksContainer.classList.remove("mobileLinksActive");
        document.getElementsByTagName("body")[0].classList.remove("noScroll");
    }

    // scroll down if hero section is visible
    const heroDiv = document.getElementById("hero").getBoundingClientRect();
    if (heroDiv.bottom > 0) {
        document
            .getElementById("about")
            .scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

document
    .getElementById("mobileLinksContainer")
    .addEventListener("click", (e) => {
        console.log();
        if (e.target.id == "mobileLinksContainer") {
            toggleHamburgerMenu();
        }
    });

hamburgerButton.addEventListener("click", () => {
    toggleHamburgerMenu();
});

document.getElementById("homeButtonM").addEventListener("click", () => {
    toggleHamburgerMenu();
    scrollToSection("hero");
});
document.getElementById("aboutButtonM").addEventListener("click", () => {
    toggleHamburgerMenu();
    scrollToSection("about");
});
document.getElementById("projectsButtonM").addEventListener("click", () => {
    toggleHamburgerMenu();
    scrollToSection("projects");
});
document.getElementById("contactButtonM").addEventListener("click", () => {
    toggleHamburgerMenu();
    scrollToSection("contact");
});

// Hero Animation Stuff

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
            Math.cos(frame) * 0.0001 + (Math.random() - 0.5) * 0.001;
        planeMesh.geometry.vertices[i].y +=
            Math.cos(frame) * 0.0001 + (Math.random() - 0.5) * 0.002;
        planeMesh.geometry.vertices[i].z +=
            Math.cos(frame) * 0.0001 + (Math.random() - 0.5) * 0.003;
    }

    planeMesh.geometry.verticesNeedUpdate = true;
}
function animate() {
    frame += 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    randomizeVertices();
}

randomizeVertices();

renderer.render(scene, camera);

animate();
