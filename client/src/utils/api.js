export const request = async (url) => {
  try {
    const res = await fetch(url);

    if(!res.ok) {
      throw new Error(`API 호출 오류`);
    }

    return await res.json();
  }catch(e){
    throw new Error(`API 호출 오류 :`, e);
  }
}