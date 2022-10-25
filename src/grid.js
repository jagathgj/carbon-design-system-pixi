import React, { useCallback, useEffect } from "react";
import { Application } from "pixi.js";
import { Spine } from "pixi-spine";

const Grid = (props) => {
  const elements = document.querySelectorAll('div[class*="bx--col"]');
  function loadAnimation(el, event) {
    const parent = event.target;
    const app = new Application({
      width: 64,
      height: 64,
      transparent: true
    });
    parent.appendChild(app.view);

    // Start the PixiJS app
    app.start();

    // change character file names "spineboy" or spineboy-pro for two different characters
    app.loader
      .add("spineboy", `https://www.hellojagath.com/pixi-spine/spineboy.json`)
      .load(onAssetsLoaded);

    app.stage.interactive = true;

    function onAssetsLoaded(loader, res) {
      // create a spine boy
      const spineBoy = new Spine(res.spineboy.spineData);

      // set the position
      spineBoy.x = app.screen.width / 2;
      spineBoy.y = app.screen.height;

      spineBoy.scale.set(0.2);

      // set up the mixes!
      spineBoy.stateData.setMix("walk", "jump", 0.2);
      spineBoy.stateData.setMix("jump", "walk", 0.4);

      // play animation
      spineBoy.state.setAnimation(0, "walk", true);

      app.stage.addChild(spineBoy);

      app.stage.on("pointerdown", () => {
        spineBoy.state.setAnimation(0, "jump", false);
        spineBoy.state.addAnimation(0, "walk", true, 0);
      });
    }
  }
  const loadCanvas = useCallback((el, event) => {
    event.preventDefault();
    let canvas = document.createElement("canvas");
    let parent = event.target;
    let parentSize = parent.getBoundingClientRect();
    console.log(parentSize);
    canvas.id = "CanvasLayer";
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.height = "100%";
    canvas.style.width = "100%";
    canvas.style.border = "1px solid red";
    parent.appendChild(canvas);
    // loadAnimation(el, event);
  }, []);

  const handleClick = useCallback(
    (el, event) => {
      elements.forEach((element) => {
        return element.querySelector("#CanvasLayer")?.remove();
      });
      loadCanvas(el, event);
    },
    [elements, loadCanvas]
  );

  useEffect(() => {}, [handleClick]);

  elements.forEach((el) => {
    el.addEventListener("click", (event) => handleClick(el, event));
  });
  return (
    <>
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-lg-12">12</div>
        </div>

        <div className="bx--row">
          <div className="bx--col-lg-11 bx--col-md-7 bx--col-sm-2">11</div>
          <div className="bx--col-lg-1 bx--col-md-1 bx--col-sm-2">1</div>
        </div>

        <div className="bx--row">
          <div className="bx--col-lg-10 bx--col-md-6 bx--col-sm-2">10</div>
          <div className="bx--col-lg-2 bx--col-md-2 bx--col-sm-2">2</div>
        </div>

        <div className="bx--row">
          <div className="bx--col-lg-9 bx--col-md-5 bx--col-sm-2">9</div>
          <div className="bx--col-lg-3 bx--col-md-3 bx--col-sm-2">3</div>
        </div>

        <div className="bx--row">
          <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">8</div>
          <div className="bx--col-lg-4 bx--col-md-4 bx--col-sm-2">4</div>
        </div>

        <div className="bx--row">
          <div className="bx--col-lg-7 bx--col-md-3 bx--col-sm-2">7</div>
          <div className="bx--col-lg-5 bx--col-md-5 bx--col-sm-2">5</div>
        </div>

        <div className="bx--row">
          <div className="bx--col-lg-6 bx--col-md-2 bx--col-sm-2">6</div>
          <div className="bx--col-lg-6 bx--col-md-6 bx--col-sm-2">6</div>
        </div>

        <div className="bx--row">
          <div className="bx--col-lg-5 bx--col-md-1 bx--col-sm-2">5</div>
          <div className="bx--col-lg-7 bx--col-md-7 bx--col-sm-2">7</div>
        </div>

        <div className="bx--row">
          <div className="bx--col-lg-4 bx--col-md-2 bx--col-sm-2">4</div>
          <div className="bx--col-lg-8 bx--col-md-6 bx--col-sm-2">8</div>
        </div>

        <div className="bx--row">
          <div className="bx--col-lg-3 bx--col-md-3 bx--col-sm-2">3</div>
          <div className="bx--col-lg-9 bx--col-md-5 bx--col-sm-2">9</div>
        </div>

        <div className="bx--row">
          <div className="bx--col-lg-2 bx--col-md-4 bx--col-sm-2">2</div>
          <div className="bx--col-lg-10 bx--col-md-4 bx--col-sm-2">10</div>
        </div>

        <div className="bx--row">
          <div className="bx--col-lg-1 bx--col-md-5 bx--col-sm-2">1</div>
          <div className="bx--col-lg-11 bx--col-md-3 bx--col-sm-2">11</div>
        </div>
      </div>
    </>
  );
};

export default Grid;
