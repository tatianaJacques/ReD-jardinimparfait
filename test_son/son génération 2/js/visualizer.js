var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );

var camera = new THREE.PerspectiveCamera(50, $(window).width() / $(window).height(), 1, 1000);
var renderer = new THREE.WebGLRenderer();
var group = new THREE.Group();
var controls;

controls = new THREE.OrbitControls(camera);
controls.addEventListener('change', render);

camera.position.z = 50;

document.body.appendChild(renderer.domElement);

var createSphere = function() {
    var geometry = new THREE.SphereGeometry( 1, 50, 50 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );

    var sphere = new THREE.Mesh( geometry, material );

    sphere.position.x =10;
    sphere.position.y = 10;
    sphere.position.z = 0;

	group.add(sphere);

}

var createCube = function() {
    var geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
    var material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

    var cube = new THREE.Mesh( geometry2, material2 );

    cube.position.x = 5;
    cube.position.y = 5;
    cube.position.z = 0;

    group.add(cube);
}

var createCubix = function() {
    var geometry2 = new THREE.SphereGeometry( 1, 50, 50 );
    var material2 = new THREE.MeshBasicMaterial( {color: 0x00ffff} );

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
    		console.log('1')

            group.children[1].scale.x = (scale < 1 ? 1 : scale);
            group.children[1].scale.y = (scale < 1 ? 1 : scale);

            group.children[0].scale.x = 1;
            group.children[0].scale.y = 1;
            group.children[2].scale.x = 1;
            group.children[2].scale.y = 1;

		}else if(boost > 100 && boost < 120){
            console.log('2')

            group.children[0].scale.x = (scale < 1 ? 1 : scale);
            group.children[0].scale.y = (scale < 1 ? 1 : scale);

            group.children[1].scale.x = 1;
            group.children[1].scale.y = 1;
            group.children[2].scale.x = 1;
            group.children[2].scale.y = 1;
		} else {
            console.log('3')

            group.children[2].scale.x = (scale < 1 ? 1 : scale);
            group.children[2].scale.y = (scale < 1 ? 1 : scale);

            group.children[0].scale.x = 1;
            group.children[0].scale.y = 1;
            group.children[1].scale.x = 1;
            group.children[1].scale.y = 1;
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
