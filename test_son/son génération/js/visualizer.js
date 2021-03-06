var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, $(window).width() / $(window).height(), 1, 1000);
var renderer = new THREE.WebGLRenderer();
var cubes = new Array();
var controls;

document.body.appendChild(renderer.domElement);

var i = 0;
for(var x = 0; x < 30; x += 2) {
	var j = 0;
	cubes[i] = new Array();
	for(var y = 0; y < 30; y += 2) {

		// Set up the sphere vars
		const RADIUS = 50;
		const SEGMENTS = 15;
		const RINGS = 60;

		var geometry = new THREE.SphereGeometry(.5, 5, 5);
		
		var material = new THREE.MeshPhongMaterial({
			color: 0x000000,
			ambient: 0x000000,
			specular: 0x000000,
			shininess: 0,
			reflectivity: 0
		});
		
		cubes[i][j] = new THREE.Mesh(geometry, material);
		cubes[i][j].position = new THREE.Vector3(x, y, 0);
		
		scene.add(cubes[i][j]);
		j++;
	}
	i++;
}

var light = new THREE.AmbientLight(0x505050);
scene.add(light);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);


directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0, -1, -1);
scene.add(directionalLight);

directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(-1, -1, 0);
scene.add(directionalLight);

camera.position.z = 50;

controls = new THREE.OrbitControls(camera);

controls.addEventListener('change', render);

for(var i = 0; i < 7; i++) {
	controls.pan(new THREE.Vector3( 1, 0, 0 ));
	controls.pan(new THREE.Vector3( 0, 1, 0 ));
}

var opts = {
	renderMode: 'TRIANGLE_FAN'
}

var gui = new dat.GUI()
gui.add( opts,'renderMode', ['TRIANGLES','POINTS', 'TRIANGLE_FAN', 'TRIANGLE_STRIP', "LINE_LOOP", "LINES", "LINE_STRIP"])

var render = function () {

	if(typeof array === 'object' && array.length > 0) {
		var k = 0;
		for(var i = 0; i < cubes.length; i++) {
			for(var j = 0; j < cubes[i].length; j++) {
				var scale = (array[k] + boost) / 150;
				//cubes[i][j].scale.z = (scale < 1 ? 1 : scale);
				cubes[i][j].scale.x = (scale < 1 ? 1 : scale);
				//cubes[i][j].scale.y = (scale < 1 ? 1 : scale);

				var color = randomFairColor();

				//cubes[i][j].position.set( 100 - k , i * 0,1 , 0  );
				//cubes[i][j].material.color = new THREE.Color(color);
				k += (k < array.length ? 1 : 0);
				cubes[i][j].rotation.x += (0.1 * boost) / 150;
			}
		}

	}

	requestAnimationFrame(render);
	//controls.update();
	renderer.render(scene, camera);
};

render();
renderer.setSize($(window).width(), $(window).height());

function randomFairColor() {
	var min = 100;
	var max = 10000;
	var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
	var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
	var b = (Math.floor(Math.random() * (max - min + 1)) + min);
	return r + g + b;
}
