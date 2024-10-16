class FileDownload {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
  downloadFile() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve(this);
        } else {
          reject("An error has occurred in file: " + this.name);
        }
      }, Math.random() * 5000);
    });
  }
}

function downloadFiles(files) {
  let downloadingFiles = [];
  let downloaded = false;
  files.forEach((file) => {
    downloadingFiles.push(file.downloadFile());
  });
  Promise.race(downloadingFiles)
    .then((data) => {
      console.log("the first file has been successfully", data);
    })
    .catch((data) => {
      console.log("the first file has had an error", data);
    });
  Promise.any(downloadingFiles).then((data) =>
    console.log("The first downloaded file was: ", data)
  );
  Promise.allSettled(downloadingFiles).then((data) => {
    console.log(data);
    downloaded = true;
  });
  let countTimer = 0;
  function timer() {
    setTimeout(() => {
      countTimer++;
      downloaded
        ? console.log(
            "The files have been downloaded in " + countTimer + " seconds"
          )
        : timer();
    }, 1000);
  }
  timer();
}

let file1 = new FileDownload("nombre1", 200);
let file2 = new FileDownload("nombre2", 300);
let file3 = new FileDownload("nombre3", 400);
let file4 = new FileDownload("nombre4", 500);
let file5 = new FileDownload("nombre5", 600);
let file6 = new FileDownload("nombre6", 700);
let file7 = new FileDownload("nombre7", 800);
let file8 = new FileDownload("nombre8", 900);
let file9 = new FileDownload("nombre9", 1000);
let file10 = new FileDownload("nombre10", 1100);

downloadFiles([
  file1,
  file2,
  file3,
  file4,
  file5,
  file6,
  file7,
  file8,
  file9,
  file10,
]);
