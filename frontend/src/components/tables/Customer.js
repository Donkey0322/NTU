import Table from "./Table";

export default function Customer() {
  return (
    <Table title={"Customer List"} updatable={false} deletable={false}></Table>
  );
}
