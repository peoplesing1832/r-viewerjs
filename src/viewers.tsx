import React, {
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react';
import Viewer from 'viewerjs';
import { noop } from './utils/noop';
import { options as defaultOptions } from './config/options';

interface RViewersProps extends Partial<Viewer.Options> {
  children: React.ReactElement;
}

const RViewers: React.ForwardRefRenderFunction<Viewer, RViewersProps> = (props, ref) => {
  const {
    children,
    ...viewerOptions
  } = props;

  const selfRef = useRef<HTMLElement>();
  const viewerRef = useRef<Viewer>();
  const childrenProps = children?.props;

  const handleClick = (event: MouseEvent): void => {
    const beforeHandleClick = children?.props?.onClick || noop;
    beforeHandleClick();
    if (viewerRef.current) {
      if ((event?.target as HTMLElement)?.tagName?.toLocaleLowerCase() === 'img') {
        const target = event.target as HTMLElement;
        const images = selfRef.current?.getElementsByTagName('img') || [];
        for (let i = 0; i < images?.length; i += 1) {
          if (images[i] === target) {
            viewerRef.current.view(i);
            break;
          }
        }
      }
    }
  };

  useEffect(() => {
    viewerRef.current = new Viewer(selfRef.current as HTMLElement, {
      ...defaultOptions,
      ...viewerOptions,
    });
    return (): void => {
      (viewerRef.current as Viewer).destroy();
    };
  }, []);

  useImperativeHandle(ref, () => viewerRef.current as Viewer);

  return React.cloneElement(React.Children.only(children), {
    ...childrenProps,
    onClick: handleClick,
    ref: selfRef,
  });
};

export default RViewers;
