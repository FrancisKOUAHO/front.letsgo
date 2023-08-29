import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Layout from '../../../layout/Layout';
import Input from "../../../components/ui/Input";
import {api} from "../../../config/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

const Index = () => {
    const router = useRouter();
    const { id } = router.query;

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const form = event.currentTarget
        const { password } = Object.fromEntries(new FormData(form))

        let newPassword = await api.post('auth/new-password', {
            token: id,
            password: password
        })

        if (newPassword.status === 200) {
            const notify = () => toast('Votre mot de passe a bien été modifié',{position: toast.POSITION.BOTTOM_CENTER});
            await router.push('/')
        } else {
            const notify = () => toast('Une erreur est survenue', {position: toast.POSITION.BOTTOM_CENTER});
        }
    };

    return (
        <Layout title="nouveau-mot-de-passe">
            <div className="o-container o-container--margin">
                <h1 className="separatorx1 text-[#484848]">Réinitialiser le mot de passe</h1>
                <div className="flex flex-wrap gap-10 justify-center mt-[5%]">
                    <form onSubmit={handleSubmit} className='w-2/5 sm:w-full'>
                        <div className="mb-auto p-2">
                            <div className="flex flex-wrap gap-4 mb-4">
                                <Input
                                    label={'Nouveau mot de passe (de 8 à 32 caractères) '}
                                    type={'password'}
                                    name={'password'}
                                    placeholder={''}
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
                                    Créer un nouveau mot de passe
                                </Button>
                            </div>
                            <ToastContainer />
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Index;
