import { Menu, Transition } from '@headlessui/react';
import { Fragment, FunctionComponent } from 'react';
import DropdownProps from '../../types/DropdownProps';

const Dropdown: FunctionComponent<DropdownProps> = ({
	list,
	children,
}) => {
	return (
		<Menu as="div" className="c-dropdown">
			<Menu.Button className="c-dropdown__button">
				{children}
				{/* <i className="ri-arrow-drop-down-line ri-1x"></i> */}
			</Menu.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-75"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items as="div" className="c-dropdown__items" style={{ zIndex: 1 }}>
					{list.map((item, index) => (
						<Menu.Item key={index} as="div" className="c-dropdown__item">
							<a
								className="c-dropdown__item__link"
								href={item.link}
								onClick={item.onclick}
							>
								{item.label}
							</a>
						</Menu.Item>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default Dropdown;
