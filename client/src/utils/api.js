// const API_ENDPOINT = `http://localhost`

// export const request = async (nodeId = '') => {
//   try {
//     const res = await fetch(`${API_ENDPOINT}${nodeId}`);

//     if(!res.ok) {
//       throw new Error(`API 호출 오류`);
//     }

//     return await res.json();
//   }catch(e){
//     throw new Error(`API 호출 오류 :`, e);
//   }
// }