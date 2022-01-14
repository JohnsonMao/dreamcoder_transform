const tf = document.getElementById("tf");
const ans = document.getElementById("ans");

const tfArr = [1, 1, 1];

tf.addEventListener("change", (e) => {
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
  const newTfArr = tfArr.concat();
  newTfArr.sort((c, n) => n - c);
  const upgradeStar = newTfArr[0];

  const upgrade = sum(upgradePercent, upgradeStar, newTfArr);
  const keep =
    ((100 - upgrade) * sum(keepPercent, upgradeStar, newTfArr)) / 100;
  const downgrade = (100 - upgrade - keep) / 100;
  let downgradeText = "";

  const newDowngradePercent = downgradePercent[upgradeStar - 1]
    .concat()
    .reverse();
  newDowngradePercent.forEach((item, index) => {
    upgradeStar - 1 - index === 0
      ? null
      : (downgradeText += `
      <li class="text-danger">降為 ${
        upgradeStar - 1 - index
      } 星的機率為 ${fixNum(downgrade * item)} %</li>
    `);
  });

  ans.innerHTML = `
  <ul>
    ${
      upgradeStar + 1 > 7
        ? ''
        : `<li class="text-success">升級 ${
            upgradeStar + 1
          } 星的機率為 ${upgrade} %</li>`
    }
    <li>保持 ${upgradeStar} 星的機率為 ${fixNum(keep)} %</li>
    ${downgradeText}
  </ul>
  `;
});

ans.innerHTML = "請選擇融合星數";

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

function fixNum(num) {
  return Math.round(num * 100) / 100;
}
