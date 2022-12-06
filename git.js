const simpleGit = require("simple-git");
const git = simpleGit.default();
let args = process.argv;
async function a() {
  const branch = await git.branch();
  console.log(branch.current);

  switch (args[2]) {
    case "push":
      if (branch.current == "main") {
        console.log(new Error('You are pushing on the branch "main"'));
        return;
      }
      if (!args[3]) {
        console.log(new Error("Enter your commit message"));
        return;
      }
      console.log("pushing...");
      let status = await git.status();
      console.log(status);
      await git.add(".");
      status = await git.status();
      console.log(status);
      await git.commit([args[3], "-m"]);
      await git.push();
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
}

// logs "test-branch"
a();
