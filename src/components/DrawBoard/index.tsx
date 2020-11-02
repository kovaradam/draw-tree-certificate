import React, { useMemo } from 'react';
import styled from 'styled-components';
import { createSVGPointsFromCert } from './helpers';

export const SVG_DIMS = { width: 580, height: 400 };

type Props = { input: string };

const DrawBoard: React.FC<Props> = ({ input }) => {
  const [points, levels, bits] = useMemo(() => createSVGPointsFromCert(input), [input]);

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
          points={points}
          markerStart="url(#circle)"
          markerEnd="url(#circle)"
          markerMid="url(#circle)"
        />
        {levels.map((levelValue) => (
          <SVGLevelPolyline
            key={levelValue}
            points={`0,${levelValue} ${SVG_DIMS.width},${levelValue}`}
          />
        ))}
        {bits.map((bit) => (
          <SVGText x={bit.left} y="15" key={bit.left}>
            {bit.value === '1' ? ' |' : 0}
          </SVGText>
        ))}
      </SVG>
    </Wrapper>
  );
};

export default DrawBoard;

const Wrapper = styled.div`
  overflow: hidden;
  width: min-content;
  padding: 1rem;
  background-color: white;
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
`;

const SVG = styled.svg`
  transform: scaleY(-1);
`;

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

const SVGText = styled.text`
  stroke: grey;
`;
