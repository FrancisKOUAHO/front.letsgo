import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

const ProfilePassword = () => {
	const { user } = useAuth();
	return (
		<>
			{user && (
				<div className="d-flex align-items-start flex-column">
					<h3 className="separatorx1 text-[#484848]">Modifier le mot de passe</h3>
					<div className=" flex flex-wrap gap-4 mb-auto p-2">
						<Input
							label={'Nouveau mot de passe (de 8 à 32 caractères) '}
							type={'text'}
							placeholder={''}
						></Input>
						<Input
							label={'Confirmer le nouveau mot de passe'}
							type={'text'}
							placeholder={''}
						></Input>
					</div>
				</div>
			)}
		</>
	);
};

export default ProfilePassword;
