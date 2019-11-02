function setup3d(){
    scene3d=new THREE.Scene();

    camera3d=new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10000);
    camera3d.up=new THREE.Vector3(0,0,1);
    camera3d.lookAt(new THREE.Vector3(250,250,250));
    camera3d.position.set(450,450,150);

    renderer=new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled=true; 
    div3d.appendChild(renderer.domElement);

    controls=new THREE.OrbitControls(camera3d, renderer.domElement);
    controls.addEventListener("change", render3d);

    addLight3d();
    
}

function addLight3d(){
    light=new THREE.DirectionalLight(0xffffff);
    light.position.set(100,100,100);
    light.target.position.set(0,0,0);

    var t=100;
    light.shadow.camera.bottom=-t;
    light.shadow.camera.left=-t;
    light.shadow.camera.top=t;
    light.shadow.camera.right=t;

    light.shadow.mapSize.width=10000;
    light.shadow.mapSize.height=10000;

    light.castShadow=true;
    scene3d.add(light);

    var l2=new THREE.PointLight(0xffffff);
    l2.position.set(-100,-100,100);
    scene3d.add(l2);
}

function onWindowResize3d(){
    camera3d.aspect=window.innerWidth/window.innerHeight;
    camera3d.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render3d(){
    renderer.render(scene3d, camera3d);
}