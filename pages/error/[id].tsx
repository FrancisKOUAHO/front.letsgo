import { useRouter } from "next/router";

const Id = () => {
	const router = useRouter();
	return (
		<div className="w-[450px] md:w-1/3 mx-auto shadow-2xl shadow-red-200" style={{transform: "translateY(50%)"}}>
			<div className="flex flex-col p-5 rounded-lg shadow bg-white">
				<div className="flex flex-col items-center text-center">
					<div className="inline-block p-4  rounded-full">
						<img src="/img/error.svg" alt="" width={100}/>
					</div>
					<h2 className="mt-4 font text-gray-800">Paiement refusé</h2>
					<p className="mt-6 text-l text-gray-600 leading-relaxed">
						Il semble qu’une erreur soit survenue au niveau de votre paiement. Veuillez réessayer plus tard ou contactez
						votre banque pour plus d’information
					</p>
				</div>
				<div className="flex items-center mt-3">
					<button
						className="flex-1 px-4 py-2 ml-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-md"
						onClick={() => router.back()}
					>
						Reéssayer le paiement
					</button>
				</div>
			</div>
		</div>
	);
}

export default Id