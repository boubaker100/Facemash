import prisma from "@/libs/client";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

const webhookSecret: string = process.env.CLERK_WEBHOOK_SIGNING_SECRET || "";

export async function POST(req: Request) {
 if (!webhookSecret) {
   throw new Error("Missing CLERK_WEBHOOK_SIGNING from clerl ")
}

  const svix_id = req.headers.get("svix-id") ?? "";
  const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
  const svix_signature = req.headers.get("svix-signature") ?? "";

 
  const body = await req.text();

  const sivx = new Webhook(webhookSecret);

  let msg ;

  try {
    msg = sivx.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    return new Response("Bad Request", { status: 400 });
  }

  


  const{id} =msg.data;
  const type = msg.type;

  console.log(`"Webhook received ID OF ${id}: and type of ${type}`);
  console.log("Full event body:", body);
  
  if (type === "user.updated") {
  try{
    // update user in db
    await prisma.user.update({
   
      where:{id:msg.data.id},
      data:{
    
      username:JSON.parse(body).data.username || "",
      avatar:JSON.parse(body).data.image_url || "/noAvatar.png",

      }
    });
    console.log("User has been updated");
    return new Response("User has been updated", { status: 200 });

  }catch(err){
    console.log("Error creating user in DB", err);
    return new Response("Faild to update the user!", { status: 500 });
  }
 }

 
 if (type === "user.created") {
  try{
    // create user in db
    await prisma.user.create({
    data:{
      id:msg.data.id,
      username:JSON.parse(body).data.username || "",
      avatar:JSON.parse(body).data.image_url || "/noAvatar.png",
      cover: "https://images.unsplash.com/photo-1692302792267-bf29b5ea87d1?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

      }
    });
    console.log("User has been created");
    return new Response("User has been created", { status: 200 });

  }catch(err){
    console.log("Error creating user in DB", err);
    return new Response("Faild to create the user!", { status: 500 });
  }
 }

  

 // Rest

  return new Response("OK", { status: 200 });
}