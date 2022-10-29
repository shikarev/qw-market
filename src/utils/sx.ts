export function fixedLinesProp (num: number) {
  return {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: num,
    whiteSpace: 'break-spaces'
  }
}
