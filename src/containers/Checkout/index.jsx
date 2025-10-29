import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

import { CheckoutForm } from "../../components";
import stripePromisse from '../../config/stripeConfig'

export function Checkout() {
    const {
        state: { clientSecret },
    } = useLocation();

    if (!clientSecret) {
        return <div>Erro, Volte e Tente Novamente</div>
    }

    return (
        <Elements stripe={stripePromisse} options={{ clientSecret }}>
            <CheckoutForm />
        </Elements>
    );
} 