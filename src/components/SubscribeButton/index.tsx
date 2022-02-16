import { useSession, signIn } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'

interface ButtonProps{
    priceId:string,
}




export function SubscribeButton(priceId:ButtonProps){

    const {data:session} = useSession();

    async function handleSubscribe(){
        if(!session){
            signIn('github')
            return;
        }
        


        try {       
            console.log('Passou aqui 1')
            const response =  await api.post('/subscribe')
            console.log('Passou aqui 2')
            
            const {sessionId} = response.data;
            console.log('Passou aqui 3')
            
            const stripe  =  await getStripeJs()
            console.log('Passou aqui 4')
            
            await stripe.redirectToCheckout({sessionId})
            console.log('Passou aqui 5')
            

        } catch (err) {
        
            console.log('Passou aqui 6')

            alert("Erro aqui: " + err.message)
        }
    }

    return(
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe Now
        </button>
    );
}