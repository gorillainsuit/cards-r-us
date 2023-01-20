declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

// declare a module for importing jpg, png, and gif files
declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

// telling typescript everything is cool with the file types above
declare module '*.module.scss' {
  const classes: any;
  export default classes;
}
