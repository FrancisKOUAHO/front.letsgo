import { NextPage } from 'next';
import Dropdown from '../ui/Dropdown';
import Button from '../ui/Button';
import { useState } from 'react';
import Login from '../form/Login';
import { useAuth } from '../../context/AuthContext';

const NavBar: NextPage = () => {
  const {user, logout} = useAuth();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <nav>
      <ul>
        <li className="hide-small">
          <a className="hover-underline" href="https://apps.apple.com/fr/app/letsgo/id1626624162" target="_blank" rel="noreferrer">{"Télécharger l'application mobile"}</a>
        </li>
        {/*<li className="hide-small-xs">
          <Dropdown
            list={[
              {label: 'Français'},
            ]}
          >
            <i className="ri-global-line ri-2x"></i>
          </Dropdown>
        </li>*/}
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
