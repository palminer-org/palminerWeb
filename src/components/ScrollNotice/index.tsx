/*
 * @Author: wuqiang
 * @Date: 2024-03-29 16:49:03
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-06-02 23:20:06
 */
import { useRef, useEffect } from 'react';
import './index.scss'; // Import CSS styles

export function ScrollNotice(props: Record<string, any>) {
  const { text } = props;
  const scrollRef = useRef<HTMLDivElement>(null); // Reference to the scrolling element

  useEffect(() => {
    const scrollElement = scrollRef.current;
    
    // Animation effect for text scrolling
    const keyframes = [
      { transform: 'translateX(0%)' },
      { transform: 'translateX(-100%)' }
    ];

    // Animation configuration
    const options = {
      duration: 10000, // Complete scrolling in 10 seconds
      iterations: Infinity // Infinite repetition
    };
    
    // Start CSS animation
    const animation = scrollElement?.animate(keyframes, options);

    return () => {
      animation?.cancel(); // Clean up animation
    }
  }, [text]); // Depends on text, restart animation when text changes

  return (
    <div className="scroll-notice">
      <div className="scroll-text" ref={scrollRef}>
        {text}
      </div>
    </div>
  );
};
