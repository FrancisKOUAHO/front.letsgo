import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

const ProfileNotifications = () => {
	const { user } = useAuth();

	return (
		<>
			{user && (
				<div className="d-flex align-items-start flex-column space-y-4 ">
					<div className="mb-auto p-2">
						<h3 className="separatorx1 text-[#484848]">Informations de contact</h3>
						<div className="mb-4">
							<h6> Vos notifications sont envoyées à :</h6>
							<h6>{user?.email}</h6>
						</div>

						<div>
							<Input
								label={'Changez votre e-mail '}
								type={'email'}
								placeholder={user?.email}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProfileNotifications;
