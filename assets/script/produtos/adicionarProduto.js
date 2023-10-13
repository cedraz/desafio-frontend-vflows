const produtosCard = document.querySelector("[data-produtos]");
const adicionarProdutoButton = document.querySelector("#adicionar-produto");

let produtos = 0;
export const produtosArray = [];

adicionarProdutoButton.addEventListener("click", (event) => {
  event.preventDefault();

  produtos++;

  const produtoHTML = `
<div class="row mb-3" id="produto${produtos}">
<div
  class="d-flex col-1 justify-content-center align-items-center"
>
  <i class="bi bi-trash h4" id="removerProduto${produtos}" style="color: #da0000"></i>
</div>
<div class="col-11">
  <div class="card">
    <div class="card-header">Produto - ${produtos}</div>
    <div class="card-body">
      <div class="row">
        <div class="d-flex col-1 align-items-center">
          <i class="bi bi-archive display-2"></i>
        </div>
        <div class="col-11">
          <div class="row row-cols-2">
            <div class="mb-3 col-12">
              <label for="razaoSocialInput${produtos}" class="form-label"
                >Produto</label
              >
              <input
                type="text"
                class="form-control"
                id="produtoInput${produtos}"
              />
            </div>
            <div class="mb-3 col-3">
              <label class="form-label">UND. Medida</label>
              <select class="form-select" id="medida${produtos}" required>
                <option>cm</option>
                <option>metro</option>
                <option>galão</option>
                <option>Litro</option>
              </select>
            </div>
            <div class="mb-3 col-3">
              <label for="qntdEstoque${produtos}" class="form-label"
                >QDTDE. em Estoque</label
              >
              <input
                type="number"
                class="form-control"
                id="qntdEstoque${produtos}"
                min="0"
                required
              />
            </div>
            <div class="mb-3 col-3">
              <label for="valorUnitario${produtos}" class="form-label"
                >Valor Unitário</label
              >
              <input
                type="number"
                class="form-control"
                id="valorUnitario${produtos}"
                min="0"
                required
              />
            </div>
            <div class="mb-3 col-3">
              <fieldset disabled>
                <label
                  for="valorTotalInput${produtos}"
                  class="form-label"
                  >Valor Total</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="valorTotalInput${produtos}"
                  required
                  min="0"
                />
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
`;

  produtosCard.insertAdjacentHTML("afterbegin", produtoHTML);

  const descricaoProduto = document.querySelector(`#produtoInput${produtos}`);
  const medida = document.querySelector(`#medida${produtos}`);
  const qntdEstoque = document.querySelector(`#qntdEstoque${produtos}`);
  const valorUnitario = document.querySelector(`#valorUnitario${produtos}`);
  const valorTotal = document.querySelector(`#valorTotalInput${produtos}`);

  const produtoObject = {
    indice: produtos,
    descricaoProduto: descricaoProduto.value,
    unidadeMedida: medida.value,
    qtdeEstoque: qntdEstoque.value,
    valorUnitario: valorUnitario.value,
    valorTotal: valorTotal.value,
  };

  produtosArray.push(produtoObject);

  qntdEstoque.addEventListener("change", (event) => {
    event.preventDefault();
    valorTotal.value = qntdEstoque.value * valorUnitario.value;
  });

  valorUnitario.addEventListener("change", (event) => {
    event.preventDefault();
    valorTotal.value = qntdEstoque.value * valorUnitario.value;
  });

  const removerProduto = document.querySelector(`#removerProduto${produtos}`);
  removerProduto.addEventListener("click", (event) => {
    event.preventDefault();
    const produtoId = event.target.id.charAt(event.target.id.length - 1);
    const produtoIndex = produtosArray.findIndex(
      (produto) => produto.indice === Number(produtoId)
    );
    produtosArray.splice(produtoIndex, 1);
    produtosCard.removeChild(document.querySelector(`#produto${produtoId}`));
  });

  const produtoDiv = document.querySelector(`#produto${produtos}`);
  produtoDiv.addEventListener("change", (event) => {
    event.preventDefault();
    const produtoId = event.target.id.charAt(event.target.id.length - 1);
    const produto = produtosArray.find(
      (produto) => produto.indice === Number(produtoId)
    );
    produto.descricaoProduto = descricaoProduto.value;
    produto.unidadeMedida = medida.value;
    produto.qtdeEstoque = qntdEstoque.value;
    produto.valorUnitario = valorUnitario.value;
    produto.valorTotal = valorTotal.value;
  });
});
