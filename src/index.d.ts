import React, { FC, MutableRefObject, RefObject } from 'react';
import { Config } from 'roughjs/bin/core';
declare type SvgRef = MutableRefObject<SVGSVGElement>;
declare type CanvasRef = MutableRefObject<HTMLCanvasElement>;
declare type renderer = 'canvas' | 'svg';
interface RoughProps {
    width?: number;
    height?: number;
    config?: Config;
    renderer?: renderer;
}
interface RoughCompProps extends RoughProps {
    forwardedRef: RefObject<unknown>;
}
interface ForwardedRoughProps extends RoughProps {
    ref?: SvgRef | CanvasRef;
}
interface RoughContextProps {
    ref?: SvgRef | CanvasRef;
    config?: Config;
    width?: number;
    height?: number;
}
export declare const RoughContext: React.Context<RoughContextProps>;
export declare const ReactRoughComp: FC<RoughCompProps>;
export declare const ReactRough: React.RefForwardingComponent<SVGSVGElement | HTMLCanvasElement, ForwardedRoughProps>;
export * from './RoughComponents';
export default ReactRough;
