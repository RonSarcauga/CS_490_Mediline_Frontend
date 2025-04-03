{/* This is the base component for any images we import (not SVG icons).
    Height and width should change the dimensions of the image */ }
export default function Image({
    src = '',
    alt = '',
    height,
    width
})
{
    const imageStyle = {
        height,
        width
    };
    return (
        <img src={src} alt={alt} style={ imageStyle } />
  );
}
