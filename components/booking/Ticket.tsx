import {FiUser} from "react-icons/fi";
import {FaQrcode} from "react-icons/fa";
import {Fragment, FunctionComponent, useState} from "react";
import TicketProps from "../../types/TicketProps";
import {Dialog, Transition} from "@headlessui/react";

const Ticket: FunctionComponent<TicketProps> = ({
                                                    number_of_places,
                                                    time_of_session,
                                                    total_price,
                                                    qrcodeImage,
                                                    name,
                                                    description,
                                                    date_of_session
                                                }) => {
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className="c-booking">
                <div className="flex flex-row">
                    <div className="flex flex-row-reverse md:flex-row rounded-lg bg-white shadow-lg">
                        <div className="">
                            <img
                                width={150}
                                className="h-full md:h-auto object-cover rounded-t-lg  md:rounded-l-lg"
                                src="/img/pexels-photo-7773724.jpeg" alt=""/>
                        </div>
                        <div className="p-4 flex flex-col justify-start">
                            <h5 className="text-gray-900 text-[14px] font-medium mb-2">{name}</h5>
                            <p className="text-gray-700 text-[10px] mb-2">
                                {description}
                            </p>
                            <div className="flex space-x-3 mb-1">
                                <div className="flex flex-row- rounded-lg  ">
                                    <p className="text-gray-600 text-[10px] py-2 px-4 border-t text-gray-600">{date_of_session}</p>
                                    <p className="text-gray-600 text-[10px] py-2 px-4 border-t text-gray-600">{time_of_session} </p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex columns gap-1 text-[12px] ">
                                    <FiUser/> {number_of_places}
                                </div>
                                <div className="flex columns px-4 text-bold text-[12px] ">
                                    {total_price}
                                </div>
                            </div>
                            <div className="flex mt-5">
                                <button
                                    className="rounded-md bg-blue-400 text-white text-[10px] py-2 px-4 border-t hover:bg-blue-600"
                                    onClick={openModal}>
                                    <FaQrcode/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className=" max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="mt-2">
                                        <img src={qrcodeImage} alt="" width="250"/>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Ticket;
