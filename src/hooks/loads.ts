/*
 * @Author: wuqiang
 * @Date: 2024-01-16 14:03:07
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-06-04 14:16:16
 */
export function afterCommonLoad() {
  ;(function () {
    const deviceWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    // const docEle = document.documentElement || document.body
    const docEle: any = document.querySelector('.scale_box');
    if (docEle) {
      docEle.style.scale = deviceWidth / 1920 + '';
      if (document.getElementById('root')) {
        document.getElementById('root')!.style.height = docEle.getBoundingClientRect().height + 'px'
      }
    }
    // docEle!.style.scale = deviceWidth / 1920 + '';

    
  })()

  window.addEventListener('resize', () => {
    ;(function () {
      const deviceWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      // const docEle = document.documentElement || document.body
      // docEle!.style.scale = deviceWidth / 1920 + '';
      const docEle: any = document.querySelector('.scale_box');
      if (docEle) {
        docEle.style.scale = deviceWidth / 1920 + '';
        if (document.getElementById('root')) {
          document.getElementById('root')!.style.height = docEle.getBoundingClientRect().height + 'px'
        }
      }
     
    })()
  })

  window.addEventListener('load', () => {
    ;(function () {
      const deviceWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      // const docEle = document.documentElement || document.body
      // docEle!.style.scale = deviceWidth / 1920 + '';
      const docEle: any = document.querySelector('.scale_box');
      if (docEle) {
        docEle.style.scale = deviceWidth / 1920 + '';
        if (document.getElementById('root')) {
          document.getElementById('root')!.style.height = docEle.getBoundingClientRect().height + 'px'
        }
      }
     
    })()
  })
}

export function listenIndexMousemove(e: any) {
  const mouseX = e.clientX
  const mouseY = e.clientY

  // Get the center position of the screen
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2

  // Calculate the difference between mouse position and screen center
  const deltaX = mouseX - centerX
  const deltaY = mouseY - centerY

  // Set a movement factor that affects the movement amplitude. The larger the value, the more obvious the movement

  // const move_factor = 0.1

  // Calculate the new position of the element
  ;['.header_main_left'].forEach((clazz, index) => {
    const element: HTMLElement | null = document.querySelector(clazz)
    if (element) {

      // Calculate the new position of the element
      const translateX = deltaX * ([0.08, 0.06][index])
      const translateY = deltaY * ([0.08, 0.06][index])
      element.style.transform = `translate(${translateX}px, ${translateY}px)`
    }
  })
}

export function copyContent(text: string) {
    let textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    // Hide this input field
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    // Assign value
    textarea.value = text;
    // Select
    textarea.select();
    // Copy
    document.execCommand('copy', true);
    // Remove input field
    document.body.removeChild(textarea);

    let div = document.createElement('div');
    div.style.padding = '10px 10px';
    div.style.background = 'rgba(0,0,0,0.8)';
    div.style.color = '#fff';
    div.style.fontSize = '16px';
    div.style.position = 'fixed';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.transform = 'translate3d(-50,-50%,0)';
    div.textContent = 'success';
    div.style.borderRadius = '8px'
    document.body.appendChild(div);

    setTimeout(() => {
      div.parentElement?.removeChild(div)
    }, 2000)
}

