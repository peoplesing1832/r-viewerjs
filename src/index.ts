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
  viewer: Viewer
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
        image.setAttribute('src', errImg);
        viewer.update();
        viewer.view(index);
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
  let viewer!:Viewer;
  const { errImg = '', ...args } = options || {};

  const ele = createElement(image, errImg, viewer);
  viewer = new Viewer(ele, {
    ...args,
  });
  return viewer;
};

export default createViewer;
