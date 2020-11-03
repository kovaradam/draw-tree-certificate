import { SVG_DIMS } from '../../utils/constants';

type SVGPoint = { left: number; top: number };
type CertificateBit = { value: string; left: number };

export function normalize(value: number, maxValue: number, panelDim: number): number {
  return (panelDim / maxValue) * value;
}

export function createSVGPointsFromCert(
  certificate: string,
): [string, number[], CertificateBit[]] {
  const verticalAdjust = 50;
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
    const top = normalize(point.left, points.length, SVG_DIMS.width);
    const height = normalize(point.top, maxTop + 1, SVG_DIMS.height) + verticalAdjust;
    strPoints = strPoints.concat(`${top},${height} `);
  });
  bits.forEach((bit) => (bit.left = normalize(bit.left, bits.length, SVG_DIMS.width)));

  const levels: number[] = [];

  for (let i = 0; i <= maxTop; i++) {
    levels.push(normalize(i, maxTop + 1, SVG_DIMS.height) + verticalAdjust);
  }

  return [strPoints, levels, bits];
}
