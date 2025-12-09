/*
 * @Author: wuqiang
 * @Date: 2024-06-01 00:48:37
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-06-03 01:47:06
 */
import { useInViewport } from "ahooks";
import "./index.scss";
import scene_title from "../../assets/scene_title.png";
import scene_anim_1 from "../../assets/scene_anim_1.gif";
import scene_anim_2 from "../../assets/scene_anim_2.gif";
import scene_anim_3 from "../../assets/scene_anim_3.gif";
import scene_1 from "../../assets/scene_1.png";
import scene_2 from "../../assets/scene_2.png";
import scene_3 from "../../assets/scene_3.png";
import { useEffect, useRef } from "react";

export function GameScenes() {
  const sceneRef1 = useRef<any>();
  const sceneRef2 = useRef<any>();
  const sceneRef3 = useRef<any>();
  const [sceneRefInView1] = useInViewport(sceneRef1);
  const [sceneRefInView2] = useInViewport(sceneRef2);
  const [sceneRefInView3] = useInViewport(sceneRef3);

  useEffect(() => {
    if (sceneRefInView1) {
      sceneRef1.current.classList.add("active");
    } else {
      sceneRef1.current.classList.remove("active");
    }

    if (sceneRefInView2) {
      sceneRef2.current.classList.add("active");
    } else {
      sceneRef2.current.classList.remove("active");
    }

    if (sceneRefInView3) {
      sceneRef3.current.classList.add("active");
    } else {
      sceneRef3.current.classList.remove("active");
    }
  }, [sceneRefInView1, sceneRefInView2, sceneRefInView3]);

  return (
    <div className="game-scenes" >
      <h2>
        <strong>Background</strong>
        <img src={scene_title} className="scene_title" />
      </h2>
      <div className="scene" ref={sceneRef1}>
        <div className="scene_left">
          <img src={scene_anim_1} />
          <h2>The Ruins of PalMiner</h2>
          <p>
            In the aftermath of a cataclysmic war, the world of PalMiner lay in
            ruins, its once-thriving civilizations reduced to mere shadows of
            their former glory.
          </p>
        </div>
        <div className="scene_right">
          <img src={scene_1} />
        </div>
      </div>
      <div className="scene" ref={sceneRef2}>
        <div className="scene_right"><img src={scene_2} /></div>
        <div className="scene_left">
          <img src={scene_anim_2} />
          <h2>Forging Alliances</h2>
          <p>
            From the ashes of this devastation, a new era dawned, one where
            humanity and Paloo companions forged an unlikely alliance, united by
            a shared vision of rebuilding and reclaiming their shattered world.
          </p>
        </div>
      </div>
      <div className="scene" ref={sceneRef3}>
        <div className="scene_left">
          <img src={scene_anim_3} />
          <h2>Rebuilding with Paloo</h2>
          <p>
            Amidst the ruins, they discovered hidden treasures – vast deposits
            of precious resources, the lifeblood of a resurgent civilization.
            With renewed determination, they harnessed these resources,
            employing their ingenuity and the boundless potential of their Paloo
            companions to rebuild their shattered homes.
          </p>
        </div>
        <div className="scene_right">
        <img src={scene_3} />
        </div>
      </div>
    </div>
  );
}
