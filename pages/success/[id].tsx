import { useRouter } from "next/router";

const Id = () => {
	const router = useRouter();
	return (
		<div className="w-[450px] md:w-1/3 mx-auto shadow-2xl shadow-green-200" style={{transform: "translateY(50%)"}}>
			<div className="flex flex-col p-5 rounded-lg shadow bg-white">
				<div className="flex flex-col items-center text-center">
					<div className="inline-block p-4  rounded-full">
						<img src="/img/result.svg" alt="" width={100}/>
					</div>
					<h2 className="mt-4 font text-gray-800">Paiement réussi</h2>
					<p className="mt-6 text-l text-gray-600 leading-relaxed">
						Merci pour la réservation de cet événement sur LetsGO!
						Votre paiement s'est fait avec succès!
						Un e-mail de confirmation vous sera envoyé dans quelques instants.
					</p>
				</div>
				<div className="flex items-center mt-3">
					<button
						className="flex-1 px-4 py-2 ml-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-md"
						onClick={() => router.push("/")}
					>
						Retour à l'accueil
					</button>
				</div>
			</div>
		</div>
	);
}

export default Id