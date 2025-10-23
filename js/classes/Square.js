'use strict';
(function() {
   if(!window.__lib) window.__lib = {};

  const {
    element,
    insert,
    rndInt,
    rndFromArray,
  } = window.__lib;


  class Square {
    scene   = null;
    elRoot  = null;
    elSide = null;
    static squares = [];

    constructor({ scene }) {
      this.scene = scene;
      this.create();
      Square.squares.push(this);
    }
    remove() {
      this.elRoot.remove();
    }

    getDots(el) {
      const count = rndInt(0, 6);
      el.classList.add(`square__side--${count}`);
      for (let i = 0; i < count; i++) {
        const dot = element('div', { class: `square__dot` });
        insert(dot, el);
      }
      if(!count) {
        const dot = element('div', { class: `square__dot` });
        insert(dot, el);
      }
    }

    cleanDots() {
      this.elSide.querySelectorAll('.square__dot').forEach(d => d.remove());
    }

    create() {
      const degs = [0, 90, 180, 270];
      this.elRoot  = element('div', { class: 'square'       });
      this.elSide = element('div', { class: 'square__side' });

      this.getDots(this.elSide);
      this.elRoot.style.cssText = `transform: rotate(${rndFromArray(degs)}deg)`;

      insert
        (this.elSide,   this.elRoot)
        (this.elRoot,    this.scene.elRoot);
    }

    reinit() {
      const degs = [0, 90, 180, 270];
      this.cleanDots();
      this.getDots(this.elSide);
      this.elRoot.style.cssText = `transform: rotate(${rndFromArray(degs)}deg)`;
    }

    get isOutFromScene() {
      const { right, bottom } = this.elRoot.getBoundingClientRect();
      const { rigth: sr, bottom: sb } = this.scene.elRoot.getBoundingClientRect();
      const c1 = right > sr;
      const c2 = bottom > sb;
      return c1 || c2;
    }

    static flush() {
      Square.squares
        .forEach((d, i, arr) => {
          d.remove();
          arr[i] = null;
        });
      Square.squares = [];
    }

    static rndReinit() {
      const factor = rndInt(1, 300);
      if(factor % 3 === 0) {
        const sq = rndFromArray(Square.squares);
        sq.reinit();
      }
    }

  };

  window.__lib = {
    ...(window.__lib || {}),
    Square,
  };
})();
