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
