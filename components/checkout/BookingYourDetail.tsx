import InputLabel from '../ui/InputLabel';
import Button from "../ui/Button";
import Phone from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useAuth } from "../../context/AuthContext";

const BookingYourDetail = (props: any) => {
  const {user} = useAuth();
  const [firstName, lastName] = user?.full_name.split(' ')
  return (
    <form onSubmit={props.handleSendCustomer}>
      <fieldset disabled className="flex flex-wrap gap-x-4">
        <InputLabel
          label={'Prénom'}
          type={'text'}
          name={'firstName'}
          error={'Veuillez remplir ce champ.'}
          placeholder={firstName}
        />
        <InputLabel
          label={'Nom de famille'}
          type={'text'}
          name={'lastName'}
          error={'Veuillez remplir ce champ.'}
          placeholder={lastName}
        />
      </fieldset>
      <fieldset disabled>
        <InputLabel
          label={'Adresse électronique'}
          type={'email'}
          name={'email'}
          error={'Veuillez remplir ce champ.'}
          placeholder={user?.email}
        />
      </fieldset>

      <Phone
        country={'fr'}
        disabled={false}
        containerClass={'c-phone-input'}
        placeholder={user?.phone}
        inputProps={{
          name: 'phone',
        }}
      />
      <p className="text-[12px] mt-2 text-black">
        Nous utiliserons ce numéro de téléphone pour la notification de la livraison du billet par SMS et
        en cas de problèmes de commande.
      </p>

      {/*<div>
				<h3 className="mt-10">
					Informations requises pour le Musée du Louvre
				</h3>
				<span className='inline-block mt-2'>Adulte(s) (18+)</span>
				<hr className="mt-6"/>
				<InputLabel
					label={'Nom complet invité'}
					type={'text'}
					name={'invite_name'}
					error={'Veuillez remplir ce champ.'}
					placeholder={'Nom complet'}
				/>
				<p className="mt-2 text-[12px]">
					{"Veuillez saisir tous les noms en caractères latins selon votre passeport ou votre CARTE D'IDENTITÉ."}
				</p>
			</div>*/}
      <div className="mt-6">
        <Button
          color={'primary'}
          isActive={true}
          w='full'
        >Confirmez votre réservation</Button>
      </div>
    </form>
  );
};

export default BookingYourDetail;
