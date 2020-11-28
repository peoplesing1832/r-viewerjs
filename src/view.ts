import Viewer from 'viewerjs';
import { isArray } from './utils/type';
import { options as defaultOptions } from './config/options';

// type Image = Pick<HTMLImageElement, keyof HTMLImageElement>
type Image = Partial<Omit<HTMLImageElement, 'src'>> & {
  src: string;
};
type Source = Image | Image[];

const single = (source: Image): HTMLImageElement => {
  const image = document.createElement('img');
  const keys = Object.keys(source);
  keys.forEach((key) => {
    const value = source[key as keyof Image];
    // eslint-disable-next-line
    image.setAttribute(key, value as any);
  });
  return image;
};

const group = (sources: Image[]): HTMLUListElement => {
  const wrap = document.createElement('ul');
  const images = sources.map((source) => single(source));
  images.forEach((image) => {
    const li = document.createElement('li');
    li.appendChild(image);
    wrap.appendChild(li);
  });
  return wrap;
};

const container = (source: Source): HTMLImageElement | HTMLUListElement => {
  if (isArray(source)) {
    return group(source);
  }
  return single(source);
};

const view = (source: Source, options: Viewer.Options): Viewer => {
  const element = container(source);
  const viewer = new Viewer(element, {
    ...defaultOptions,
    ...options,
  });
  return viewer;
};

export default view;
