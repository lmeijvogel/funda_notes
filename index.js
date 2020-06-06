const allResults = document.querySelectorAll(".search-result");

allResults.forEach(result => {
  result.querySelector("._additionalInfo")?.remove();

  const text = retrieveText(result);

  addInfoRow(result, text);
});

function getId(result) {
  return result.attributes.getNamedItem("data-global-id").value;
}

function retrieveText(result) {
  return window.localStorage.getItem(`house_info_${getId(result)}`);
}

function saveText(result, text) {
  window.localStorage.setItem(`house_info_${getId(result)}`, text);
}

function addInfoRow(result, text) {
  const divElement = document.createElement("div");
  divElement.id = `fda_info_${getId(result)}`;

  divElement.className = "_additionalInfo infoRow";

  const textContainer = document.createElement("div");
  textContainer.className = "_textContainer";

  const textElement = document.createElement("p");
  textElement.className = "infoText";
  textElement.innerText = text;
  textContainer.appendChild(textElement);
  divElement.appendChild(textContainer);

  const textArea = document.createElement("textarea");
  textArea.className = "infoTextarea hidden";
  textArea.value = text;
  textContainer.appendChild(textArea);
  divElement.appendChild(textContainer);

  const editButton = document.createElement("button");
  textElement.className = "editButton";

  if (text === null) {
    editButton.innerText = "Notitie toevoegen";
  } else {
    editButton.innerText = "Aanpassen";
  }

  editButton.onclick = (e) => {
    e.preventDefault();

    editInfo(result, textElement, textArea);
  };
  divElement.appendChild(editButton);

  result.appendChild(divElement);
}

function editInfo(result, textElement, textArea) {
  if (textArea.classList.contains("hidden")) {
    const text = textElement.innerText;
    textArea.value = text;

    textArea.classList.remove("hidden");
    textElement.classList.add("hidden");
  } else {
    const text = textArea.value;
    textElement.innerText = text;

    textArea.classList.add("hidden");
    textElement.classList.remove("hidden");

    saveText(result, text);
  }


}
