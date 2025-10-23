(function() {
  const { Scene, Square, rndInt } = window.__lib;
  const scene = new Scene();

  const fill = _ => {
    let isRun = true;
    document.documentElement.style.setProperty('--square-size-short', `${rndInt(2, 13)}rem`);
    while(isRun) {
      let square = new Square({scene});
      if(square.isOutFromScene) { 
        isRun = false;
        square.remove();
        square = null;
      }
    }
  };

  const processRefill = () => {
    Square && Square.flush();
    fill();
    scene.rndEffector();
    let t = setTimeout(_ => processRefill(), rndInt(5000, 15000));
  };

  const processReinit = () => {
    Square && Square.rndReinit();
    let t = setTimeout(_ => processReinit(), rndInt(100, 250));
  };

  processRefill();
  processReinit();
})();
