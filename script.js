(() => {
  let saisie = "0";
  let premierNombre = null;
  let operateur = null;
  let nouvelleSaisie = false;
  let historique = "";

  const ecran = document.getElementById("resultat");
  const ecranHistorique = document.getElementById("historique");
  const symboles = { "+": "+", "-": "−", "*": "×", "/": "÷" };

  function formater(nombre) {
    return String(parseFloat(nombre.toPrecision(12))).replace(".", ",");
  }

  function calculer(a, b, op) {
    if (op === "+") return a + b;
    if (op === "-") return a - b;
    if (op === "*") return a * b;
    if (op === "/") return b === 0 ? null : a / b; // null = division par zéro
  }

  function afficher() {
    ecran.textContent = saisie.replace(".", ",");
    ecran.classList.toggle("erreur", saisie === "Erreur");
    ecranHistorique.textContent = historique;
  }

  function commencerSaisie() {
    if (nouvelleSaisie) {
      saisie = "0";
      nouvelleSaisie = false;
      if (operateur === null) historique = "";
    }
  }

  function ajouterChiffre(chiffre) {
    commencerSaisie();
    if (saisie.length >= 12) return;
    saisie = saisie === "0" ? chiffre : saisie + chiffre;
  }

  function ajouterVirgule() {
    commencerSaisie();
    if (!saisie.includes(".")) saisie += ".";
  }

  function retourArriere() {
    if (nouvelleSaisie) return;
    saisie = saisie.slice(0, -1);
    if (saisie === "" || saisie === "-") saisie = "0";
  }

  function effacer() {
    saisie = "0";
    premierNombre = null;
    operateur = null;
    nouvelleSaisie = false;
    historique = "";
  }

  function calculerResultat() {
    if (operateur === null || nouvelleSaisie) return;

    const deuxiemeNombre = parseFloat(saisie);
    const resultat = calculer(premierNombre, deuxiemeNombre, operateur);

    historique = `${formater(premierNombre)} ${symboles[operateur]} ${formater(deuxiemeNombre)} =`;
    saisie =
      resultat === null
        ? "Erreur"
        : String(parseFloat(resultat.toPrecision(12)));
    operateur = null;
    nouvelleSaisie = true;
  }

  function choisirOperateur(op) {
    if (saisie === "Erreur") return;
    calculerResultat();
    if (saisie === "Erreur") return;

    premierNombre = parseFloat(saisie);
    operateur = op;
    historique = `${formater(premierNombre)} ${symboles[op]}`;
    nouvelleSaisie = true;
  }

  document.querySelector(".touches").addEventListener("click", (e) => {
    const bouton = e.target.closest("button");
    if (!bouton) return;

    const { digit, operator, action } = bouton.dataset;

    if (digit) ajouterChiffre(digit);
    else if (operator) choisirOperateur(operator);
    else if (action === "decimal") ajouterVirgule();
    else if (action === "backspace") retourArriere();
    else if (action === "clear") effacer();
    else if (action === "equals") calculerResultat();

    afficher();
  });

  afficher();
})();
