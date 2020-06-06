const allResults = document.querySelectorAll(".search-result");

allResults.forEach(async result => {
  result.querySelector("._additionalInfo")?.remove();

  const text = await retrieveText(result);

  addInfoRow(result, text);
});

async function retrieveText(result) {
  const globalId = result.attributes.getNamedItem("data-global-id").value;
  return `BOO '${globalId}'`;
}

function addInfoRow(result, text) {
  const divElement = document.createElement("div");
  divElement.className = "_additionalInfo text";

  const textElement = document.createElement("p");
  textElement.innerText = text;
  divElement.appendChild(textElement);

  const editButton = document.createElement("button");
  editButton.onClick
  result.appendChild(divElement);
}
