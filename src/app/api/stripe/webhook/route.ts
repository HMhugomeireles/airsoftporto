
import { stripe } from "@/lib/stripe";
import { TicketsModel } from "@/module/Tickets";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

type StripeEvent = Stripe.Event & {
    data: {
        object: {
            payment_intent: string;
        }
    }
}

export async function POST(req: NextRequest) {
    const body = await req.text();
    const sig = req.headers.get("Stripe-Signature") as string;

    let event: Stripe.Event
    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        switch (event.type) {
            case 'payment_intent.succeeded':
                await TicketsModel.updateTicketTransaction({
                    amount: event.data.object.amount,
                    paymentIntent: event.data.object.id,
                    ticketId: event.data.object.metadata['ticketId']
                })
              const paymentIntent = event.data.object;
              console.log('PaymentIntent was successful!');
              break;
            default:
              break;
          }

        return NextResponse.json({});
    } catch (error) {
        console.log("error", error)
        return NextResponse.json({});
    }
}