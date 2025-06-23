"use server";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { Roles } from "@/types/global";
import { revalidatePath } from "next/cache";

export async function setRole(formData: FormData) {
  const authResult = await auth();
  const sessionClaims = authResult.sessionClaims as { metadata?: { role?: string } } | undefined;

  // Check that the user trying to set the role is an admin
  if (sessionClaims?.metadata?.role !== "admin") {
    throw new Error("Not Authorized");
  }

  const client = await clerkClient();
  const id = formData.get("id") as string;
  const role = formData.get("role") as Roles;

  try {
    await client.users.updateUser(id, {
      publicMetadata: { role },
    });
    revalidatePath("/admin");
  } catch {
    throw new Error("Failed to set role");
  }
}

export async function removeRole(formData: FormData) {
  const authResult = await auth();
  const sessionClaims = authResult.sessionClaims as { metadata?: { role?: string } } | undefined;


  if (sessionClaims?.metadata?.role !== "admin") {
    throw new Error("Not Authorized");
  }

  const client = await clerkClient();
  const id = formData.get("id") as string;

  try {
    await client.users.updateUser(id, {
      publicMetadata: { role: null },
    });
    revalidatePath("/admin");
  } catch {
    throw new Error("Failed to remove role");
  }
}