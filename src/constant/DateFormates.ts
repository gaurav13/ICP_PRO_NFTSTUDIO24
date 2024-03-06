export const Date_m_d_y_h_m = 'MMMM Do, YYYY, HH:mm';
export function getIdFromLink(link: string) {
  if (link) {
    const array = link.split('/');
    let id = Number(array[array.length - 1]);
    return id;
  }
}
export function getIdFromUrl(url: string): string | undefined {
  const regex = /image\/(.+\..+)$/;  // Regular expression to match 'getimage/' followed by any characters and '.jpg' at the end
  const match = url.match(regex); // Apply the regular expression to the url

  if (match) {
    return match[1]; // If a match was found, return the filename
  } else {
  }
}
