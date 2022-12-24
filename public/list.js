sessionStorage.getItem("token") == null
  ? (window.location.href = "/") && sessionStorage.clear()
  : //immediately invoked function expression
    (() => {
      let userId = sessionStorage.getItem("userId");
      let token = sessionStorage.getItem("token");
      axios
        .get(`${baseURL}/api/list/${userId}`, {
          headers: {
            authorization: token,
          },
        })
        .then((res) => {
          const uniqueArray = res.data.filter(
            (v, i, a) => a.findIndex((v2) => v2.title === v.title) === i
          );
          console.log(uniqueArray);
          createList(uniqueArray);
        })
        .catch((err) => console.log(err));
    })();
