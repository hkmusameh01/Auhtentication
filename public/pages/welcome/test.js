fetch("/post")
  .then(data => {
    console.log(data.status);
    if(data.status === 200) {
      return data.json()
    } else {
      window.location = '/'
    }
  })
  .then((data) => console.log(data)) /// ----------------------
  .catch((err) => console.log(err));