import Table from "./Table";

export default function Employee() {
  return (
    <Table title={"Employee List"} updatetable={true} deletable={false}></Table>
  );
}
