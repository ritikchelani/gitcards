export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

];

const url = "http://localhost:5000/users";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const userRows = await response.json();
        console.log('mydata',userRows);

        return userRows;
      } catch (error) {
        console.log("error", error);
      }
    };

    
//temporary data
export const userRows = fetchData();