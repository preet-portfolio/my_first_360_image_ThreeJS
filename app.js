function main() {
  const canvas = document.querySelector("#c");
  // scene camera renderer - 3 musts !
  const fov = 100;
  const aspect = canvas.clientWidth / canvas.clientHeight; // default aspect=2
  const near = 0.1; // default 0.1;
  const far = 2000; //default

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 1;

  //   renders our scene
  // standard webGL renderer

  const renderer = new THREE.WebGLRenderer({ canvas });

  new THREE.OrbitControls(camera, canvas);

  const scene = new THREE.Scene();
  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    // "https://threejs.org/manual/examples/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg"
    "https://i.postimg.cc/L4GSFxLB/paul-szewczyk-Gf-Xqt-Wmiu-DI-unsplash.jpg",
    () => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(renderer, texture);
      scene.background = rt.texture;
    }
  );

  function render() {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height, false);

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
main();
