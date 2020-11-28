import React, {
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react';
import Viewer from 'viewerjs';
import { noop } from './utils/noop';
import { options as defaultOptions } from './config/options';

interface RViewerProps extends Partial<Viewer.Options> {
  children: React.ReactElement;
}

const RViewer: React.ForwardRefRenderFunction<Viewer, RViewerProps> = (props, ref) => {
  const {
    children,
    ...viewerOptions
  } = props;

  if (children.type !== 'img') {
    throw new Error('children elements must be img elements');
  }

  const childrenProps = children?.props;
  const viewerRef = useRef<Viewer>();
  const selfRef = useRef<HTMLElement>();

  const handleClick = (): void => {
    const beforeHandleClick = children?.props?.onClick || noop;
    beforeHandleClick();
    if (viewerRef.current) {
      viewerRef.current.show();
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

export default RViewer;
