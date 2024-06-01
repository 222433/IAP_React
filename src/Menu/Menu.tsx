import { FC, useEffect, useState } from "react"
import { UserInfo } from "./UserInfo/UserInfo"
import { Dropdown, DropdownButton } from "react-bootstrap"
import { Link } from "react-router-dom"
import style from './style.module.css'
import { ShoppingSummary } from "../ShoppingSummary"
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { API_ORIGIN } from "../app-constants"
import { getEmail } from "../userService"

const Menu: FC = () => {
    const [email, setEmail] = useState<string>('')
    useEffect(() => {
        getEmail().then(setEmail);
    }, []);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <div className="w-100">

                <div className="row" id="navbarSupportedContent">
                    <a className="navbar-brand col-md-1" href="#">Navbar</a>
                    <ul className="navbar-nav mr-auto col-md-6">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <ShoppingSummary></ShoppingSummary>
                        </li>
                    </ul>
                    <ul className="col-md-4" style={{ textAlign: 'right' }}>

                        <DropdownButton
                            as={ButtonGroup}
                            key={'Warning'}
                            id={`dropdown-variants-${'Warning'}`}
                            variant={'Warning'.toLowerCase()}
                            title={'Warning'}
                        >
                            <UserInfo></UserInfo>
                            <p>{email}</p>
                            <Dropdown.Item href={API_ORIGIN + 'logout'}>Action</Dropdown.Item>

                        </DropdownButton>


                    </ul>
                </div>
            </div>


        </nav>
    )
}

export { Menu }