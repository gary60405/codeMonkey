let currentNum = 0;
const diveAddress = [
    "http://120.114.170.2:8080/Experiment/kaleTestExperiment5.jsp?eid=3154",
];
function addCurrentNum() {
    if (isMax()) {
        currentNum += 1;
        document.getElementById("iframe").src = diveAddress[currentNum];
    }
}
function subCurrentNum() {
    if (currentNum > 0) {
        currentNum -= 1;
        document.getElementById("iframe").src = diveAddress[currentNum];
    }
}

function isMax() {
  return currentNum !== diveAddress.length - 1;
}

function isMin() {
  return currentNum === 0;
}
