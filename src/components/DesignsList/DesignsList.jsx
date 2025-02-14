import axios from 'axios';
import { useEffect, useState } from 'react';


function DesignsList() {
  let [designsList, setDesignsList] = useState([]);
    // On Load, fetch design data from the server
    //useEffect below is only necessary after I implement a button
  useEffect(() => {
    console.log('in useEffect')
   // getStudents();
   getDesignsList();
}, []);
console.log (designsList);

const getDesignsList = () => {
  axios({
      method: 'GET',
      url: '/api/designs'
  }).then((response) => {
      setDesignsList(response.data);
  }).catch((err)=>{
      console.log(err);
  });
};




  return (
    <>
    <table>
                <thead>
                    <tr>
                        <th>Designs List</th>
                    </tr>
                </thead>
                <tbody>
                    {designsList.map(designs => (
                        <tr key={designs.id}>
                            <td>
                                {designs.name}
                            </td>
                            <td>
                                {designs.image_file_name}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </>
  );
}


export default DesignsList;