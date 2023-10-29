import {FunctionComponent, useState} from 'react';
import ProfileDetail from '../../../components/profile/ProfileDetail';
import ProfileNotification from '../../../components/profile/ProfileNotifications';
import ProfilePassword from '../../../components/profile/ProfilePassword';
import ProfileBillingAdress from '../../../components/profile/ProfileBillingAdress';
import Button from '../../../components/ui/Button';
import Layout from '../../../layout/Layout';

const Profile: FunctionComponent = () => {
	const [step, setStep] = useState(1);
	const [data, setData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
	});

	const switchToProfile = (step: any) => {
		switch (step) {
			case 1:
				return <ProfileDetail />;
			case 2:
				return <ProfileNotification />;
			case 3:
				return <ProfilePassword />;
			case 4:
				return <ProfileBillingAdress />;

			default:
				return 'Error';
		}
	};

	return (
		<Layout title="Profile">
			<div className="o-container o-container--margin">
				<div className="flex flex-wrap gap-10">
					<div className="grow shrink basis-[280px]">
            <div
              className="bg-white rounded-lg overflow-hidden"
              style={{
                border: '1px solid #CBC9C9',
                fontWeight: 400,
              }}
            >
              <div className="bg-[#4376FF] rounded-full w-[142px] h-[142px] my-4 flex items-center justify-center mx-auto">
                <i className="ri-camera-fill  text-[43px] text-white"></i>
              </div>
              <button
                className={`flex items-center space-x-4 px-4 py-3 w-[100%] ${
                  step === 1 && 'bg-[#4376FF] text-white'
                }`}
                style={{
                  borderTop: '1px solid #cBC9C9',
                  borderBottom: '1px solid #CBC9C9',
                }}
                onClick={() => setStep(1)}
              >
                <i className="ri-user-3-line"></i>
                <p>Profil</p>
              </button>
              <button
                className={`flex items-center space-x-4 px-4 py-3 w-[100%] hover:bg-[#4376FF] hover:text-white ${
                  step === 2 && 'bg-[#4376FF] text-white'
                }`}
                style={{
                  borderBottom: '1px solid #CBC9C9',
                }}
                onClick={() => setStep(2)}
              >
                <i className="ri-notification-4-line"></i>
                <p>Notifications</p>
              </button>
              <button
                className={`flex items-center space-x-4 px-4 py-3 w-[100%] hover:bg-[#4376FF] hover:text-white ${
                  step === 3 && 'bg-[#4376FF] text-white'
                }`}
                style={{
                  borderBottom: '1px solid #CBC9C9',
                }}
                onClick={() => setStep(3)}
              >
                <i className="ri-lock-2-line"></i>
                <p>Mot de passe</p>
              </button>
              <button
                className={`flex items-center space-x-4 px-4 py-3 w-[100%] hover:bg-[#4376FF] hover:text-white ${
                  step === 4 && 'bg-[#4376FF] text-white'
                }`}
                onClick={() => setStep(4)}
              >
                <i className="ri-mail-line"></i>
                <p>Adresse</p>
              </button>
            </div>
					</div>

					<div className='grow-[9999] shrink basis-[440px] flex flex-col space-y-4'>
            {switchToProfile(step)}
            <div className="flex flex-wrap sm:justify-center gap-[10px] justify-end">
              <Button type={'submit'} color={'secondary'} isActive={false}>
                Annuler
              </Button>
              <Button type={'submit'} isActive>
                Enregistrer
              </Button>
            </div>
          </div>
				</div>
			</div>
		</Layout>
	);
};

export default Profile;
