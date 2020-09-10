// chessboard
const button = document.querySelector('#button');

button.addEventListener('click', () => {
  console.log(
    new Array(65)
      .join()
      .split('')
      .map((x, i) => {
        return (
          (((i / 8) >> 0) % 2 ? (i % 2 ? ' ' : '#') : i % 2 ? '#' : ' ') +
          ((i + 1) % 8 ? '' : '\n')
        );
      })
      .join('')
  );
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

renderFileList = (_i) => {
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
    if (file)
      if (file != null || file != [] || file != '') {
        fetch('http://localhost:3000/upload', {
          method: 'post',
          body: formData,
        })
          .then(() => {
            console.log('файли відправлені успішно');
          })
          .catch(console.error);
      }
  }
});
