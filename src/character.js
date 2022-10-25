import React, { useRef, useEffect } from "react";
import { Application } from "pixi.js";
import { Spine } from "pixi-spine";

const Character = React.forwardRef((props, ref) => {
  const charRef = useRef(null);

  useEffect(() => {
    const app = new Application({
      width: 64,
      height: 64,
      transparent: true
    });

    // Add app to DOM
    charRef.current.appendChild(app.view);
    // Start the PixiJS app
    app.start();
    // change character file names "spineboy" or spineboy-pro for two different characters
    app.loader
      .add(
        "spineboy",
        `https://www.hellojagath.com/pixi-spine/${props.name}.json`
      )
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

    return () => {
      // On unload completely destroy the application and all of it's children
      app.destroy(true, true);
    };
  }, [charRef]);

  return <div ref={charRef}></div>;
});

export default Character;
