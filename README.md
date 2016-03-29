# animate-background-image

Animate element's background image based on attributes or by manually calling the method.

## Setup

By using parameters.

```

  <any
    data-animate-background-image
    data-animate-background-image-url="http://mycdn.com/my-animation-frame-${frame}.jpg"
    data-animate-background-image-frames="20"
    data-animate-background-image-speed="1000"
  ></any>

```

Or by manually calling the method.

```
  
  // view.html
  <any class="animatedBackground"></any>

  // script.js
  animateBackgroundImage(
    document.querySelector('.animatedBackgrond'),
    {
      baseUrl: 'http://mycdn.com/my-animation-frame-${frame}.jpg',
      frames: 20,
      speed: 1000
    }
  );

```
