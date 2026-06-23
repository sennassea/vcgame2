if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((registration) => registration.update())
      .catch((error) => {
        console.warn('서비스 워커 등록에 실패했습니다.', error);
      });
  });
}
