document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("content").style.display = "none";
  document.getElementById("spinner-loading").style.display = "none";
});

function loadData() {
  document.getElementById("spinner-loading").style.display = "flex";
  document.getElementById("content").style.display = "none";

  fetch(
    "https://raw.githubusercontent.com/penggguna/QuranJSON/master/quran.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const searchSurah = document
        .getElementById("searchSurah")
        .value.trim()
        .toLowerCase();
      const filteredSurah = data.filter((el) => {
        return (
          el.name.toLowerCase().includes(searchSurah) ||
          el.name.toString().includes(searchSurah)
        );
      });
      let output = "";
      if (filteredSurah.length === 0) {
        output += `<p>Data surah tidak ditemukan</p>`;
      } else {
        filteredSurah.forEach((el) => {
          output += `<article class="surah_item">
                        <h3>${el.number_of_surah}. ${el.name} ${el.name_translations.ar}</h3>
                        <p>Arti Judul : ${el.name_translations.id}</p>
                        <p>Tipe Surat : ${el.type}</p>
                        <button class="read-translation" data-surah="${el.number_of_surah}">Baca</button>
                        <div id="translation-${el.number_of_surah}" class="translation-wrapper"></div>
                    </article>`;
        });
      }

      document.querySelector(".list-surah").innerHTML = output;

      // Button read and toggle (baca/tutup)
      const readTranslation = document.querySelectorAll(".read-translation");

      readTranslation.forEach((button) => {
        button.addEventListener("click", function () {
          const numberSurah = button.getAttribute("data-surah");
          const translation = document.getElementById(
            `translation-${numberSurah}`
          );

          if (button.textContent === "Baca") {
            // Disable all other buttons
            readTranslation.forEach((btn) => {
              btn.disabled = true;
              btn.style.cursor = "auto";
            });
            button.disabled = false;
            button.textContent = "Tutup";
            button.style.cursor = "pointer";

            fetch(
              `https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/${numberSurah}.json`
            )
              .then((response) => response.json())
              .then((data) => {
                data.verses.forEach((el) => {
                  const verseElement = document.createElement("p");
                  verseElement.innerText = `${el.number}. ${el.translation_id}`;
                  const surahtext = document.createElement("p");
                  surahtext.innerText = `${el.text}`;

                  translation.style.display = "block";
                  translation.appendChild(surahtext);
                  translation.appendChild(verseElement);
                });
              });
          } else {
            button.textContent = "Baca";
            translation.style.display = "none";
            translation.innerHTML = ""; 

            // Enable all other buttons
            readTranslation.forEach((btn) => {
              btn.disabled = false;
              btn.style.cursor = "pointer";
            });
          }
        });
      });

      // Spinner and show content
      setTimeout(() => {
        document.getElementById("spinner-loading").style.display = "none";
        document.getElementById("content").style.display = "flex";
        document.getElementById("content").style.flexDirection = "column";
      }, 800);
    });
}

document.getElementById("searchSurah").addEventListener("input", loadData);
