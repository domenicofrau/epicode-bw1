let quantita;
let punteggio = 0;
let livello = localStorage.getItem("livello");

switch (livello) {
  case "easy":
    quantita = 10
    break;
  case "medium":
    quantita = 15
    break;
  case "hard":
    quantita = 20
    break;
    
    default:
    quantita = 10
    livello = "easy"
    break;
}
console.log(livello)

let domande = [];
let titolo = document.getElementById("titolo_domanda");
let pulsante_1 = document.getElementById("risposta_1");
let pulsante_2 = document.getElementById("risposta_2");
let pulsante_3 = document.getElementById("risposta_3");
let pulsante_4 = document.getElementById("risposta_4");
let question = document.getElementById("question");
let corrette_utente = []
let errate_utente = []

fetch(
  `https://opentdb.com/api.php?amount=${quantita}&category=18&difficulty=${livello}`
)
  .then((response) => response.json())
  .then((domande) => {
    domande = domande.results;
    let i = 0;

    // AVVIA IL TIMER DI TOT SECONDI
    for (let y = 0; y <= domande.length; y++) {
      // console.log(domande.length)
      const runTimer = () => {
        window.setTimeout(() => {
          avvia_costruttore();
        }, y * 11000);
      };
      runTimer();

      function avvia_costruttore() {
        if (i < domande.length) {
          costruisci(domande[i]);
          question.innerHTML = `Question ${i + 1}/${domande.length}`;
          i++;
          timerG();

          console.log(i);
        } else {
          exit();
        }
      }
    }

    function controllaRisposte(risposta, domanda) {
      // window.clearTimeout(timerId)
      rimuovi();
      avvia_costruttore();
      // runTimer()
      if (risposta.innerHTML == domanda.correct_answer) {
        corrette_utente.push(risposta.innerHTML)
        punteggio++;
        console.log(punteggio);
      } else {
        errate_utente.push(risposta.innerHTML)
      }
    }

    function exit() {
      window.location.replace("results.html");
      localStorage.setItem("punteggio", punteggio);
      localStorage.setItem("domande", quantita);
      localStorage.setItem("corrette", corrette_utente);
      localStorage.setItem("errate", errate_utente);
    }

    function costruisci(elemento) {
      // Raccolto tutto il codice fatto finora in una funzione

      let risposte = [];

      // console.log(domanda); // DEBUG => Completo dell'oggetto della domanda

      // Sostituisce il testo dell'H1 con il titolo della domanda presa dal fetch
      titolo.innerHTML = elemento.question;

      // Aggiunge al vettore "risposte" la risposta corretta
      risposte.push(elemento.correct_answer);

      // Aggiunge al vettore "risposte" le risposte Errate
      for (const risposta of elemento.incorrect_answers) {
        risposte.push(risposta);
      }

      // Mescola tutti gli elementi del vettore
      shuffle(risposte);

      // Controlla il tipo di domanda se boleana o multipla
      elemento.type == "boolean"
        ? pulsanti_risposte(risposte, true)
        : pulsanti_risposte(risposte, false);

      pulsante_1.onclick = () => {
        controllaRisposte(pulsante_1, elemento);
      };
      pulsante_2.onclick = () => {
        controllaRisposte(pulsante_2, elemento);
      };
      pulsante_3.onclick = () => {
        controllaRisposte(pulsante_3, elemento);
      };
      pulsante_4.onclick = () => {
        controllaRisposte(pulsante_4, elemento);
      };
    }

    function pulsanti_risposte(risposte, is_boolean) {
      if (is_boolean) {
        pulsante_1.innerHTML = risposte[0];
        pulsante_2.innerHTML = risposte[1];
        pulsante_3.classList.add("nascondi");
        pulsante_4.classList.add("nascondi");
      } else {
        pulsante_1.innerHTML = risposte[0];
        pulsante_2.innerHTML = risposte[1];
        pulsante_3.innerHTML = risposte[2];
        pulsante_4.innerHTML = risposte[3];
        pulsante_3.classList.remove("nascondi");
        pulsante_4.classList.remove("nascondi");
      }
    }

    function shuffle(array) {
      for (let i = 0; i < array.length; i++) {
        let random = Math.floor(Math.random() * i);
        [array[i], array[random]] = [array[random], array[i]];
      }
      return array;
    }
  });
