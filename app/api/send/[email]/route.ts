import { resend } from "@/lib/constants";
import { dateStringConverter } from "@/lib/date";
import { NextRequest, NextResponse } from "next/server";

export async function POST(  
    request: NextRequest,
    { params }: { params: { email: string } }
  ) {
    // updates a employee
    const email = params.email
    const json = await request.json()
    try {
      const data = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: `New Task - ${json.title}`,
        html: `
        <p>You have been assigned a task! <strong>${json.title}</strong>!</p>
        <hr />
        <p>Description:</p>
        <hr />
        <p>${json.description}<p>
        <hr />
        <p>Due:</p>
        <hr />
        <p>${dateStringConverter(json.due_date)}<p>
        `
      });
  
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json({ error });
    }
  }