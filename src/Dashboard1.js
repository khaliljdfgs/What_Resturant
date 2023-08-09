import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./users/Header1";

function Dashboard1(){
    const Navigate=useNavigate();
    useEffect(()=>{
        if (!localStorage.getItem('User-info')){
                 Navigate('/');
        }
    },[])
    return (
        <div>
            <Header/>
        </div>
    )
}
export default Dashboard1;