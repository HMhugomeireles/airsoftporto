import Stripe from "stripe";
import { getBaseURl } from "../utils";

// const productId = 'prod_QGmQZyDT5S7S70'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-09-30.acacia",
});


type Props = {
    eventId: string;
    orderId: string
    ticketId: string;
    product: {
        amount: number;
        productName: string;
        productDescription: string;
    }
    customer: {
        email: string;
    }
}

export async function createStripeCheckoutLink({
    eventId,
    orderId,
    ticketId,
    customer,
    product
}: Props) {
    const domain = getBaseURl();


    try {
        const session = await stripe.checkout.sessions.create({
            success_url: `${domain}/${eventId}/order/${orderId}`,
            cancel_url: `${domain}/${eventId}/order`,
            payment_method_types: ['card'],
            customer_email: customer.email,
            mode: 'payment',
            line_items: [{
                price_data: {
                    unit_amount: product.amount * 100,
                    currency: 'eur',
                    product_data: {
                        name: product.productName,
                        description: product.productDescription
                    }
                },
                quantity: 1
            }],
            metadata: {
                eventId,
                orderId,
                ticketId
            },
            submit_type: 'pay',
            ui_mode: "hosted"
        })


        return session.url
    } catch (error) {
        console.log(error)
        return undefined;
    }
}