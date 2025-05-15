import client from "@/lib/appwrite_client";
import { Databases, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

async function fetchInterpretation(id: string) {
  try {
    const response = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "6825e6f80020a12a9eae",
      id
    );
    return response;
  } catch (error) {
    console.error("Error fetching interpretation", error);
    throw new Error("Failed to fetching interpretation");
  }
}

async function deleteInterpretation(id: string) {
  try {
    const response = await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "6825e6f80020a12a9eae",
      id
    );
    return response;
  } catch (error) {
    console.error("Error deleting interpretation", error);
    throw new Error("Failed to deleting interpretation");
  }
}

async function updateInterpretation(
  id: string,
  data: { term: string; interpretation: string }
) {
  try {
    const response = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "6825e6f80020a12a9eae",
      id,
      data
    );
    return response;
  } catch (error) {
    console.error("Error updating interpretation", error);
    throw new Error("Failed to updating interpretation");
  }
}

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const {id} = context.params;
    const interpretation = await fetchInterpretation(id);
    return NextResponse.json({interpretation});
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch interpretation",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const {id} = context.params;
    const interpretation = await req.json();
    const response = await updateInterpretation(id, interpretation);
    return NextResponse.json({message: 'Interpretation updated', data: response});
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to update interpretation",
      },
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request,
    {params}: {params: {id: string}}
){
    try {
        const id = params.id;
        await deleteInterpretation(id)
        return NextResponse.json({message: "Interpretation Deleted"})
    } catch (error) {
         return NextResponse.json(
      {
        error: "Failed to delete interpretation",
      },
      { status: 500 }
    );
    }
}