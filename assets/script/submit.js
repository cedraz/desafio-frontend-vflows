import cnpjValidator from "./validations/cnpjValidator.js";
import { produtosArray } from "./produtos/adicionarProduto.js";

const submitButton = document.querySelector("#submit-button");
const fornecedor = document.querySelector("#fornecedor");
const downloadJSONButton = document.querySelector("#download-json");

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const inputs = fornecedor.querySelectorAll("input");
  const anexos = JSON.parse(sessionStorage.getItem("anexos"));
  const values = {};

  let inputsVazios = 0;

  inputs.forEach((input) => {
    if (input.hasAttribute("required") && input.value === "") {
      inputsVazios++;
    }

    values[input.id] = input.value;
  });

  if (inputsVazios > 0) {
    alert("Preencha todos os campos!");
    return;
  }

  const isCNPJValid = cnpjValidator(values.cnpj);

  if (!isCNPJValid) {
    alert("CNPJ inválido!");
    return;
  }

  if (produtosArray.length === 0) {
    alert("Adicione pelo menos um produto!");
    return;
  }

  console.log(produtosArray);

  let produtoNaoPreenchido = 0;

  produtosArray.forEach((produto) => {
    const { descricaoProduto, unidadeMedida, qtdeEstoque, valorUnitario } =
      produto;

    const empty = [
      descricaoProduto,
      unidadeMedida,
      qtdeEstoque,
      valorUnitario,
    ].some((e) => e === "" || e === null);

    if (empty) {
      produtoNaoPreenchido++;
    }
  });

  if (produtoNaoPreenchido > 0) {
    alert("Preencha todos os campos dos produtos!");
    return;
  }

  if (anexos.length === 0) {
    alert("Adicione pelo menos um anexo!");
    return;
  }

  console.log(anexos);

  const resposta = {
    ...values,
    produtos: produtosArray,
    anexos,
  };

  console.log(resposta);

  $("#exampleModal").modal("show");

  downloadJSONButton.addEventListener("click", () => {
    downloadJSON(resposta);
  });
});

function downloadJSON(resposta) {
  const jsonString = JSON.stringify(resposta);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "fornecedor.json";

  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
}
