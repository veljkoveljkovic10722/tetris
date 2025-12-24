function prikaziNajboljeRezultate() {
    let rezultati = JSON.parse(localStorage.getItem('rezultati')) || [];
    let rezultatiDiv = document.getElementById('najbolji-rezultati');
    rezultatiDiv.innerHTML = ''; // Resetuj prethodni sadržaj

    // Kreiranje tabele
    let tabela = document.createElement('table');
    tabela.classList.add('rezultati-table'); // Dodavanje CSS klase za stilizaciju

    // Kreiranje zaglavlja tabele
    let zaglavlje = tabela.createTHead();
    let zaglavljeRed = zaglavlje.insertRow();
    let zaglavljeCelijaRednogBroja = zaglavljeRed.insertCell();
    let zaglavljeCelijaImena = zaglavljeRed.insertCell();
    let zaglavljeCelijaRezultata = zaglavljeRed.insertCell();
    zaglavljeCelijaRednogBroja.textContent = 'No.';
    zaglavljeCelijaImena.textContent = 'Name';
    zaglavljeCelijaRezultata.textContent = 'Score';

    // Kreiranje tela tabele
    let telo = tabela.createTBody();

   

    // Dodaj ostale najbolje rezultate
    rezultati.forEach((rezultat, index) => {
        let red = telo.insertRow();
        let redniBrojCelija = red.insertCell();
        let imeCelija = red.insertCell();
        let rezultatCelija = red.insertCell();
        redniBrojCelija.textContent = index + 1;
        imeCelija.textContent = rezultat.ime;
        rezultatCelija.textContent = rezultat.rezultat;
    });

     // Dodaj red za poslednji rezultat iz poslednje igre ako postoji
     let poslednjiRezultat = JSON.parse(localStorage.getItem('poslednjiRezultat'));
     if (poslednjiRezultat) {
         let poslednjiRezultatRed = telo.insertRow();
         let poslednjiRezultatRedniBrojCelija = poslednjiRezultatRed.insertCell();
         let poslednjiRezultatImeCelija = poslednjiRezultatRed.insertCell();
         let poslednjiRezultatRezultatCelija = poslednjiRezultatRed.insertCell();
         poslednjiRezultatRedniBrojCelija.textContent = 'Last Game';
         poslednjiRezultatImeCelija.textContent = poslednjiRezultat.ime;
         poslednjiRezultatRezultatCelija.textContent = poslednjiRezultat.rezultat;
     }
     
    // Dodavanje tabele na div
    rezultatiDiv.appendChild(tabela);
}

window.addEventListener('load', prikaziNajboljeRezultate);

document.addEventListener("DOMContentLoaded", function() {
    let menuBtn = document.getElementById('menuBtnS');

    menuBtn.addEventListener('click', function() {
        window.location.href = 'tetris-uputstvo.html';
    });
});