import axios from 'axios';
import { useEffect, useState } from 'react';
//Do I need to import the store, or a slice or something?
import useStore from '../../zustand/store';

//this component is meant to take in the userList from the server, and make the
//table that shows the first and last name of the user

function UserList() {
    let [userList, setUserList] = useState([]);

    // On Load, fetch user data from the server
    //useEffect below is only necessary after I implement a button

    useEffect(() => {
        console.log('in useEffect')
       // getStudents();
       getUserList();
    }, []);
    console.log (userList);

    const getUserList = () => {
        axios({
            method: 'GET',
            url: '/api/user/all'
        }).then((response) => {
            setUserList(response.data);
        }).catch((err)=>{
            console.log(err);
        });
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>UserNames</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map(user => (
                        <tr key={user.id}>
                            <td>
                                {user.first_name}
                            </td>
                            <td>
                                {user.last_name}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
}


export default UserList;