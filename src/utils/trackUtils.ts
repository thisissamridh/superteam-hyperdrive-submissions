export const getTrackBackgroundColor = (trackName: string): string => {
  const colors: { [key: string]: string } = {
    'Physical Infrastructure Networks': '#8ECDDD',
    AI: '#A6FF96',
    'Finance and Payments': '#BC7AF9',
    'Gaming & Entertainment': '#FBF0B2',
    'Mobile Consumer dApps': '#FFC7EA',
    'Crypto Infrastructure': '#CAEDFF',
    'DAOs and Network States': '#D8B4F8',
  };

  return colors[trackName] || '#FFFFFF'; // Return a default color if the track name is not found
};

// Function to determine if the color is light or dark
const isColorLight = (hexColor: string): boolean => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155; // This threshold can be adjusted
};

export const getTrackTextColor = (trackName: string): string => {
  const bgColor = getTrackBackgroundColor(trackName);
  return isColorLight(bgColor) ? '#000000' : '#FFFFFF';
};
