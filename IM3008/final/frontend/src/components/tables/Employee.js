import Table from "./Table";

export default function Employee() {
  return (
    <Table title={"Employee List"} updatable={true} deletable={false}></Table>
  );
}
