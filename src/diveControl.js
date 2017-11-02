let currentNum = 0;
const diveAddress = [
    "http://dive.nutn.edu.tw:8080/Experiment/kaleTestExperiment4.jsp?eid=3122",
    "http://dive.nutn.edu.tw:8080/Experiment/kaleTestExperiment4.jsp?eid=3123",
    "http://dive.nutn.edu.tw:8080/Experiment/kaleTestExperiment4.jsp?eid=3220",
    "http://dive.nutn.edu.tw:8080/Experiment/kaleTestExperiment4.jsp?eid=3225",
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
