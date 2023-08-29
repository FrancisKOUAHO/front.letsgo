import MethodePaymentPaypal from '../ui/MethodePaymentPaypal';

const BookingPayment = () => {
  return (
    <div className="w-full h-full">
      <h1 className="text-[29px]">Comment voulez-vous payer ?</h1>
      <p className="mt-4 text-[16px]">
        Nous avons sécurisé vos billets. Pour recevoir vos billets, veuillez
        effectuer votre paiement dès que possible via l&lsquo;une de nos méthodes de
        paiement sécurisées.
      </p>

      <p className="mt-4 text-[16px]">
        Temps restant pour effectuer le paiement : <span>26 minutes</span>
      </p>

      <h2 className="mt-10 text-[19px]">Sélectionnez un mode de paiement</h2>
      <MethodePaymentPaypal />
    </div>
  );
};

export default BookingPayment;
