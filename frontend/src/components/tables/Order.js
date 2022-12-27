import Table from "./Table";

export default function Order() {
  return (
    <Table title={"Order List"} updatable={true} deletable={false}></Table>
  );
}
