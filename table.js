const root = document.getElementById("root");

function tableFunc(percent, title, star = 1) {
  let table = `<div class="table">
  <h2 class="title text-vertical">${title}</h2>
  `;
  let starList = "";

  for (let i = 1; i < 8; i++) {
    starList += `<li class="table__column__item">${i} 星</li>`;
  }

  percent.forEach((arr) => {
    table += `<ul class="table__column"><li class="table__column__item pt-2">${
      star === 8 ? "上限" : star + " 星"
    }</li>`;
    arr.forEach((item) => {
      table += `<li class="table__column__item">${
        item === -1
          ? "<span class='text-vertical'>最高就七星</span>"
          : item === 0
          ? "<span class='text-vertical'>最低就一星</span>"
          : item === 100/3
          ? '100%'
          : item + "%"
      }</li>`;
    });
    table += "</ul>";
    star++;
  });
  table += `
    <ul class="table__column">
      <li class="table__column__item pt-2">星級</li>
      ${starList}
    </ul>
  `;
  table += "</div>";
  return table;
}

const upgradeTable = tableFunc(upgradePercent, "升星機率", 2);
const keepTable = tableFunc(keepPercent, "保持機率");
const downgradeTable = tableFunc(downgradePercent, "降星機率");
const table = upgradeTable + keepTable + downgradeTable;

root.innerHTML = table;
