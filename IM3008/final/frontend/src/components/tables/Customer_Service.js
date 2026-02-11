import Table from "./Table";

export default function Customer_Service() {
  return (
    <Table
      title={"Customer Service List"}
      deletable={false}
      updatable={false}
    ></Table>
  );
}
