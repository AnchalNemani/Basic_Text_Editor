let optionsButtons = document.querySelectorAll(".option-button");
let advanceOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

//list of fontlist
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

//Initial Settings
const initializer = () => {
  //function call for highlighting buttons
  //no highlights for link, unlink, lists ,undo,redo
  // since they are one time operations
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  //crreate option for font names
  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  //fontSize allows only till 7
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  //default size
  fontSizeRef.value = 3;
};

//main logic
const modifyTest = (command, defaultUi, value) => {
  //execCommand executes command on selected text
  document.execCommand(command, defaultUi, value);
};

//For basic operation which don't need value parameter
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyTest(button.id, false, null);
  });
});

//options that require value parameter (e.g colors, fonts)
advanceOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyTest(button.id, false, button.value);
  });
});

//Highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      //needsRemoval = true means only one button should be highlight and other would be normal
      if (needsRemoval) {
        let alreadyActive = false;

        //if currently clicked button is already active
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }

        //Remove highlight from another button
        highlightRemover(className);
        if (!alreadyActive) {
          //highlight clicked button
          button.classList.add("active");
        }
      } else {
        //if other button can be highlighted
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

window.onload = initializer();

// Save the text content to localStorage whenever there are changes
writingArea.addEventListener("input", () => {
  saveDataToLocalStorage();
});

const saveDataToLocalStorage = () => {
  const textContent = writingArea.innerHTML;
  localStorage.setItem("editorContent", textContent);
};

// Load the text content from localStorage when the page loads
window.onload = () => {
  loadDataFromLocalStorage();
};

const loadDataFromLocalStorage = () => {
  const savedContent = localStorage.getItem("editorContent");
  if (savedContent) {
    writingArea.innerHTML = savedContent;
  }
};
