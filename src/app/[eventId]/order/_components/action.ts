"use server";

import { formSchema } from "./formSchema";


export type FormState = {
    fields?: Record<string, string>;
    issues?: string[];
    urlRedirect: string | undefined;
    isValid: boolean;
};

export async function onSubmitAction(
    prevState: FormState,
    data: FormData
): Promise<FormState> {
    

    const formData = Object.fromEntries(data);
    const parsed = formSchema.safeParse(formData);

    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
        fields[key] = formData[key].toString();
    }
    console.log('data', data)


    // const checkoutLink = await createStripeCheckoutLink({
    //     product: {
    //         amount: 3.00,
    //         productName: 'Mya product name',
    //         productDescription: 'Description product'
    //     },
    //     customer: {
    //         email: `${user?.email}`
    //     }
    // })

    // console.log("link", parsed)
    // if (!parsed.success) {
    //     return {
    //         fields,
    //         issues: parsed.error.issues.map((issue) => issue.message),
    //         isValid: false,
    //         urlRedirect: undefined
    //     }
    // }
    // console.log("link", checkoutLink)

    return {
        fields,
        issues: [],
        isValid: true,
        urlRedirect: ''
    }
    
}

