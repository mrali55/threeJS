import * as THREE from 'three';
import img from '../../assets/base64Cloud';
 function draw(options) {
    console.log("inside options: ",options)

    let {rainCount, cloudCount, thunderCount} = options;
    console.log("inside options: ",options)

    let camera, scene, renderer;
    let geometry, material, mesh, flash;
    let cloudsArray = [];
    let {rain, rainGeo} = createRain(rainCount);
    let thunderFrequency=0;

    let ambientLight = new THREE.AmbientLight(0x555555);
    let directionalLight = new THREE.DirectionalLight('white');

    flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);


    directionalLight.position.set(0, 0, 1);

    //creating camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    scene.add(ambientLight);
    scene.add(directionalLight);
    scene.add(rain);

     createClouds();

    flash.position.set(200, 300, 100);
    scene.add(flash);


    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    let targetElement=document.querySelector('#draw');
    targetElement.innerHTML='';
    targetElement.appendChild(renderer.domElement);
    animate();

     function createClouds() {
        console.log('create clouds');
        let loader = new THREE.TextureLoader();
        let texture = new THREE.TextureLoader().load(img); //await loader.load(require("../../assets/cloud.png") );

        let cloudGeo = new THREE.PlaneBufferGeometry(400, 300);
        let cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });

        console.log('create clouds | cloudCount: ',cloudCount);

        for (let p = 0; p < cloudCount; p++) {

            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
            cloud.position.set(
                Math.random() * 800 - 400,
                500,
                Math.random() * 500 - 450
            );
            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random() * 360;
            cloud.material.opacity = 0.6;
            scene.add(cloud);
            cloudsArray.push(cloud);
        }
    }

    function createRain(count) {
        let rainGeo = new THREE.Geometry();
        for (let i = 0; i < count; i++) {
            let rainDrop = new THREE.Vector3(
                Math.random() * 400 - 200,
                Math.random() * 500 - 250,
                Math.random() * 400 - 200
            );
            rainDrop.velocity = 0;
            rainGeo.vertices.push(rainDrop);
        }

        let rainMaterial = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 0.1,
            transparent: true
        });
        return {
            rain: new THREE.Points(rainGeo, rainMaterial),
            rainGeo
        };

    }

    function animate() {

        cloudsArray.forEach(cloud => {
            cloud.rotation.z -= 0.002;
        });


        rainGeo.vertices.forEach(p => {
            p.velocity -= 0.1 + Math.random() * 0.1;
            p.y += p.velocity;
            if (p.y < -200) {
                p.y = 200;
                p.velocity = 0;
            }
        });
        rainGeo.verticesNeedUpdate = true;
        rain.rotation.y += 0.002;

        if (thunderFrequency % thunderCount === 0) {
            flash.power = 50 + Math.random() * 500;
            flash.position.set(
                Math.random() * 400,
                300 + Math.random() * 200,
                100
            );
        }
        else if (thunderFrequency % thunderCount === 1) {
            flash.power = 0;
            flash.position.set(
                Math.random() * 400,
                300 + Math.random() * 200,
                100
            );
        }
        thunderFrequency = thunderFrequency === thunderCount+1 ? 0 : thunderFrequency+1;



        requestAnimationFrame(animate);

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render(scene, camera);

    }
}

export default draw;