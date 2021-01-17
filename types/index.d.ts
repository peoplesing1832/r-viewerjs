import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.min.css';
declare type Image = Partial<Omit<HTMLImageElement, 'src'>> & {
    src: string;
};
declare type Options = Viewer.Options & {
    errImg?: string;
};
declare const createViewer: (image: Image | Image[], options?: Options) => Viewer;
export default createViewer;
