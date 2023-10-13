const anexosCard = document.querySelector("[data-anexos]");
const adicionarAnexoButton = document.querySelector("#adicionar-anexo");
const fileInput = document.querySelector("#adicionarAnexo");
const anexosFiles = {};
const anexosArray = [];
sessionStorage.setItem("anexos", JSON.stringify(anexosArray));
let anexos = 0;

fileInput.addEventListener("change", (event) => {
  event.preventDefault();
  anexos++;
  const file = event.target.files[0];

  if (file) {
    anexosFiles[anexos] = file;
    const blob = new Blob([file], { type: file.type });
    const url = window.URL.createObjectURL(blob);
    const anexoObject = {
      indice: anexos,
      nomeArquivo: file.name,
      blobArquivo: url,
    };
    anexosArray.push(anexoObject);
    sessionStorage.setItem("anexos", JSON.stringify(anexosArray));
    adicionarAnexo(file.name);
  }
});

function downloadFile() {
  const a = document.createElement("a");
  document.body.appendChild(a);
  return function (conteudo, nomeDoArquivo, tipoDoArquivo) {
    const blob = new Blob([conteudo], { type: tipoDoArquivo });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = nomeDoArquivo;
    a.click();
    window.URL.revokeObjectURL(url);
  };
}

function adicionarAnexo(nomeAnexo) {
  const anexoHTML = `
          <div class="row mt-3" id="anexo${anexos}">
            <div class="d-flex justify-content-center col-1">
              <i class="bi bi-trash h2" id="removerAnexo${anexos}"></i>
            </div>
            <div class="d-flex justify-content-center col-1">
            <i class="bi bi-eye h2" id="baixarAnexo${anexos}"></i>
            </div>
            <div class="d-flex align-items-center col-10">
              ${nomeAnexo}
            </div>
          </div>
`;

  anexosCard.insertAdjacentHTML("afterbegin", anexoHTML);

  const removerAnexo = document.querySelector(`#removerAnexo${anexos}`);
  removerAnexo.addEventListener("click", (event) => {
    event.preventDefault();
    const anexoId = event.target.id.charAt(event.target.id.length - 1);

    const anexoIndex = anexosArray.findIndex(
      (anexo) => anexo.indice === Number(anexoId)
    );
    anexosArray.splice(anexoIndex, 1);
    sessionStorage.setItem("anexos", JSON.stringify(anexosArray));
    anexosCard.removeChild(document.querySelector(`#anexo${anexoId}`));
  });

  const baixarAnexo = document.querySelector(`#baixarAnexo${anexos}`);
  baixarAnexo.addEventListener("click", (event) => {
    event.preventDefault();
    const anexoId = event.target.id.charAt(event.target.id.length - 1);
    downloadFile()(
      anexosFiles[anexoId],
      anexosFiles[anexoId].name,
      anexosFiles[anexoId].type
    );
  });
}
