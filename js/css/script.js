/*
  REGOLE
  - Continua quello che hai iniziato stamani in classe.
  - Niente eventi (li vediamo domani): chiama le funzioni dalla console o all'avvio.
  - Solo const/let, mai var. Solo querySelector/querySelectorAll per il DOM.
*/
const lista = document.querySelector("#lista-task");
const contatore = document.querySelector("#contatore");
const input = document.querySelector("#nuovo-task");
const selectPriorita = document.querySelector("#priorita-select");
const bottone = document.querySelector("#bottone-aggiungi");

function formatData() {
  return new Date().toLocaleString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function aggiungiTask(testo, priorita = "media") {
  if (!testo.trim()) return;

  const li = document.createElement("li");
  li.classList.add("priorita-" + priorita);

  const nomeSpan = document.createElement("span");
  nomeSpan.className = "nome-task";
  nomeSpan.textContent = testo;

  const badge = document.createElement("span");
  badge.className = "badge badge-" + priorita;
  badge.textContent = priorita.toUpperCase();

  const dataSpan = document.createElement("span");
  dataSpan.className = "data";
  dataSpan.textContent = formatData();

  const btnElimina = document.createElement("button");
  btnElimina.className = "btn-elimina";
  btnElimina.textContent = "Elimina";

  li.appendChild(btnElimina);
  li.appendChild(dataSpan);
  li.appendChild(nomeSpan);
  li.appendChild(badge);
  lista.appendChild(li);
  aggiornaContatore();
}

function aggiornaContatore() {
  contatore.textContent = lista.querySelectorAll("li").length;
}

function evidenzia(indice) {
  const li = lista.querySelectorAll("li")[indice];
  if (li) li.classList.add("evidenziato");
}

function contaPerPriorita() {
  const items = lista.querySelectorAll("li");
  const risultato = { alta: 0, media: 0, bassa: 0 };
  items.forEach((li) => {
    if (li.classList.contains("priorita-alta")) risultato.alta++;
    else if (li.classList.contains("priorita-media")) risultato.media++;
    else if (li.classList.contains("priorita-bassa")) risultato.bassa++;
  });
  console.log(risultato);
  return risultato;
}

bottone.addEventListener("click", () => {
  aggiungiTask(input.value, selectPriorita.value);
  input.value = "";
  input.focus();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    aggiungiTask(input.value, selectPriorita.value);
    input.value = "";
  }
});

aggiungiTask("Pagare le bollette", "alta");
aggiungiTask("Studiare JavaScript", "media");
evidenzia(1);
aggiungiTask("Comprare il pane", "bassa");
aggiungiTask("Chiamare il dentista", "alta");
aggiungiTask("Riposarsi", "bassa");
/* SCRIVI QUI LE TUE FUNZIONI:
   1. Modifica aggiungiTask per accettare priorita
   2. Aggiungi bottone Elimina su ogni task
   6. evidenzia(indice) / togliEvidenza(indice)
   7. data automatica nel task
   8. contaPerPriorita()
*/
