(function () {
  const tfRoot = document.getElementById("tfRoot");
  const ansRoot = document.getElementById("ansRoot");
  /* 預設 */
  const tfArr = [1, 1, 1];
  ansRoot.innerHTML = "請選擇融合星數";

  /* 監聽選取 */
  tfRoot.addEventListener("change", (e) => {
    const { name, dataset } = e.target;
    switch (name) {
      case "tf1":
        tfArr[0] = +dataset.value;
        break;
      case "tf2":
        tfArr[1] = +dataset.value;
        break;
      case "tf3":
        tfArr[2] = +dataset.value;
        break;
      default:
    }
    /* 重新排列選取最大的星數當基底 */
    const newTfArr = tfArr.concat();
    newTfArr.sort((c, n) => n - c);
    const upgradeStar = newTfArr[0];

    /* upgrade 升星機率 keep 保持機率 downgrade 降星機率 */
    const upgrade = sum(upgradePercent, upgradeStar, newTfArr);
    const keep =
      ((100 - upgrade) * sum(keepPercent, upgradeStar, newTfArr)) / 100;
    const downgrade = (100 - upgrade - keep) / 100;


    let downgradeHTML = "";
    const newDowngradePercent = downgradePercent[upgradeStar - 2]?.concat().reverse();

    /* 降星分布機率 */
    newDowngradePercent?.forEach((item, index) => {
      upgradeStar - 1 - index === 0
      ? null
      : (downgradeHTML += `
      <li 
        class="ani_fade_in" 
        style="
          animation: fade_in .8s .${index + 2}s forwards; 
          color: #f${7 - index}0;
        " 
      >
        降為 ${upgradeStar - 1 - index} 星的機率為 ${fixNum(downgrade * item)} %
      </li>
    `);
    });

    /* 即時渲染 */
    ansRoot.innerHTML = `
      <p>選擇 ${tfArr[0]} 星、${tfArr[1]} 星、${tfArr[2]} 星，進行融合</p>
      <ul>
        ${
          upgradeStar + 1 > 7
            ? ""
            : `<li 
                  class="ani_fade_in" 
                  style="
                    animation: fade_in .8s forwards;
                    color: #bf0;
                  "
                >
                升級 ${upgradeStar + 1} 星的機率為 ${upgrade} %
              </li>`
        }
        <li class="ani_fade_in" style="animation: fade_in .8s .1s forwards;">
          保持 ${upgradeStar} 星的機率為 ${fixNum(keep)} %
        </li>
        ${downgradeHTML}
      </ul>
    `;
  });

  /* 機率累加函式 */
  function sum(percent, upgradeStar, newTfArr, amount = 3) {
    let num = 0;
    switch (percent[upgradeStar - 1][0]) {
      case -1:
        break;
      case 0:
        break;
      default:
        for (let i = 0; i < amount; i++) {
          num += +percent[upgradeStar - 1][newTfArr[i] - 1];
        }
    }
    return num;
  }
})();
