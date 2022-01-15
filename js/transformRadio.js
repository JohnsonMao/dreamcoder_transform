(function () {
  const tfRoot = document.getElementById("tfRoot");

  function tfRadio(num) {
    let radioHTML = `
    <div class="">
      <p class="text-center mb-1">第 ${num} 隻</p>
      <div class="d-flex justify-content-center">
    `;

    function starSpans(starNum) {
      let starSpan = "";
      for (let i = 1; i < starNum + 1; i++) {
        starSpan += `<span class="star star_${i}"></span>`;
      }
      return starSpan;
    }

    for (let i = 1; i < 8; i++) {
      radioHTML += `
        <input 
          type="radio" 
          class="d-none tfRadio" 
          name="tf${num}" 
          id="tf${num}_${i}" 
          data-value="${i}" 
          ${i === 1 ? "checked" : ""}
        >
        <label 
          class="ball ball_${i} fw-bold text-center lh-lg rounded-circle mx-2" 
          for="tf${num}_${i}"
        >
          ${starSpans(i)}
        </label>
      `;
    }
    radioHTML += "</div></div>";

    return radioHTML;
  }

  tfRoot.innerHTML = tfRadio(1);
  tfRoot.innerHTML += '<i class="fas fa-plus m-2"></i>';
  tfRoot.innerHTML += tfRadio(2);
  tfRoot.innerHTML += '<i class="fas fa-plus m-2"></i>';
  tfRoot.innerHTML += tfRadio(3);
})();
