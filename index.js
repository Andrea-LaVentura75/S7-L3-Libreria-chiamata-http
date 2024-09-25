let libreria = [];

const arrayBooks = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("La risposta del servere non è ok");
      }
    })
    .then((books) => {
      books.forEach((book) => {
        libreria.push(book);
      });
      creazioneTabelle();
    })
    .catch((error) => {
      console.log(error);
    });
};
arrayBooks();

console.log(libreria);

let row = document.getElementById("row1");

const creazioneTabelle = function () {
  libreria.forEach((book) => {
    let colCard = document.createElement("div");
    colCard.classList.add("col", "col-12", "col-md-6", "col-lg-3");

    colCard.innerHTML = `
    <div class="card mt-3">
      <img height ="500"
        src=" ${book.img}"
        class="card-img-top  "
        alt="doggo picture"
      />
      <div class="card-body">
        <h4 class="card-title">${book.title}</h4>
        <p id=price class="card-text">
          ${book.price}
        </p>
         <p class="card-text">
          ${book.category}
        </p>
        <button class="btn btn-danger my-3 scarta">SCARTA</button>

        <button id="carrello" class="btn btn-info aggiungi">AGGIUNGI AL CARRELLO</button>
      </div>
`;

    row.appendChild(colCard);
  });
  buttonScarta();
};

const buttonScarta = function () {
  let btnScarta = document.querySelectorAll(".scarta");

  let btnAggiungi = document.querySelectorAll(".aggiungi");

  let colCard = document.querySelector(".col", ".col-12", ".col-md-6", ".col-lg-3");

  btnScarta.forEach((btn) => {
    btn.addEventListener("click", function () {
      let colCard = btn.closest(".col");
      colCard.classList.add("d-none");
    });
  });

  btnAggiungi.forEach((btn) => {
    btn.addEventListener("click", function () {
      let colCard = btn.closest(".col");
      let row2 = document.getElementById("row2");
      let bookTitle = colCard.querySelector(".card-title").innerText;
      let bookPrice = colCard.querySelector("#price").innerText;

      class Bookinfo {
        constructor(_title, _price) {
          this.title = _title;
          this.price = _price;
        }
      }

      let book = new Bookinfo(bookTitle, bookPrice);

      let savedBooks = JSON.parse(localStorage.getItem("bookShoop")) || [];

      savedBooks.push(book);

      localStorage.setItem("bookShoop", JSON.stringify(savedBooks));
      console.log(savedBooks);

      savedBooks.forEach((book) => {
        let colCard = document.createElement("div");
        colCard.classList.add("col", "col-12");
        colCard.innerHTML = `<h4 ">${book.title}-${book.price}$</h4>`;
        row2.appendChild(colCard);
      });
    });
  });
};
