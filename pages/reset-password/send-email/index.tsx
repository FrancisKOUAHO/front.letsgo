import React from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import {api} from "../../../config/api";
import Layout from "../../../layout/Layout";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
    const router = useRouter();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const form = event.currentTarget
        const {email} = Object.fromEntries(new FormData(form))


       let sendMail = await api.post('auth/forgotPassword', {email})

        if (sendMail.status === 200) {
            const notify = () => toast('Un email vous a été envoyé',{position: toast.POSITION.BOTTOM_CENTER});
            await router.push('/')
        } else {
            const notify = () => toast('Une erreur est survenue', {position: toast.POSITION.BOTTOM_CENTER});
        }
    };

    return(
        <Layout title="nouveau-mot-de-passe">
            <div>
                <div className="o-container o-container--margin">
                    <h1 className="separatorx1 text-[#484848]">Réinitialiser le mot de passe</h1>
                    <div className="flex flex-wrap gap-10 justify-center mt-[5%]">
                    <form onSubmit={handleSubmit} className='w-2/5 sm:w-full'>
                        <div className="mb-auto p-2">
                            <p className='text-[#484848] mb-[24px]' > Indiquez l’adresse e-mail associée avec ce compte et nous vous renverrons un lien pour réinitialiser le mot de passe.</p>
                            <div className="flex flex-wrap gap-4 mb-4">
                                <Input
                                    label={'Adresse e-mail'}
                                    type={'email'}
                                    name={'email'}
                                    placeholder={'contact@gmail.com'}
                                    required
                                ></Input>
                            </div>
                            <div className="mt-6 flex items-center justify-center text-center">
                                <Button
                                    w={'full'}
                                    color={'primary'}
                                    isActive={true}
                                    minWidth={100}
                                    minHeight={54}
                                    type={'submit'}
                                >
                                    Envoyer le lien de réinitialisation
                                </Button>
                            </div>
                            <ToastContainer />
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Index
