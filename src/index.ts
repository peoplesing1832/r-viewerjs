import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.min.css';

type Image = Partial<Omit<HTMLImageElement, 'src'>> & {
  src: string;
};

type Options = Viewer.Options & {
  errImg?: string;
}

const createElement = (
  images: Image[],
  errImg: string,
  viewer: {
    viewer: Viewer | null;
  }
) => {
  const ul = document.createElement('ul');
  const fragment = document.createDocumentFragment();
  images.forEach((image, index) => {
    const li = document.createElement('li');
    const imgEle = document.createElement('img');
    const entries = Object.entries(image);
    entries.forEach(([key, value]) => imgEle.setAttribute(key, value as any));
    if (errImg) {
      imgEle.addEventListener('error', () => {
        imgEle.setAttribute('src', errImg);
        (viewer.viewer as Viewer).update();
        (viewer.viewer as Viewer).view(index);
      });
    }
    fragment.appendChild(li.appendChild(imgEle));
  });
  ul.appendChild(fragment);
  return ul;
};

const createViewer = (
  image: Image | Image[],
  options?: Options,
) => {
  if (!Array.isArray(image)) {
    image = [image]
  }
  let viewer: {
    viewer: Viewer | null;
  } = {
    viewer: null
  };
  const { errImg = '', ...args } = options || {};

  const ele = createElement(image, errImg, viewer);
  viewer.viewer = new Viewer(ele, {
    ...args,
  });
  return viewer.viewer;
};

export default createViewer;
