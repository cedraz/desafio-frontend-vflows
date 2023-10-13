import getAdressFromCEP from "./getAdressFromCEP.js";

const cep = document.querySelector("#cep");

const endereco = document.querySelector("#endereco");
const bairro = document.querySelector("#bairro");
const municipio = document.querySelector("#municipio");
const estado = document.querySelector("#estado");

cep.addEventListener("blur", async () => {
  const cepValue = cep.value.replace(/\D/g, "");
  const data = await getAdressFromCEP(cepValue);

  if (data) {
    const { city, street, state, district } = data.result;

    endereco.value = street;
    bairro.value = district;
    municipio.value = city;
    estado.value = state;
  } else {
    console.log("CEP inválido");
  }
});
