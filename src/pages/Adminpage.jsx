import React, { useEffect, useState } from 'react';
import Admindash from '../components/Admindash';
import { allmessage, allrecipe, alluser } from '../services/allapi';
import Adminside from '../components/Adminside';

function AdminPage() {
  const [userdetails, setuserdetails] = useState({});
  const [allrecipes, setAllrecipes] = useState([]);
  const [searchkey, setSearchkey] = useState("");
  const [users, setUsers] = useState([]);

  const getalluserss = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqheader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const result = await alluser(reqheader);
      console.log(result.data);
      if (result.status === 200) {
        setUsers(result.data);
console.log(users);
      }
    }
  };

  const getallrecipe = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqheader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      const result = await allrecipe(searchkey, reqheader);
      console.log(result.data);
      if (result.status === 200) {
        setAllrecipes(result.data);
      }
    }
  };

  useEffect(() => {
    getallrecipe();
    getalluserss()
  }, [searchkey]);
  //
//all mesg
  const [getmesg, setgetmesg] = useState({});

  const getallmessage = async () => {

    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqheader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      const result = await allmessage(reqheader);
      console.log(result.data);
      if (result.status === 200) {
        setgetmesg(result.data);
        console.log(getmesg);
      }
    }
  };
//


  useEffect(() => {
    setuserdetails(JSON.parse(sessionStorage.getItem("existinguser")));
    getallmessage();
  }, []);
  return (
   <>
       <Adminside/>
     <Admindash recipes={allrecipes} allmesg={getmesg} users={users}/>
  
   </>
  );
}

export default AdminPage;
