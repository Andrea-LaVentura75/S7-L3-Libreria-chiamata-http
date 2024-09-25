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
    <div class="card mt-3 card-class">
      <img 
        src=" ${book.img}"
        class="card-img-top w-100 card-img  "
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
      let bookTitle = colCard.querySelector(".card-title").innerText;
      let bookPrice = colCard.querySelector("#price").innerText;

      class Bookinfo {
        constructor(_title, _price) {
          this.title = _title;
          this.price = _price;
        }
      }

      let book = new Bookinfo(bookTitle, bookPrice);

      listaShop(book);
    });
  });
};

const listaShop = function (newBook) {
  let savedBooks = JSON.parse(localStorage.getItem("bookShoop")) || [];

  if (newBook) {
    savedBooks.push(newBook);
  }

  localStorage.setItem("bookShoop", JSON.stringify(savedBooks));

  let ul = document.getElementById("ul-shop");

  ul.innerHTML = "";

  savedBooks.forEach((book) => {
    let colCard = document.createElement("li");
    colCard.classList.add("dropdown-item");
    colCard.innerHTML = `<h5 class="cursor-pointer h5Shopp ">${book.title}-${book.price}$ <i  class="bi bi-trash text-danger cestino" ></i></h5>`;
    ul.appendChild(colCard);
  });

  let cestini = document.querySelectorAll(".cestino");

  cestini.forEach((cestino) => {
    cestino.addEventListener("click", function () {
      let index = this.getAttribute("data-index");

      savedBooks.splice(index, 1);

      localStorage.setItem("bookShoop", JSON.stringify(savedBooks));

      listaShop();
    });
  });
};
listaShop();
