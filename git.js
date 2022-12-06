const simpleGit = require("simple-git");
const git = simpleGit.default();
let args = process.argv;
async function a() {
  const branch = await git.branch();
  console.log(branch.current);
  if (branch.current == "main") {
    console.log(new Error('You are pushing on the branch "main"'));
    return;
  }
  switch (args[2]) {
    case "push":
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
      await git.checkout("main");
      await git.pull();
      await git.checkout(branch.current);
      await git.merge("main");
      break;
    case undefined:
      let error = new Error("Please enter a way.");
      console.log(error);
      break;
    default:
      console.log(new Error("Wrong Input."));
  }
}
a();
