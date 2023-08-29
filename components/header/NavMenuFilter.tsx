import { NextPage } from 'next';
import Button from '../ui/Button';

const NavMenuFilter: NextPage = () => {
  return (
    <div className="c-nav-menu-filter o-container o-container--margin">
      <ul>
        <li>
          <a>
            Music Events <span>.</span>
          </a>
        </li>
        <li>
          <a>
            Sports <span>.</span>
          </a>
        </li>
        <li>
          <a>
            Food <span>.</span>
          </a>
        </li>
        <li>
          <a>
            Party Night <span>.</span>
          </a>
        </li>
        <li>
          <a>
            Bolling <span>.</span>
          </a>
        </li>
        <li>
          <a>
            More <span></span>
          </a>
        </li>
      </ul>

      <Button
        isActive={false}
        onClick={() => ''}
        color={'secondary'}
      >
        <i className="ri-equalizer-line mr-2"></i>
        Filters
      </Button>
    </div>
  );
};

export default NavMenuFilter;
