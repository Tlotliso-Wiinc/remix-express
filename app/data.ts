import dotenv from "dotenv";

dotenv.config();

export type Member = {
  id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
};

async function fetchJSON(url: string, options?: RequestInit): Promise<any> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export async function getMembers(): Promise<any> {
  try {
    const url = `${process.env.HOST}/api/members`;
    return await fetchJSON(url);
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
}

export async function addMember(member: Member): Promise<any> {
  try {
    const url = `${process.env.HOST}/api/members`;
    return await fetchJSON(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    });
  } catch (error) {
    console.error("Error adding member:", error);
    throw error;
  }
}