var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );

var camera = new THREE.PerspectiveCamera(50, $(window).width() / $(window).height(), 1, 1000);
var renderer = new THREE.WebGLRenderer();
var group = new THREE.Group();
var controls;
var texture;
var newtexture;


controls = new THREE.OrbitControls(camera);
controls.addEventListener('change', render);

camera.position.z = 50;

document.body.appendChild(renderer.domElement);

texture = new THREE.TextureLoader().load( './images/text1.jpg');
newtexture = new THREE.TextureLoader().load( './images/text2.jpg');


var createSphere = function() {
    console.log(texture)
    var geometry2 = new THREE.SphereGeometry( 1, 50, 50 );
    var material2 = new THREE.MeshBasicMaterial( {map: texture} );

    var sphere = new THREE.Mesh( geometry2, material2 );

    sphere.position.x =10;
    sphere.position.y = 10;
    sphere.position.z = 0;

	group.add(sphere);

}

var createCube = function() {
    var geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
    var material2 = new THREE.MeshBasicMaterial({map: texture} );

    var cube = new THREE.Mesh( geometry2, material2 );

    cube.position.x = 5;
    cube.position.y = 5;
    cube.position.z = 0;

    group.add(cube);
}

var createCubix = function() {
    var geometry2 = new THREE.SphereGeometry( 1, 50, 50 );
    var material2 = new THREE.MeshBasicMaterial( {map: texture} );

    var cube = new THREE.Mesh( geometry2, material2 );

    cube.position.x = 15;
    cube.position.y = 15;
    cube.position.z = 0;

    group.add(cube);

}


var render = function () {

    if(typeof array === 'object' && array.length > 0) {
        var scale = boost * 0.02;
		if(boost < 100) {
            group.children[1].scale.x = (scale < 1 ? 1 : scale);
            group.children[1].scale.y = (scale < 1 ? 1 : scale);

            group.children[0].scale.x = 1;
            group.children[0].scale.y = 1;
            group.children[2].scale.x = 1;
            group.children[2].scale.y = 1;

		}else if(boost > 100 && boost < 120){
            group.children[0].scale.x = (scale < 1 ? 1 : scale);
            group.children[0].scale.y = (scale < 1 ? 1 : scale);

            group.children[1].scale.x = 1;
            group.children[1].scale.y = 1;
            group.children[2].scale.x = 1;
            group.children[2].scale.y = 1;
		} else {
            group.children[2].scale.x = (scale < 1 ? 1 : scale);
            group.children[2].scale.y = (scale < 1 ? 1 : scale);

            group.children[0].scale.x = 1;
            group.children[0].scale.y = 1;
            group.children[1].scale.x = 1;
            group.children[1].scale.y = 1;

            group.children[1].material.map = newtexture;
            group.children[1].material.map.needsUpdate = true;
        }




    }


    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
};


var createAll = function () {
    createSphere();
    createCube();
    createCubix();

    scene.add( group );

    render();
    renderer.setSize($(window).width(), $(window).height());
}


createAll();
