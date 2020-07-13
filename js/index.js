
var clock = new THREE.Clock();
var delta = 0;

/*
// オーディオ関連
var shotAudio = new Audio("./audio/ShotAudio.mp3");
var StruckAudio = new Audio("./audio/StruckAudio.mp3");
var audio = new Audio("./audio/main_bgm.mp3");
*/

// 幅、高さ取得
const width  = 960;//window.innerWidth;
const height = 540;//window.innerHeight;

// レンダラの作成、DOMに追加
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0x222222, 1.0);

renderer.gammaOutput = true;

document.body.appendChild(renderer.domElement);

renderer.shadowMapEnabled = true;

// シーンの作成、カメラの作成と追加、ライトの作成と追加
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(110, width / height, 0.01, 10000 );
camera.position.set(0, 1, 5);
const light  = new THREE.AmbientLight(0x3a3a3a, 1);

scene.add(camera);

scene.add(light);

// メッシュの作成と追加
const grid   = new THREE.GridHelper(15, 20);

scene.add(grid);

const sphere = new THREE.Mesh(

  new THREE.SphereGeometry(1),
  new THREE.MeshPhongMaterial( { color: 0x0074df } )

);
sphere.position.set(0, 2, 0);

//scene.add(sphere);

 // Load GLTF or GLB
 const loader = new THREE.GLTFLoader();
 const url = 'gltfs/saru.gltf';

 
 let model = null;
 loader.load(
     url,
     function (gltf) {
         model = gltf.scene;
         // model.name = "model_with_cloth";
         model.scale.set(1.0, 1.0, 1.0);
         model.position.set(0, 1, 0);

         scene.add(gltf.scene);

         // model["test"] = 100;
     },
     function (error) {
         console.log('An error happened');
         console.log(error);
     }
 );
   


// コントローラーの生成
controls = new THREE.FirstPersonControls(camera, renderer.domElement);
controls.lookSpeed = 1;
controls.movementSpeed = 3;
controls.noFly = false;
controls.lookVertical = true;
controls.constrainVertical = false;


/*
// OrbitControls の追加
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.userPan = false;
controls.userPanSpeed = 0.0;
controls.maxDistance = 5000.0;
controls.maxPolarAngle = Math.PI * 0.495;
controls.autoRotate = false;
controls.autoRotateSpeed = 1.0;
*/

// レンダリング
const render = () => {

  delta = clock.getDelta();
  controls.update(delta);

  renderer.render(scene, camera);

  requestAnimationFrame(render);

};

render();