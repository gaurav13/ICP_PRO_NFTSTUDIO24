export const validFileExtensions: any = {
  image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
};

export function isValidFileType(fileName: string, fileType: any) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1
  );
}
export const BASE_IMG_URL = `${process.env.BASE_URL}images/image/`;
