// chessboard
const button = document.querySelector('#button');
const size = 8;
let board = '';
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    if ((x + y) % 2 == 0) board += ' ';
    else board += '#';
  }
  board += '\n';
}
button.addEventListener('click', () => {
  console.log(board);
});

// form
const inpFile = document.querySelector('#inpFile');
const btnUpload = document.querySelector('#btnUpload');
const fileDisplay = document.querySelector('#fileDisplay');

let fileList = [];

inpFile.addEventListener('change', (i) => {
  for (i = 0; i < inpFile.files.length; i++) {
    fileList.push(inpFile.files[i]);
  }
  renderFileList();
});

renderFileList = (i) => {
  fileDisplay.innerHTML = [];
  fileList.forEach(function (file) {
    var fileDisplayEl = document.createElement('p');
    fileDisplayEl.innerHTML = file.name;
    fileDisplay.appendChild(fileDisplayEl);
    fileDisplayEl.addEventListener('click', () => {
      fileDisplay.removeChild(fileDisplayEl);
      let index = fileList.indexOf(file);
      fileList.splice(index, 1);
    });
  });
};

btnUpload.addEventListener('click', () => {
  const formData = new FormData();
  for (const file of fileList) {
    formData.append('myFiles', file);

    console.log(file);
    if (file != null || file != [] || file != '') {
      fetch('http://localhost:3000/upload', {
        method: 'post',
        body: formData,
      }).catch(console.error);
    }
  }
});
