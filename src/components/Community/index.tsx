/*
 * @Author: wuqiang
 * @Date: 2024-05-31 04:18:31
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-06-03 01:53:26
 */
import { useInViewport } from "ahooks";
import './index.scss';
import community_role from '../../assets/community_role.png';
import community_diamond from '../../assets/community_diamond.png';
import { useEffect, useRef } from "react";

export function Community() {
  const communityRef = useRef<any>();
  const [communityRefInView] = useInViewport(communityRef);

  useEffect(() => {
    if (communityRefInView) {
      communityRef.current.classList.add("active");
    } else {
      communityRef.current.classList.remove("active");
    }

  }, [communityRefInView]);

  return <div className='community'>
    <div className='community_main' ref={communityRef}>
      <img src={community_role} className='community_role' />
      <div className='community_dialog'>
      Join the PalMiner community and embark on an epic journey of reconstruction and rediscovery.
Together, we shall rise from the ashes and forge a new destiny for PalMiner.
        <img src={community_diamond} className='community_diamond' />
      </div>
    </div>
  </div>
}