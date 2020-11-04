import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import {
  SVG_DIMS,
  BIT_LINE_TOP_PAD,
  BIT_LINE_BOTTOM_END,
  BIT_Y,
  BIT_FIX_X,
} from '../../utils/constants';
import { createSVGPointsFromCert, scale } from './helpers';

type Props = { id: number; input: string };

const Board: React.FC<Props> = ({ id, input }) => {
  const [strPoints, svgPoints, levels, bits] = useMemo(
    () => createSVGPointsFromCert(input),
    [input],
  );

  const markerSize = useMemo(() => scale(input.length, 20, 4), [input]);
  const levelDashSize = useMemo(() => scale(input.length, 20, 10), [input]);
  const bitLineDashSize = useMemo(() => scale(input.length, 20, 8), [input]);
  const bitFontSize = useMemo(() => scale(input.length, 20, 16), [input]);

  const withId = useCallback((value) => `${id}-${value}`, [id]);

  const markerId = `circle${id}`;
  return (
    <Wrapper>
      <SVG {...SVG_DIMS} viewBox={`0 0 ${SVG_DIMS.width} ${SVG_DIMS.height}`}>
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="8"
            markerHeight="8"
          >
            <circle
              stroke="#2196f3"
              strokeWidth="2"
              fill="none"
              cx="5"
              cy="5"
              r={`${markerSize}`}
            />
          </marker>
        </defs>
        <SVGPolyline
          points={strPoints}
          markerStart={`url(#${markerId})`}
          markerEnd={`url(#${markerId})`}
          markerMid={`url(#${markerId})`}
        />
        {svgPoints.map((point) => (
          <SVGBitPolyline
            points={`${point.left},${point.top + BIT_LINE_TOP_PAD} ${
              point.left
            },${BIT_LINE_BOTTOM_END}`}
            key={withId(`${point.left}${point.top}`)}
            strokeDasharray={bitLineDashSize}
          />
        ))}
        {levels.map((levelValue) => (
          <SVGLevelPolyline
            key={withId(levelValue)}
            points={`0,${levelValue} ${SVG_DIMS.width},${levelValue}`}
            strokeDasharray={levelDashSize}
          />
        ))}
        {bits.map((bit) => (
          <SVGText
            x={bit.left + BIT_FIX_X}
            y={BIT_Y}
            key={bit.left}
            fontSize={bitFontSize}
          >
            {bit.value}
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
`;

const SVGBitPolyline = styled(SVGPolyline)`
  stroke-width: 0.3;
  fill-opacity: 0;
  stroke: #808080a6;
`;

const SVGText = styled.text`
  stroke: grey;
`;
