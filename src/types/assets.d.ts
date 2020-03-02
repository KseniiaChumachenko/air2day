/* eslint-disable import/no-default-export */

declare module '*.svg' {
  const url: string
  export default url
}

declare module '*.svg?inline' {
  const svg: string
  export default svg
}
