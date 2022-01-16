(function () {
  const tableRoot = document.getElementById("tableRoot");

  const UPGRADE = "升星機率";
  const KEEP = "保持機率";
  const DOWNGRADE = "降星機率";

  function tableFunc(percent, title, delay = 0, star = 1) {
    let table = `
      <div 
        class="col-12 col-xl-4 ani_fade_in mb-5" 
        style="animation: fade_in .8s .${delay}s forwards;">
        <div class="d-flex">
          <h3 class="fs-4 text-vertical mx-1">${title}</h3>
          <table>
            <tr>
    `;

    /* 材料 */
    table += `<tr><th></th><th colspan="6" class="text-center">${
      title === DOWNGRADE ? "降星分布" : "融合材料影響機率"
    }<th></tr><tr>`;
    const maxStar = title === KEEP ? 8 : 7;
    for (let i = 0; i < maxStar; i++) {
      i !== 0 ? (table += `<th class="fs-7 px-1">${i} 星</th>`) : (table += "<th></th>");
    }

    title === DOWNGRADE
      ? (table += "</tr><tr><th class='text-transparent'>0</th><td class='text-transparent'>0</td></tr>")
      : (table += "</tr>");

    percent.forEach((itemArr) => {
      star === 8
        ? ""
        : (table += `<tr style="color: #9f${(star * 2).toString(16)};"><th class="title">${
            title === UPGRADE
              ? "升 " + star + " 星"
              : title === KEEP
              ? star + " 星"
              : "融合失敗"
          }</th>`);
      itemArr.forEach((item) => {
        table += `${
          item === -1
            ? ""
            : item === 0
            ? ""
            : item === 100 / 3
            ? "<td>100<sub>%</sub></td>"
            : "<td>" + item + "<sub>%</sub></td>"
        }`;
      });
      table += "</tr>";
      star++;
    });
    table += "</table></div></div>";
    return table;
  }

  const upgradeTable = tableFunc(upgradePercent, UPGRADE, 0, 2);
  const keepTable = tableFunc(keepPercent, KEEP, 2);
  const downgradeTable = tableFunc(downgradePercent, DOWNGRADE, 4);
  const table = upgradeTable + keepTable + downgradeTable;

  tableRoot.innerHTML = table;
})();
