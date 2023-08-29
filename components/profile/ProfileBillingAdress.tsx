import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

const ProfileBillingAdress = () => {
	const { user } = useAuth();

	return (
		<>
			{user && (
				<div className="d-flex align-items-start flex-column space-y-4 ">
					<div className="mb-auto p-2">
						<h3 className="separatorx1 text-[#484848]">Adresse de facturation</h3>
						<div className="flex flex-wrap gap-4 mb-4 ">
							<Input
								style={{ flex: '1 1 180px'}}
								label={'Rue / Numero'}
								type={'text'}
								placeholder={'adresse'}
							></Input>
							<Input
								label={'Adresse, ligne 2'}
								type={'text'}
								placeholder={'adresse'}
							></Input>
						</div>
						<div className="flex flex-wrap gap-4 mb-4">
							<Input label={'Code postal'} type={'text'} placeholder={'95800'}></Input>
							<Input label={'Ville'} type={'text'} placeholder={'Cergy'}></Input>
						</div>
						<div className="flex flex-wrap gap-4 ">
							<Input
								label={'État / Région'}
								type={'text'}
								placeholder={'Votre etat/region  ici'}
							></Input>
							<select
								className="form-select grow shrink basis-[180px] outline-none  rounded-[8px] border border-[#c2c6cc]  p-[10px]"
								name="pays"
							>
								<option selected> Pays</option>
								<option value="albanie"> Albanie</option>
								<option value="australie"> Australie</option>
								<option value="belgique"> Belgique</option>
								<option value="bresil"> Bresil</option>
								<option value="canada"> Canada</option>
								<option value="chine"> Chine</option>
								<option value="france"> France</option>
								<option value="italie"> Italie</option>
							</select>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProfileBillingAdress;
