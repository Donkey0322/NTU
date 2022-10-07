let currentDate = new Date();
let hour = "";
let period = "";
let minute = "";
let pinning = true;
let head = [];
let name_using = ["你"];
let name_left = [
  "Charlie",
  "Nelson",
  "Nellie",
  "Anonymous",
  "Ally",
  "Tara",
  "Darcy",
  "Aled",
  "Daniel",
  "Tao",
  "Elle",
  "Jimmy",
  "Lister",
  "Rowan",
];
let new_member_template = document
  .querySelector(".member_template")
  .cloneNode(true);

function member_observer() {
  let observer = new MutationObserver(function (mutations) {
    let num = Number(mutations[0].target.cloneNode(true).innerHTML);
    if (num > 1) {
      document.querySelector(".others").style.display = "flex";
      document.querySelector(".master_name").style.display = "flex";
    } else {
      document.querySelector(".others").style.display = "none";
      document.querySelector(".master_name").style.display = "none";
    }
    console.log("OB");
    if (pinning) {
      fit_in(num - 1);
    } else {
      fit_in(num);
    }
  });
  observer.observe(document.querySelector(".notify-bubble"), {
    characterData: true,
    childList: true,
    attributes: false,
  });
}
member_observer();

function initialize(initial = null) {
  let initial_member = initial;
  while (!initial_member) {
    initial_member = Number(prompt("請輸入起始使用者人數（1~15）"));
    if (isNaN(initial_member)) {
      alert("請輸入阿拉伯數字");
      initial_member = false;
    } else if (initial_member < 1) {
      alert("請輸入大於0的整數");
      initial_member = false;
    } else if (initial_member > 15) {
      alert("請輸入小於16的整數");
      initial_member = false;
    }
  }
  document.querySelector(".notify-bubble").innerHTML =
    Number(document.querySelector(".notify-bubble").innerHTML) + 1;
  for (let index = 0; index < initial_member - 1; index++) {
    add();
  }
}

// 調整版面
function fit_in(number) {
  console.log(pinning);
  let row = 0;
  let column = 0;
  if (pinning) {
    if (number == 3) {
      row = 3;
      column = 1;
    } else if (number < 3) {
      row = 2;
      column = 1;
    } else {
      if (number < 9) {
        column = 2;
      } else {
        column = 3;
      }
      row = Math.floor((number + column - 1) / column);
    }
  } else {
    if (number < 3) {
      row = 1;
      column = 2;
    } else {
      if (number < 9) {
        row = 2;
      } else {
        row = 3;
      }
      column = Math.floor((number + row - 1) / row);
    }
  }
  let width = 90 / column;
  let height = 90 / row;
  document.querySelectorAll(".member_background").forEach((n) => {
    n.style.width = `${width}%`;
    n.style.height = `${height}%`;
    n.style.maxWidth = `${1.5 * width}%`;
    n.style.flex = `1 1 ${width}%`;
  });
  let row_gap = 5 / (row - 1);
  let column_gap = 5 / (column - 1);
  document.querySelector(".others").style.gap = `${row_gap}% ${column_gap}%`;
}

// animation = null
function animation(target, way) {
  function animation_stop() {
    this.style.animation = "null";
    this.removeEventListener("animationend", animation_stop);
  }
  target.style.animation = `${way} 0.5s`;
  target.addEventListener("animationend", animation_stop);
}

function swap() {
  let to_pin = this;
  let to_pin_head = to_pin.querySelector("img.other_head").getAttribute("src");
  let to_pin_name = to_pin.querySelector(".other_name").innerHTML;
  let talker = document.querySelector(".master");
  let talker_head = talker.querySelector("img.master_head").getAttribute("src");
  let talker_name = talker.querySelector(".master_name .font").innerHTML;
  talker.querySelector("img.master_head").setAttribute("src", to_pin_head);
  talker.querySelector(".master_name .font").innerHTML = to_pin_name;
  if (to_pin_name.includes("你")) {
    talker.querySelector(".close").classList.add("self");
  } else {
    talker.querySelector(".close").classList.remove("self");
  }
  if (pinning) {
    to_pin.querySelector("img.other_head").setAttribute("src", talker_head);
    to_pin.querySelector(".other_name").innerHTML = talker_name;
    if (talker_name.includes("你")) {
      to_pin.querySelector(".close").classList.add("self");
    } else {
      to_pin.querySelector(".close").classList.remove("self");
    }
    this.removeEventListener("animationend", swap);
  } else {
    pinning = true;
    to_pin.addEventListener("animationend", () => {
      to_pin.remove();
      document.querySelector(".master").style.display = "flex";
      document.querySelector(".others").style.width = "30%";
      fit_in(Number(document.querySelector(".notify-bubble").innerHTML) - 1);
    });
  }
}

//選取名字
function name_moving(name) {
  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele != value;
    });
  }
  if (name_using.includes(name)) {
    name_using = arrayRemove(name_using, name);
    name_left.push(name);
  } else {
    name_left = arrayRemove(name_left, name);
    name_using.push(name);
  }
}

