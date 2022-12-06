const { exec } = require("child_process");
let args = process.argv;
// console.log(args);
// return;

switch (args[2]) {
  case "push":
    let currentDate = new Date();
    let date =
      String(currentDate.getMonth()) + "/" + String(currentDate.getDate());
    console.log("pushing...");
    console.log(date);
    exec("git add .", (err) => {
      if (err) {
        console.log(err);
        return;
      }
      exec(`git commit -m "${date}"`, (err) => {
        if (err) {
          console.log(err);
          return;
        }
        //it worked
        exec("git push", (err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("done");
        });
      });
    });
    break;
  case "pull":
    console.log("pulling...");
    args.splice(0, 3);
    if (!args.length) {
      let error = new Error("Please enter your branch.");
      console.log(error);
    } else {
      let branch = args.join(" ");
      exec("git checkout main .", (err) => {
        if (err) {
          console.log(err);
          return;
        }
        exec("git pull", (err) => {
          if (err) {
            console.log(err);
            return;
          }
          exec(`git checkout ${branch}`, (err) => {
            if (err) {
              console.log(err);
              return;
            }
            exec("git merge main", (err) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log("done");
            });
          });
        });
      });
    }
    break;
  case undefined:
    let error = new Error("Please enter a way.");
    console.log(error);
    break;
  default:
    console.log(new Error("Wrong Input."));
}
