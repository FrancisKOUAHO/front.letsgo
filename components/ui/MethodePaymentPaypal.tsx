import { Disclosure } from '@headlessui/react';
import InputLabel from './InputLabel';
import Button from './Button';

const MethodePaymentPaypal = () => {
	return (
		<div className="w-full mt-4">
			<div
				className="w-full max-w-md rounded-2xl bg-white p-2 "
				style={{border: '1px solid #4376FF'}}
			>
				<Disclosure>
					{({open}) => (
						<>
							<Disclosure.Button className="flex flex-col w-full">
								<div
									className="flex justify-between w-full rounded-lg bg-[#4376FF] px-4 py-2 text-left text-sm font-medium text-white">
									<span className="text-[17px]">PayPal</span>
									<i className={`ri-paypal-fill ri-2x h-5 w-5 text-white`}/>
								</div>
							</Disclosure.Button>
							<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
								<Button
									isActive={true}
									onClick={() => ''}
									color={'primary'}
									minWidth={400}
								>
									Payez 62.00€
								</Button>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
		</div>
	);
};

export default MethodePaymentPaypal;
