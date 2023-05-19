import { useState, useEffect } from "react";
import Table, { HeadersType } from "./Table";
import { getAllUsers } from "../../services"
import { setUsers } from "../../store/reducers/userSlice"
import ViewRequest from "./ViewRequest";
import { useDispatch, useSelector } from "react-redux";

const headers: HeadersType[] = [
  {
    label: "First Name",
    key: "firstName",
  },
  {
    label: "Last Name",
    key: "lastName",
  },
  {
    label: "Email Address",
    key: "email",
  },
  
  {
    label: "Status",
    key: "status",
  },
  {
    label: "Action",
    key: "action",
  },
];


export default function Users() {
  const [view, setView] = useState<boolean>(false);

  const {users} = useSelector((state:any)=>state.user)
  const dispatch = useDispatch();

  const handleAction = (type: string) => {
    if (type === "verify") {
      setView(true);
    }
  };
  

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        
        dispatch(setUsers(res.data.data.data));
      })
      .catch((err) => console.log(err));
  },[])

  return (
    <div>
      {view ? (
        <ViewRequest setView={setView} />
      ) : (
        <div className="mt-10">
          <div className="font-bold text-xl mb-5">Users</div>
          <Table headers={headers} data={users} handleAction={handleAction} />
        </div>
      )}
    </div>
  );
}
