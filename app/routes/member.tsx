// app/routes/members.new.jsx
import { Form, useActionData, useNavigation, Link } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import { Plus, ArrowLeft } from 'lucide-react';

import { addMember } from "../data";

export const action = async ({ request }: any) => {
    const formData = await request.formData();
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const phone = formData.get("phone");

    const errors: Record<string, string> = {};
    
    if (!firstname) errors.firstname = "First name is required";
    if (!lastname) errors.lastname = "Last name is required";
    if (!email) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Invalid email format";
    if (phone && !/^\d{8}$/.test(phone.replace(/\D/g, ''))) {
        errors.phone = "Phone should be a valid 10-digit number";
    }

    if (Object.keys(errors).length > 0) {
        return json({ errors, values: { firstname, lastname, email, phone } });
    }

    // TODO: Replace with your actual database call
    // await db.member.create({ firstname, lastname, email, phone });
    const member = { firstname, lastname, email, phone };
    console.log("Member object:", member);
    await addMember(member);

    return redirect("/members");
};

export default function NewMember() {
  const actionData = useActionData<{
    errors?: Record<string, string>;
    values?: { firstname: string; lastname: string; email: string; phone?: string };
  }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="p-4">

        <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg font-bold">New Member</h1>
            <Link to="/members">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-sm flex items-center gap-2 shadow-sm">
                    <ArrowLeft size={15} />
                    <span className="text-sm">Members Overview</span>
                </button>
            </Link>
        </div>

        <hr className="border border-gray-300" />

        <div className="max-w-xl mx-auto p-8 px-20">
            <Form method="post" className="space-y-4" id="memberForm">
                <div>
                    <label className="block mb-1 text-sm" htmlFor="firstname">
                        First name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        className="w-full px-3 py-1 border rounded-sm"
                        defaultValue={actionData?.values?.firstname || ""}
                        aria-invalid={actionData?.errors?.firstname ? true : undefined}
                    />
                    {actionData?.errors?.firstname && (
                    <p className="mt-1 text-red-500 text-sm">{actionData.errors.firstname}</p>
                    )}
                </div>
        
                <div>
                    <label className="block mb-1 text-sm" htmlFor="lastname">
                        Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        className="w-full px-3 py-1 border rounded-sm"
                        defaultValue={actionData?.values?.lastname || ""}
                        aria-invalid={actionData?.errors?.lastname ? true : undefined}
                    />
                    {actionData?.errors?.lastname && (
                    <p className="mt-1 text-red-500 text-sm">{actionData.errors.lastname}</p>
                    )}
                </div>
        
                <div>
                    <label className="block mb-1 text-sm" htmlFor="email">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-1 border rounded-sm"
                        defaultValue={actionData?.values?.email || ""}
                        aria-invalid={actionData?.errors?.email ? true : undefined}
                    />
                    {actionData?.errors?.email && (
                    <p className="mt-1 text-red-500 text-sm">{actionData.errors.email}</p>
                    )}
                </div>
        
                <div>
                    <label className="block mb-1 text-sm" htmlFor="phone">
                    Phone
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-3 py-1 border rounded-sm"
                        defaultValue={actionData?.values?.phone || ""}
                        aria-invalid={actionData?.errors?.phone ? true : undefined}
                    />
                    {actionData?.errors?.phone && (
                    <p className="mt-1 text-red-500 text-sm">{actionData.errors.phone}</p>
                    )}
                </div>
        
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-sm hover:bg-blue-700 disabled:opacity-70"
                    >
                        {isSubmitting ? "Saving..." : "Submit"}
                    </button>
                </div>
            </Form>
        </div>

    </div>
    
  );
}