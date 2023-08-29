import {Fragment, FunctionComponent, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {Dialog, Transition} from "@headlessui/react";
import {GrFormClose} from "react-icons/gr";
import clsx from "clsx";
import Input from "../ui/Input";
import Link from "next/link";
import Button from "../ui/Button";

const qrcode: FunctionComponent<any> = ({ isOpen, closeModal }) => {
    const { login } = useAuth();
    const [isConnection, setIsConnection] = useState(true);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        const values = Object.fromEntries(new FormData(form));
        login(values.email, values.password);
        closeModal();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center min-w[600px]">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-[612px] transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 c-login__title"
                                >
                                    <span style={{fontSize: '22px'}}>{isConnection ? 'Connexion' : 'Inscription'}</span>
                                    <button className="" onClick={closeModal}>
                                        <GrFormClose style={{
                                            fontSize: '25px'
                                        }}/>
                                    </button>
                                </Dialog.Title>
                                <div className="c-conn  ection-switch mt-8">
                                    <button className={clsx('c-connection-switch__button', isConnection && 'c-connection-switch__button--is-selected')} onClick={() => setIsConnection(true)}>Connexion</button>
                                    <button className={clsx('c-connection-switch__button', !isConnection && 'c-connection-switch__button--is-selected')} onClick={() => setIsConnection(false)}>Inscription</button>
                                </div>
                                {isConnection ? (
                                    <form onSubmit={handleSubmit}>
                                        <div className="mt-6">
                                            <Input
                                                label={'Email'}
                                                type={'email'}
                                                placeholder={'contact@gmail.com'}
                                                name={'email'}
                                                required
                                            />
                                        </div>

                                        <div className="mt-6">
                                            <Input
                                                label={'Mot de passe'}
                                                type={'password'}
                                                placeholder={'Saisir votre mot de passe'}
                                                name={'password'}
                                            />
                                        </div>

                                        <div className="mt-4 px-[2px] text-[#9A9A9A] flex justify-between">
                                            <div className="flex items-center mb-4">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded"
                                                />
                                                <label className="ml-2 text-sm font-medium text-[#9A9A9A]">
                                                    Se souvenir de moi
                                                </label>
                                            </div>
                                            <Link href="/reset-password/send-email" passHref>
                                                <a>
                                                    <p className="text-sm font-medium">mot de passe oublié ?</p>
                                                </a>
                                            </Link>
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
                                                Connexion
                                            </Button>
                                        </div>
                                    </form>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <div className="mt-6">
                                            <Input
                                                label={'Nom complet'}
                                                type={'text'}
                                                placeholder={'Pierre MARTIN'}
                                                name={'name'}
                                                required
                                            />
                                        </div>

                                        <div className="mt-6">
                                            <Input
                                                label={'Email'}
                                                type={'email'}
                                                placeholder={'contact@gmail.com'}
                                                name={'email'}
                                                required
                                            />
                                        </div>

                                        <div className="mt-6">
                                            <Input
                                                label={'Mot de passe'}
                                                type={'password'}
                                                placeholder={'Saisir votre mot de passe'}
                                                name={'password'}
                                            />
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
                                                Inscription
                                            </Button>
                                        </div>
                                    </form>
                                )}

                                <div className="c-or-continue mt-4 text-[12px] flex items-center text-[#9A9A9A]">
                                    <hr className="w-[35px]" />
                                    <h6 className="sm:text-[11]">&nbsp; Ou continuer avec &nbsp;</h6>
                                    <hr className="w-[65%]" />
                                </div>

                                <div className="mt-6 flex flex-wrap gap-4 c-group-button">
                                    <Button
                                        color={'grey-light'}
                                        size={'12px'}
                                        minWidth={0}
                                        minHeight={54}
                                        style={{flex: '1 1 100px'}}
                                        isActive={true}
                                        onClick={() => ''}
                                    >
                                        <i className="ri-facebook-circle-fill ri-xl mr-2" />
                                        Facebook
                                    </Button>
                                    <Button
                                        color={'grey-light'}
                                        size={'12px'}
                                        minWidth={0}
                                        minHeight={54}
                                        style={{flex: '1 1 100px'}}
                                        isActive={true}
                                        onClick={() => ''}
                                    >
                                        <i className="ri-apple-fill ri-xl mr-2" />
                                        Apple ID
                                    </Button>
                                    <Button
                                        color={'grey-light'}
                                        size={'12px'}
                                        minWidth={0}
                                        minHeight={54}
                                        style={{flex: '1 1 100px'}}
                                        isActive={true}
                                        onClick={() => ''}
                                    >
                                        <i className="ri-google-fill ri-xl mr-2" />
                                        Google
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default qrcode;
