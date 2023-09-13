class PositionIndicator {
  constructor() {
    this.currentTab = null;
    this.tabContainerHeight = 70;
    this.navElements = document.querySelectorAll('nav a[href^="#"]');

    this.navElements.forEach((navElement) => {
      navElement.addEventListener('click', (event) => this.onTabClick(event));
    });

    this.onScroll();

    window.addEventListener('scroll', () => this.onScroll());
    window.addEventListener('resize', () => this.onResize());
  }

  onTabClick(event) {
    event.preventDefault();

    const targetArticle = document.querySelector(event.currentTarget.attributes.href.value);

    window.scrollTo({
      top: targetArticle.offsetTop - this.tabContainerHeight,
      behavior: 'smooth'
    });
  }

  onScroll() {
    this.findCurrentTabSelector();
  }

  onResize() {
    this.setSliderCss();
  }

  findCurrentTabSelector(element) {
    let currentNavElement;

    this.navElements.forEach((navElement) => {
      const idSelector = navElement.attributes.href.value;
      const article = document.querySelector(idSelector);

      if (article.getBoundingClientRect().top < (window.innerHeight / 2)) {
        currentNavElement = navElement;
      }
    });

    const fakeTab = { href: '' };
    if ((this.currentTab || fakeTab).href !== (currentNavElement || fakeTab).href) {
      this.currentTab = currentNavElement;
      this.setSliderCss();
    }
  }

  setSliderCss() {
    const sliderElement = document.querySelector('nav .slider');
    const tabDimensions = this.currentTab ? this.currentTab.getBoundingClientRect() : { width: 0, left: 0 };

    sliderElement.style.width = tabDimensions.width;
    sliderElement.style.left = tabDimensions.left;
  }
}

new PositionIndicator();

// map
const initialiseMap = () => {
  if (!mapboxgl) { window.setTimeout(100, initialiseMap()); return }

  mapboxgl.accessToken = 'pk.eyJ1IjoiZW1yb3giLCJhIjoiY2pvMzE4dnAzMHE3dzNrcGFuajdoa2duZSJ9.qiLN60PNBVjW4pivjwVtvQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [6.77, 45.90],
    zoom: 5
  });
  map.addControl(new mapboxgl.NavigationControl());
  map.setStyle('mapbox://styles/emrox/ck3wycjf73c2m1cll16jzxbuk');

  const markerElelemt = document.createElement('div');
  markerElelemt.className = 'map__marker';

  new mapboxgl.Marker(markerElelemt).setLngLat({ lng: 6.770030, lat: 45.899110 }).addTo(map);
}

if (document.querySelector('#map')) {
  window.setTimeout(100, initialiseMap());
}

