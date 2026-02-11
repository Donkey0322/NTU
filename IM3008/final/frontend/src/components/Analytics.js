// import { useQuery } from "@apollo/client";

// import { GET_ITEMS_QUERY } from "../graphql/queries";

import Balance from "./Balance";
import Category from "./Category";

function Analytics() {
  //   const { data } = useQuery(GET_ITEMS_QUERY);
  let data;
  const items = data ? data.items : [];
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-6">{items && <Balance items={items} />}</div>
      <div className="col-span-6">{items && <Category items={items} />}</div>
    </div>
  );
}

export default Analytics;
