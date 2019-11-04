function update3d(){
    for(var i=0; i<meshArr.length; i++){
        meshArr[i].geometry.dispose();
        meshArr[i].material.dispose();
        scene3d.remove(meshArr[i]);
        delete meshArr[i];
    }
    meshArr=[];
    ang+=Math.PI/180;
}

function draw3d(){
    update3d();
    var axes=new THREE.AxesHelper(5);
    scene3d.add(axes);

    for (var i=0; i<bldg.length; i++){
        var g=gen3dBldg(bldg[i]);
        var re=parseInt(bldg[i].re);
        var gr=parseInt(bldg[i].gr);
        var bl=parseInt(bldg[i].bl);

        var m=new THREE.MeshPhongMaterial({
            color:new THREE.Color("rgb("+re+","+gr+","+bl+")"),
            opacity:0.75,
            transparent:true
        });
        var me=new THREE.Mesh(g,m);
        meshArr.push(me);
    }

    for(var i=0; i<meshArr.length ;i++){
        scene3d.add(meshArr[i]);
    }

    onWindowResize3d();
    render3d();
}

function draw3dLoaders(){
    update3d();
    var axes=new THREE.AxesHelper(5);
    scene3d.add(axes);

    var g=new THREE.SphereGeometry(100,100,100);
    var m=new THREE.MeshPhongMaterial({
        color:0xffffff,
        map:te
    });
    var me=new THREE.Mesh(g,m);
    me.rotation.x=Math.PI/2;
    me.rotation.y=ang;
    meshArr.push(me);

    for(var i=0; i<meshArr.length; i++){
        scene3d.add(meshArr[i]);
    }

    onWindowResize3d();
    render3d();
}

function gen3dBldg(arr){
    var x=parseFloat(arr.x);
    var y=parseFloat(arr.y);
    var l=parseFloat(arr.l);
    var w=parseFloat(arr.w);
    var h=parseFloat(arr.h);
    var p0=new THREE.Vector3(x,y,0);
    var p1=new THREE.Vector3(x+l,y,0);
    var p2=new THREE.Vector3(x+l,y+w,0);
    var p3=new THREE.Vector3(x,y+w,0);
    var p=[p0,p1,p2,p3];
    var sh=new THREE.Shape();
    sh.moveTo(p0.x,p0.y);
    sh.lineTo(p1.x,p1.y);
    sh.lineTo(p2.x,p2.y);
    sh.lineTo(p3.x,p3.y);
    sh.autoClose=true;
    var ext={
        steps:1,
        depth:h,
        bevelEnabled:false
    }
    var g=new THREE.ExtrudeGeometry(sh,ext);
    return g;
}