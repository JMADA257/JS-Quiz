// // VARIABLE DECLARATIONS
var list = document.querySelector("ol");

function grabScores() {
  var storedScores = JSON.parse(localStorage.getItem("hiScores"));

  if (storedScores === null) {
    return;
  }
  for (let i = 0; i < storedScores.length; i++) {
    storedScores.sort(descendingOrder);
    var initials = storedScores[i].initials;
    var score = storedScores[i].points;
    var li = document.createElement("li");
    li.textContent = initials + ": " + score;
    list.appendChild(li);
  }
}

function descendingOrder(a, b) {
  if (a.score < b.score) {
    return 1;
  }
  if (a.score > b.score) {
    return -1;
  }
  return 0;
}

grabScores();
