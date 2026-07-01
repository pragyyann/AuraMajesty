import { NextResponse } from "next/server";

type AppointmentPayload = {
  fullName: string;
  phone: string;
  serviceFor: string;
  serviceCategory: string;
  serviceName: string;
  duration?: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  source?: string;
};

const requiredFields: Array<keyof AppointmentPayload> = [
  "fullName",
  "phone",
  "serviceFor",
  "serviceCategory",
  "serviceName",
  "preferredDate",
  "preferredTime",
];

export async function POST(request: Request) {
  try {
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      return NextResponse.json(
        { success: false, message: "GOOGLE_SCRIPT_URL is not configured." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as AppointmentPayload;

    for (const field of requiredFields) {
      if (!body[field] || String(body[field]).trim() === "") {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const payload: AppointmentPayload = {
      fullName: body.fullName.trim(),
      phone: body.phone.trim(),
      serviceFor: body.serviceFor,
      serviceCategory: body.serviceCategory,
      serviceName: body.serviceName,
      duration: body.duration || "",
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      notes: body.notes || "",
      source: body.source || "Website",
    };

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid response from Google Apps Script.",
          rawResponse: text,
        },
        { status: 500 }
      );
    }

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Google Sheets save failed.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Appointment saved successfully.",
      appointmentId: result.appointmentId,
    });
  } catch (error) {
    console.error("Appointment API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while submitting appointment.",
      },
      { status: 500 }
    );
  }
}
