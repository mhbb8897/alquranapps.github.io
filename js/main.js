function loadData() {
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
      let no = 1;
      if (filteredSurah.length === 0) {
        output += `<p>Data surah tidak ditemukan</p>`;
      } else {
        filteredSurah.forEach((el) => {
          output += `<article class="surah_item">
          <h3>${el.number_of_surah}. ${el.name} ${el.name_translations.ar}</h3>
          <p>Arti Judul : ${el.name_translations.id}</p>
          <p>Tipe Surat : ${el.type}</p>
          <button class="read-translation" data-surah="${el.number_of_surah}">Baca</button>
          <button class="close-translation">Tutup</button>
      <div id="translation-${el.number_of_surah}" class="translation-wrapper"></div>
          
          </article>
      `;
        });
      }

      document.querySelector(".list-surah").innerHTML = output;

      document.querySelectorAll(".read-translation").forEach((button) => {
        button.addEventListener("click", function () {
          // button.disabled = true;
          button.style.cursor = "auto";
          const numberSurah = button.getAttribute("data-surah");
          const translation = document.getElementById(
            `translation-${numberSurah}`
          );
          const surahButton = document.querySelector(
            `.read-translation[data-surah="${numberSurah}"]`
          );
          surahButton.disabled = false;
          button.disabled = true;
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

                // closeButton.disabled = false;
              });
            });
        });
      });
      document.querySelectorAll(".close-translation").forEach((buttonClose) => {
        buttonClose.addEventListener("click", function () {
          const numberSurah =
            buttonClose.previousElementSibling.getAttribute("data-surah");
          const translation = document.getElementById(
            `translation-${numberSurah}`
          );

          // Menyembunyikan blok terjemahan
          translation.style.display = "none";
          // Mengaktifkan kembali tombol "Baca Terjemah" yang sesuai
          const surahButton = document.querySelector(
            `.read-translation[data-surah="${numberSurah}"]`
          );
          surahButton.disabled = false;
          surahButton.style.cursor = "pointer";
          // Menonaktifkan tombol "Tutup"
        });
      });
    });
}
document.getElementById("searchSurah").addEventListener("input", loadData);

// Kode Lama 2
// const surahItem = document.createElement("article");
// surahItem.classList.add("surah_item");
// const surahTitle = document.createElement("h3");
// surahTitle.innerText =
//   el.number_of_surah + ". " + el.name + ". " + el.name_translations.ar;
// const definitionTitle = document.createElement("p");
// definitionTitle.innerText = "Arti Judul : " + el.name_translations.id;
// const surahType = document.createElement("p");
// surahType.innerText = "Tipe Surat : " + el.type;
// const toggleButton = document.createElement("button");
// toggleButton.classList.add("read_translation");
// toggleButton.innerText = "Baca Terjemah";
// surahItem.appendChild(surahTitle);
// surahItem.appendChild(definitionTitle);
// surahItem.appendChild(surahType);
// surahItem.appendChild(toggleButton);
// Kode Lama 1

// readTranslation.forEach((button) => {
//   button.addEventListener("click", function () {
//     fetch(
//       `https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/1.json`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         const translationButton = data.verses;
//         let output2 = "";

//         translationButton.forEach((data) => {
//           const surahItem2 = document.createElement("article");
//           surahItem2.classList.add("surah_wrapper");
//           const defTitle = document.createElement("p");
//           defTitle.innerText = "Arti Judul : " + data.translation_id;
//           surahItem2.appendChild(defTitle);
//           console.log(data);
//           output2 += surahItem2.outerHTML;
//         });
//         document.querySelectorAll(".translation").innerHTML = output2;
//       });
//   });

// fetch("https://raw.githubusercontent.com/penggguna/QuranJSON/master/quran.json")
//   .then((response) => response.json())
//   .then((data) => console.log(data[0].name));
