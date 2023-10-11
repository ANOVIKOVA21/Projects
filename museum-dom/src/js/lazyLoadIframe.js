window.onload = () => {
  const IntObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry);
          entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.0 }
  );

  document
    .querySelectorAll('.video__iframe-container iframe')
    .forEach((video) => IntObserver.observe(video));
};
