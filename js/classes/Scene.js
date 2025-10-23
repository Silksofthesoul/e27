'use strict';
(function() {
   if(!window.__lib) window.__lib = {};

  const { element, insert, altQueue, rndInt } = window.__lib;
  const {log} = console;

  class Scene {
    elRoot = null;

    constructor() {
      // log('Scene');
      this.create();
    }

    create() {
      this.elRoot = element('div', { class: 'scene' });
      insert(this.elRoot, document.body, 'afterbegin');
    }
    rndEffector() {
      const factor = rndInt(1, 300);
      let [b, c] = [0, 1];
      if(factor % rndInt(1, 7) === 0) {
        [b, c] = [rndInt(0, 7), rndInt(1, 20)];
        this.elRoot.style.cssText = `filter: blur(${b}px) contrast(${c})`;
      }
    }
  };

  window.__lib = {
    ...(window.__lib || {}),
    Scene,
  };
})();
