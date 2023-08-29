import Link from "next/link";
import NavBar from "./NavBar";
import { FunctionComponent } from "react";
import HeaderProps from "../../types/HeaderProps";

const Header: FunctionComponent<HeaderProps> = ({
                                                  customStyle
                                                }) => {
  return (
    <header className='c-main-nav o-container' style={customStyle}>
      <h1 className='c-main-nav__logo'>
        <Link href={'/'}>
          <a>
            <img className="w-[74px] h-[74px]" src="/img/LetsGo.svg" alt="logo de la sociéte"/>
          </a>
        </Link>
      </h1>
      <NavBar/>
    </header>
  );
}


export default Header
