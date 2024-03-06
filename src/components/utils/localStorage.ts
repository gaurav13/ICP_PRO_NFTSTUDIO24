const getToken = () => {
  return localStorage.getItem('token');
};
let openLink=(link:any)=>{
  window.open(link)
}
export { getToken,openLink };