// time setting
function now() {
  if (currentDate.getHours() < 5 && currentDate.getHours() >= 0) {
    period = "凌晨";
    if (currentDate.getHours() == 0) {
      hour = "12";
    } else {
      hour = String(currentDate.getHours());
    }
  } else if (currentDate.getHours() >= 5 && currentDate.getHours() <= 12) {
    if (currentDate.getHours() == 12) {
      period = "中午";
    } else {
      period = "早上";
    }
    hour = String(currentDate.getHours());
  } else if (currentDate.getHours() > 12 && currentDate.getHours() < 18) {
    period = "下午";
    hour = String(currentDate.getHours() - 12);
  } else {
    period = "晚上";
    hour = String(currentDate.getHours() - 12);
  }
  if (hour.length == 1) {
    hour = "0" + hour;
  }
  minute = String(currentDate.getMinutes());
  if (minute.length == 1) {
    minute = "0" + minute;
  }
  let time = period + " " + hour + ":" + minute;
  document.querySelector(".tool .time").innerHTML = time + " | Web Programming";
}
now();

// close listener
function close(n, pin_close = false) {
  if (n.parentElement.classList.contains("member_background")) {
    n.addEventListener("click", (e) => {
      n.parentElement.style.animation = "scaleDown 0.5s";
      n.parentElement.addEventListener("animationend", () => {
        n.parentElement.remove();
        let member_number = document.querySelector(".notify-bubble");
        member_number.innerHTML = Number(member_number.innerHTML) - 1;
        name_moving(n.parentElement.querySelector(".other_name").innerHTML);
      });
    });
  } else {
    function closing_master() {
      if (pinning == false) {
        if (pin_close == false) {
          let member_number = document.querySelector(".notify-bubble");
          member_number.innerHTML = Number(member_number.innerHTML) - 1;
          name_moving(document.querySelector(".master_name .font").innerHTML);
        } else {
          pinning = true;
          fit_in(Number(document.querySelector(".notify-bubble").innerHTML));
          pinning = false;
        }
      }
      document
        .querySelector(".master")
        .removeEventListener("animationstart", closing_master);
    }
    function hiding_master() {
      let nn = Number(document.querySelector(".notify-bubble").innerHTML);
      fit_in(nn);
      if (pinning == false) {
        if (nn != 1) {
          document.querySelector(".master").style.display = "none";
          document.querySelector(".others").style.width = "90%";
        } else {
          pinning = true;
          let n = document.querySelectorAll(".others .head_hover");
          n = n[n.length - 1];
          let to_pin = n.parentElement;
          let talker = document.querySelector(".master");
          swap.call(to_pin);
          animation(talker.querySelector("img.master_head"), "scaleUp");
          name_moving(
            document.querySelector(".member_background .other_name").innerHTML
          );
          to_pin.remove();
        }
      }
      document
        .querySelector(".master")
        .removeEventListener("animationend", hiding_master);
    }
    n.addEventListener("click", (e) => {
      pinning = false;
      animation(document.querySelector(".master"), "scaleDown");
      document
        .querySelector(".master")
        .addEventListener("animationstart", closing_master);
      document
        .querySelector(".master")
        .addEventListener("animationend", hiding_master);
    });
  }
}

// pin listener
function pin(n) {
  n.addEventListener("click", (e) => {
    n.parentElement.addEventListener("animationstart", swap);
    let to_pin = n.parentElement;
    let talker = document.querySelector(".master");
    if (pinning) {
      animation(to_pin, "scaleUp");
    } else {
      animation(to_pin, "scaleDown");
    }
    animation(talker.querySelector("img.master_head"), "scaleUp");
    n.parentElement.removeEventListener("animationend", swap);
  });
}
function add(talker = false) {
  let new_member = new_member_template.cloneNode(true);
  new_member.classList.add("member_background");
  new_member.style.display = "flex";
  let new_member_head = new_member.querySelector("img.other_head");
  let new_member_name = new_member.querySelector(".other_name");
  if (talker == false) {
    let member_number = document.querySelector(".notify-bubble");
    member_number.innerHTML = Number(member_number.innerHTML) + 1;
    let append_name = name_left[Math.floor(Math.random() * name_left.length)];
    new_member_name.innerHTML = append_name;
    new_member_head.setAttribute("src", `./Image/Head/${append_name}.jpg`);
    name_moving(append_name);
  } else {
    new_member_head.setAttribute(
      "src",
      `${talker.querySelector("img.master_head").getAttribute("src")}`
    );
    new_member_name.innerHTML =
      talker.querySelector(".master_name .font").innerHTML;
    if (new_member_name.innerHTML.includes("你")) {
      new_member.querySelector(".close").classList.add("self");
    } else {
      new_member.querySelector(".close").classList.remove("self");
    }
  }
  document.querySelector(".others").appendChild(new_member);
  close(new_member.querySelector(".close"));
  pin(new_member.querySelector(".head_hover"));
  animation(new_member, "scaleUp");
}

// 叉叉
close(document.querySelector(".master .icon_background.red.close"));

// 釘選
let member_pin = document.querySelectorAll(".member_background .head_hover");
member_pin.forEach(pin);
let talker_pin = document.querySelector(".master .head_hover");
talker_pin.addEventListener("click", (e) => {
  add(talker_pin.parentElement.parentElement);
});
close(talker_pin, true);

let plus = document.querySelector(".blue");
plus.addEventListener("click", (e) => {
  if (Number(document.querySelector(".notify-bubble").innerHTML) == 15) {
    alert("已超過人數上限!!");
  } else {
    add();
  }
});

initialize();
