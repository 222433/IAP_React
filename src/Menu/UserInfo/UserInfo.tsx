import { FC, useEffect, useState } from "react"
import { getEmail, getPicture } from "../../userService"
import './styles.css'
import { Dropdown } from "react-bootstrap"
export const UserInfo: FC = () => {
    const [picture, setPicture] = useState<string>();
    const [email, setEmail] = useState<string>();

    useEffect(() => {
        //redirectIfUnauthenticated(getPicture()).then(setPicture);
        //redirectIfUnauthenticated(getEmail()).then(setEmail);
    }, []);


    return (

        <></>

    )
}

