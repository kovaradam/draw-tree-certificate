import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  SVG_DIMS,
  BIT_LINE_TOP_PAD,
  BIT_LINE_BOTTOM_END,
  BIT_Y,
  BIT_FIX_X,
} from '../../utils/constants';
import { createSVGPointsFromCert } from './helpers';

type Props = { input: string };

const Board: React.FC<Props> = ({ input }) => {
  const [strPoints, svgPoints, levels, bits] = useMemo(
    () => createSVGPointsFromCert(input),
    [input],
  );

  return (
    <Wrapper>
      <SVG {...SVG_DIMS} viewBox={`0 0 ${SVG_DIMS.width} ${SVG_DIMS.height}`}>
        <defs>
          <marker
            id="circle"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="8"
            markerHeight="8"
          >
            <circle stroke="#2196f3" strokeWidth="2" fill="none" cx="5" cy="5" r="4" />
          </marker>
        </defs>
        <SVGPolyline
          points={strPoints}
          markerStart="url(#circle)"
          markerEnd="url(#circle)"
          markerMid="url(#circle)"
        />
        {svgPoints.map((point) => (
          <SVGBitPolyline
            points={`${point.left},${point.top + BIT_LINE_TOP_PAD} ${
              point.left
            },${BIT_LINE_BOTTOM_END}`}
            key={point.left}
          />
        ))}
        {levels.map((levelValue) => (
          <SVGLevelPolyline
            key={levelValue}
            points={`0,${levelValue} ${SVG_DIMS.width},${levelValue}`}
          />
        ))}
        {bits.map((bit) => (
          <SVGText x={bit.left + BIT_FIX_X} y={BIT_Y} key={bit.left}>
            {bit.value === '1' ? '1' : bit.value}
          </SVGText>
        ))}
      </SVG>
    </Wrapper>
  );
};

export default Board;

const Wrapper = styled.div`
  overflow: hidden;
  width: min-content;
  padding: 1rem;
  background-color: white;
  padding: 0.5rem;
  border-radius: 5px;
`;

const SVG = styled.svg``;

const SVGPolyline = styled.polyline`
  stroke-width: 1.5;
  fill-opacity: 0;
  stroke: #2196f3;
`;

const SVGLevelPolyline = styled(SVGPolyline)`
  stroke-width: 1;
  fill-opacity: 0;
  stroke: #808080a6;
  stroke-dasharray: 10;
`;

const SVGBitPolyline = styled(SVGPolyline)`
  stroke-width: 0.3;
  fill-opacity: 0;
  stroke: #808080a6;
  stroke-dasharray: 8;
`;

const SVGText = styled.text`
  stroke: grey;
`;
