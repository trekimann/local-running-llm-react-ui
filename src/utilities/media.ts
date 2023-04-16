// src/utilities/media.ts
import { css, FlattenSimpleInterpolation } from 'styled-components';

interface Size {
  mobile: number;
  tablet: number;
  desktop: number;
}

const sizes: Size = {
  mobile: 576,
  tablet: 768,
  desktop: 992,
};

type MediaType = Record<keyof Size, (l: TemplateStringsArray, ...p: any[]) => FlattenSimpleInterpolation>;

export const media = Object.keys(sizes).reduce((acc, label) => {
  (acc as MediaType)[label as keyof Size] = (literals: TemplateStringsArray, ...placeholders: any[]) =>
    css`
      @media (max-width: ${sizes[label as keyof Size]}px) {
        ${css(literals, ...placeholders)};
      }
    `;
  return acc;
}, {} as MediaType);
