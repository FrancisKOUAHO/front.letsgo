import Button from '../ui/Button';
import { useCategories } from '../../hooks';
import { Key } from 'react';

const Categorie = () => {
	const { data } = useCategories();

	return (
		<>
			{data &&
				data.map((categorie: any, index: Key | null | undefined) => {
					return (
						<Button
							key={index}
							color="white"
							isActive={categorie.isActive}
							onClick={() => ''}
							minWidth={180}
						>
							{categorie.name}
						</Button>
					);
				})}
		</>
	);
};

export default Categorie;
