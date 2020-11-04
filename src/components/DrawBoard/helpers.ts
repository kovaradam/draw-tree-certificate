import { HORIZONTAL_SHIFT, SVG_DIMS, VERTICAL_SHIFT } from '../../utils/constants';

type SVGPoint = { left: number; top: number };
type CertificateBit = { value: string; left: number };

export function scale(
  inputLength: number,
  flatInterval: number,
  maxValue: number,
): number {
  return inputLength <= flatInterval ? maxValue : (maxValue * flatInterval) / inputLength;
}

export function normalize(value: number, maxValue: number, panelDim: number): number {
  return (panelDim / maxValue) * value;
}

export function createSVGPointsFromCert(
  certificate: string,
): [string, SVGPoint[], number[], CertificateBit[]] {
  const points: SVGPoint[] = [{ top: 0, left: 0 }];
  const bits: CertificateBit[] = [{ value: '0', left: 0 }];
  let top = 0;
  let maxTop = top;

  for (let i = 1; i < certificate.length; i++) {
    bits.push({ value: certificate[i], left: i });
    top += certificate[i - 1] === '1' ? -1 : 1;
    maxTop = top > maxTop ? top : maxTop;
    points.push({ left: i, top });
  }

  points.push({ left: certificate.length, top: 0 });
  bits.push({ value: '-', left: certificate.length });

  let strPoints = '';

  points.forEach((point) => {
    point.left = normalize(point.left, points.length, SVG_DIMS.width) + HORIZONTAL_SHIFT;
    point.top =
      SVG_DIMS.height -
      (normalize(point.top, maxTop + 1, SVG_DIMS.height) + VERTICAL_SHIFT);
    strPoints = strPoints.concat(`${point.left},${point.top} `);
  });
  bits.forEach(
    (bit) =>
      (bit.left = normalize(bit.left, bits.length, SVG_DIMS.width) + HORIZONTAL_SHIFT),
  );

  const levels: number[] = [];

  for (let i = 0; i <= maxTop; i++) {
    levels.push(
      SVG_DIMS.height - (normalize(i, maxTop + 1, SVG_DIMS.height) + VERTICAL_SHIFT),
    );
  }

  return [strPoints, points, levels, bits];
}
