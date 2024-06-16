//get light colors for black text
export function getRandomColor() {
    const hue = Math.floor(Math.random() * 350) + 10; //from 10 to 360 degrees
    const saturation = Math.floor(Math.random() * 40) + 60; //from 60% to 100%
    const lightness = Math.floor(Math.random() * 10) + 80; //from 80% to 90%
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    return color;
  }