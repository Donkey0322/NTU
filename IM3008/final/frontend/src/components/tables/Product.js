import Table from "./Table";

export default function Product() {
  return (
    <Table title={"Product List"} updatable={true} deletable={false}></Table>
  );
}
