import React, { MutableRefObject } from 'react';
import { Config } from 'roughjs/bin/core';

type SvgRef = MutableRefObject<SVGSVGElement>;
type CanvasRef = MutableRefObject<HTMLCanvasElement>;

interface RoughContextProps {
	ref?: SvgRef | CanvasRef;
	config?: Config;
	width?: number;
	type: 'canvas' | 'svg';
	height?: number;
}

const RoughContext = React.createContext<RoughContextProps>({
	width: 300,
	height: 150,
	type: 'canvas'
});

RoughContext.displayName = 'RoughContext';

export default RoughContext;
