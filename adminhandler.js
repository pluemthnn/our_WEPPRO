async function callUserWS(url, method, sentData = {}) {
  let data;
  if (method == "select") {
    let response = await fetch(url, {
      method: "GET",
    });
    data = await response.json();
  } else if (method == "selectall") {
    let response = await fetch(url, {
      method: "GET",
    });
    data = await response.json();
  } else if (method == "insert") {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(sentData),
    });
    data = await response.json();
  } else if (method == "update") {
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(sentData),
    });
    data = await response.json();
  } else if (method == "delete") {
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(sentData),
    });
    data = await response.json();
  }
  return data;
}

// -----------------------------------------------------

// let selectallBtnRef = document.querySelector("#selectall");
// selectallBtnRef.addEventListener("click", () => {
//     let output = document.getElementById("result");
//     let text = "";
//     callUserWS("http://localhost:3030/user_data/", "selectall").then(
//         (data) => {
//             if (data) {
//                 alert(data.message);
//                 for (const x of data.data) {
//                     let usr_name = x.Username;
//                     text += `User Name ${usr_name}`;
//                 }
//                 output.innerHTML = text;
//             }
//         }
//     );
// });

// User Part

let insertBtnRef = document.querySelector("#insert");
insertBtnRef.addEventListener("click", () => {
  let usr_name = document.getElementById("txtusername").value;
  let usr_pwd = document.getElementById("txtpwd").value;
  let usr_email = document.getElementById("txtemail").value;
  let usr_fname = document.getElementById("txtfname").value;
  let usr_lname = document.getElementById("txtlname").value;
  let usr_bd = document.getElementById("cldBD").value;
  let usr_phone = document.getElementById("txtphone").value;
  let usr_data = {
    Username: usr_name,
    User_pwd: usr_pwd,
    Email: usr_email,
    Fname: usr_fname,
    Lname: usr_lname,
    DOB: usr_bd,
    Phone: usr_phone,
    user_role: "1",
  };
  callUserWS(
    "http://localhost:3030/user-form-create/",
    "insert",
    usr_data
  ).then((data) => {
    console.log(data);
    alert("Insert Successfully");
  });
});

let updateBtnRef = document.querySelector("#update");
updateBtnRef.addEventListener("click", () => {
  let usr_name = document.getElementById("txtusername").value;
  let usr_pwd = document.getElementById("txtpwd").value;
  let usr_email = document.getElementById("txtemail").value;
  let usr_fname = document.getElementById("txtfname").value;
  let usr_lname = document.getElementById("txtlname").value;
  let usr_bd = document.getElementById("cldBD").value;
  let usr_phone = document.getElementById("txtphone").value;
  let usr_data = {
    Username: usr_name,
    User_pwd: usr_pwd,
    Email: usr_email,
    Fname: usr_fname,
    Lname: usr_lname,
    DOB: usr_bd,
    Phone: usr_phone,
    user_role: "1",
  };
  callUserWS(
    "http://localhost:3030/user-form-update/",
    "update",
    usr_data
  ).then((data) => {
    console.log(data);
    alert("Update Successfully");
  });
});

let deleteBtnRef = document.querySelector("#delete");
deleteBtnRef.addEventListener("click", () => {
  let usr_name = document.getElementById("txtusername").value;
  let usr_data = {
    Username: usr_name,
  };
  callUserWS(
    "http://localhost:3030/user-form-delete/",
    "delete",
    usr_data
  ).then((data) => {
    console.log(data);
    alert("Delete Successfully");
  });
});

function selectuser() {
  let usr_name = document.getElementById("txtusername").value;
  callUserWS("http://localhost:3030/user_data/" + usr_name, "select").then(
    (data) => {
      console.log(data.data);
      if (data.data != undefined) {
        alert("Username already exist");
      } else {
        alert("You can use this username");
      }
    }
  );
}

// Event Part
let insertBtnRef2 = document.querySelector("#insert2");
insertBtnRef2.addEventListener("click", () => {
  let evt_id = document.getElementById("txteventID").value;
  let evt_name = document.getElementById("txteventName").value;
  let evt_dt = document.getElementById("txteventDT").value;
  let evt_loc = document.getElementById("txtlocation").value;
  let evt_desc = document.getElementById("txtdesc").value;
  let evt_type = document.getElementById("Event_type").value;
  let evt_url = document.getElementById("imgURL").value;
  let evt_data = {
    EventID: evt_id,
    Eventname: evt_name,
    DATE_TIME: evt_dt,
    Location: evt_loc,
    Event_Description: evt_desc,
    Eventtype: evt_type,
    imgURL: evt_url,
  };
  callUserWS(
    "http://localhost:3030/event-form-create/",
    "insert",
    evt_data
  ).then((data) => {
    console.log(data);
    alert("Insert Successfully");
  });
});

let updateBtnRef2 = document.querySelector("#update2");
updateBtnRef2.addEventListener("click", () => {
  let evt_id = document.getElementById("txteventID").value;
  let evt_name = document.getElementById("txteventName").value;
  let evt_dt = document.getElementById("txteventDT").value;
  let evt_loc = document.getElementById("txtlocation").value;
  let evt_desc = document.getElementById("txtdesc").value;
  let evt_type = document.getElementById("Event_type").value;
  let evt_url = document.getElementById("imgURL").value;
  let evt_data = {
    EventID: evt_id,
    Eventname: evt_name,
    DATE_TIME: evt_dt,
    Location: evt_loc,
    Event_Description: evt_desc,
    Eventtype: evt_type,
    imgURL: evt_url,
  };
  callUserWS(
    "http://localhost:3030/event-form-update/",
    "update",
    evt_data
  ).then((data) => {
    console.log(data);
    alert("Update Successfully");
  });
});

let deleteBtnRef2 = document.querySelector("#delete2");
deleteBtnRef2.addEventListener("click", () => {
  let evt_id = document.getElementById("txteventID").value;
  let evt_data = {
    EventID: evt_id,
  };
  callUserWS(
    "http://localhost:3030/event-form-delete/",
    "delete",
    evt_data
  ).then((data) => {
    console.log(data);
    alert("Delete Successfully");
  });
});
