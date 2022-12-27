import Table from "./Table";

export default function Purchase() {
  return (
    <Table title={"Purchase History"} deletable={true} updatable={true}></Table>
  );
}
