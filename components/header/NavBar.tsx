import Dropdown from '../ui/Dropdown';
import Button from '../ui/Button';
import {FunctionComponent, useState} from 'react';
import Login from '../form/Login';
import {useAuth} from '../../context/AuthContext';

const NavBar: FunctionComponent = () => {
    const {user, logout} = useAuth();

    let [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    return (
        <nav>
            <ul>
                <li className="hide-small">
                    <a className="hover-underline" href="https://apps.apple.com/fr/app/letsgo/id1626624162"
                       target="_blank" rel="noreferrer">{"Télécharger l'application mobile"}</a>
                </li>
            </ul>

            {user ? (
                <Dropdown
                    list={[
                        {label: 'Réservations', link: '/booking'},
                        {label: 'Historique', link: '/customer-history'},
                        {label: 'Paramètres', link: '/account/profile'},
                        {label: 'Déconnexion', onclick: logout},
                    ]}
                >
                    <i className="ri-account-circle-fill ri-2x"></i>
                </Dropdown>
            ) : (
                <Button color="primary" isActive={true} onClick={openModal}>
                    Se connecter
                </Button>
            )}

            <Login closeModal={closeModal} isOpen={isOpen}/>
        </nav>
    );
};

export default NavBar;
