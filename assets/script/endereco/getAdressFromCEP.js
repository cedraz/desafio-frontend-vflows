export default async function getAdressFromCEP(cep) {
  const url = `https://brasilaberto.com/api/v1/zipcode/${cep}`;
  const response = await fetch(url);

  if (response.status !== 200) {
    return false;
  }

  const data = await response.json();
  return data;
}
