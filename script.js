const displayScreen = document.querySelector(".display");
const keys = document.querySelectorAll(".cal_keys");
const calu = document.querySelector(".cal-body");
const button = document.querySelector(".button");
const body = document.querySelector("body");

for (let key of keys) {
  key.addEventListener("click", (e) => {
    let number = e.target;
    const action = number.dataset.action;
    const numberPad = number.textContent;
    const displayNum = displayScreen.innerText;
    if (!action) {
      if (displayNum === "0") {
        displayScreen.textContent = numberPad;
      } else {
        displayScreen.textContent += numberPad;
      }
    }
    if (action === "reset") {
      displayScreen.textContent = "0";
      calu.dataset.prevKey = "reset";
    }
    if (action === "del") {
      displayScreen.textContent = displayNum.slice(0, -1);
      if (displayNum === "") {
        displayScreen.textContent = "0";
      }
      calu.dataset.prevKey = "reset";
    }

    if (action === "decimal") {
      if (!displayNum.includes(".")) {
        displayScreen.textContent = displayNum + ".";
      } else if (prevKey === "operator") {
        displayScreen.textContent = "0.";
      }

      calu.dataset.prevKey = "decimal";
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "divide" ||
      action === "multiply"
    ) {
      calu.dataset.prevKey = "operator";
      calu.dataset.fristval = displayNum;
      calu.dataset.operator = action;
    }
    const prevKey = calu.dataset.prevKey;
    if (!action) {
      calu.dataset.prevKey = "number";
      if (displayNum === "0" || prevKey === "operator") {
        displayScreen.textContent = numberPad;
      } else {
        displayScreen.textContent = displayNum + numberPad;
      }
    }
    if (action === "equal") {
      const secondVal = displayNum;
      console.log(secondVal);
      const fristVal = calu.dataset.fristval;
      console.log(fristVal);
      const operator = calu.dataset.operator;
      console.log(operator);
      displayScreen.textContent = calculate(fristVal, operator, secondVal);
    }
  });
  const calculate = (n1, operator, n2) => {
    let result = "";
    if (operator === "add") {
      result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === "subtract") {
      result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === "multiply") {
      result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === "divide") {
      result = parseFloat(n1) / parseFloat(n2);
    }
    return result;
  };
}

// switch Themes
button.addEventListener("click", (e) => {
  if (e.target.value == 1) {
    body.classList.remove("theme2", "theme3");
  }
  if (e.target.value == 2) {
    body.classList.add("theme2");
    body.classList.remove("theme3");
  }
  if (e.target.value == 3) {
    body.classList.add("theme3");
    body.classList.remove("theme2");
  }
});
