import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
const url = new URL("./assets/rik.glb", import.meta.url);

const renderer = new THREE.WebGLRenderer();
const container = document.querySelector("#container");
renderer.setSize(window.innerWidth, window.innerHeight);

container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(-0.55, 2.3, 4.66);
camera.lookAt(0, 1.2, 0);

const assetLoader = new GLTFLoader();
let position = 0;
let items = document.querySelectorAll(".block");

assetLoader.load(url.href, function (gltf) {
  const model = gltf.scene;
  model.position.y = 0.1;
  scene.add(model);
});
function decrement() {
  position <= 0 ? "" : position--;
  console.log(position)
  return position;
}
function increment() {
  position >= 6 ? "" : position++;
  console.log(position)
  return position;
}
window.addEventListener("wheel",cameraMovement );
 window.addEventListener("wheel",elemVuewer );
function animate() {
  renderer.render(scene, camera);
}
 function sceneMovement(e){
  
    if (e.deltaY <= 0) {
      position <= 0 ? "" : position--;
    }
    if (e.deltaY > 0) {
      position >= 6 ? "" : position++;
    }
    
    switch (position) {
      case 0:
        moveCamera(3.55, 2.3, 5);
        rotateCamera(0, 1.5, 0);
        
        break;
      case 1:
        moveCamera(11, 1.5, 4.78);
        rotateCamera(0, 2, 0);
        
      case 2:
        moveCamera(-1.6, 2, 4.3);
        rotateCamera(0, 1.7, 0);
        
        break;
      case 3:
        moveCamera(0.55, 2.3, 3);
        rotateCamera(0, 0, 0);
       
        break;
      case 4:
        moveCamera(0.55, 1, 3);
        rotateCamera(0, 0, 0);
        
        break;
      case 5:
        moveCamera(-3, 2.5, 5);
        rotateCamera(-0.55, -1.5, -0.55);
        
      case 6:
        break;
    }
  
    function moveCamera(x, y, z) {
      gsap.to(camera.position, {
        x,
        y,
        z,
        duration: 3,
      });
    }
  
    function rotateCamera(x, y, z) {
      gsap.to(camera.rotation, {
        x,
        y,
        z,
        duration: 3.2,
      });
    }
  
 }
 function elemVuewer(){
  for (let i = 0; i <= items.length+1; i++) {
    if (i === position) {
      items[i].classList.add("visible");
      activeiem = items[i]
    } else {
      items[i].classList.remove("visible")

    }
  }
 }
renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
