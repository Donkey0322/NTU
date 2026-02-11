import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

const LogIn = ({ me, setName, onLogin }) => {
  return (
    <Input.Search
      size="large"
      style={{ width: 300, margin: 50, height: 40 }}
      prefix={<UserOutlined />}
      placeholder="Enter your name"
      value={me}
      onChange={(e) => setName(e.target.value)}
      enterButton="Start Game"
      onSearch={(name) => onLogin(name)}
      loading={!me}
    />
  );
};

export default LogIn;
