export const sharePage = (title: string, text: string, url: string) => {
  navigator.share({title, text, url});
};
