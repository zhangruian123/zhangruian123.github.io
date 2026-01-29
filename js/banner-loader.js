(function() {

  const images = [
    '/img/cibeidengta.jpg',
    '/img/caster.jpeg',
    '/img/babieta.png',
    '/img/hetu.jpg',
    '/img/shiziwang.png',
    '/img/M3.png',
    '/img/honglongzilong.png'
  ];
  let currentIndex = 0;
  const banner = document.querySelector('#banner');

  if (banner) {
    // 1. 创建一个用于过渡的额外层
    const nextLayer = document.createElement('div');
    nextLayer.style.position = 'absolute';
    nextLayer.style.top = '0';
    nextLayer.style.left = '0';
    nextLayer.style.width = '100%';
    nextLayer.style.height = '100%';
    nextLayer.style.backgroundSize = 'cover';
    nextLayer.style.backgroundPosition = 'center';
    nextLayer.style.opacity = '0';
    nextLayer.style.transition = 'opacity 1.5s ease-in-out';
    nextLayer.style.zIndex = '-1'; // 确保在文字下方
    banner.appendChild(nextLayer);

    // 设置初始背景
    banner.style.backgroundImage = `url(${images[0]})`;
    banner.style.transition = 'none'; 

    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      const nextSrc = images[currentIndex];

      // 2. 预加载图片
      const img = new Image();
      img.src = nextSrc;
      img.onload = () => {
        // 3. 图片加载完成后再执行淡入
        nextLayer.style.backgroundImage = `url(${nextSrc})`;
        nextLayer.style.opacity = '1';

        setTimeout(() => {
          // 4. 动画结束后，把底层换掉，重置顶层透明度，准备下一次切换
          banner.style.backgroundImage = `url(${nextSrc})`;
          nextLayer.style.opacity = '0';
        }, 1500); // 这里的时长要和 transition 的 1.5s 一致
      };
    }, 5000);
  }
})();