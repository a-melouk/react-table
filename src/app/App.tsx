import "./App.css";
// import records from "../data/employees.json";
import records from "../data/employees-copy.json";
import Table from "../components/Table-copy";

function App() {
  const dataSource = Array.from(records);

  const columns = [
    {
      title: "First Name",
      dataIndex: "First name",
      key: "First name",
    },
    {
      title: "Last Name",
      dataIndex: "Last name",
      key: "Last name",
    },
    {
      title: "Birth Date",
      dataIndex: "Birth date",
      key: "Birth date",
    },
    {
      title: "Street",
      dataIndex: "Street",
      key: "Street",
    },
    {
      title: "City",
      dataIndex: "City",
      key: "City",
    },
    {
      title: "State",
      dataIndex: "State",
      key: "State",
    },
    {
      title: "ZIP",
      dataIndex: "ZIP",
      key: "ZIP",
    },
    {
      title: "Department",
      dataIndex: "Department",
      key: "Department",
    },
    {
      title: "Start Date",
      dataIndex: "Start date",
      key: "Start date",
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
}

export default App;
