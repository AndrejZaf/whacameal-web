"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import React from "react";

const UserProfile = () => {
  const { data } = authClient.useSession();
  const user = data?.user;
  if (!user) {
    return;
  }
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e || !e.target || !e.target.files || !user) {
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const result = reader.result;
      await authClient.updateUser({
        image: result as string,
      });
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">
      <div className="tab-info">
        <h3 className="font-semibold text-xl">Profile</h3>
        <p className="text-sm text-gray-500">
          This is how others will see you on the site.
        </p>
      </div>
      <hr />
      <div className="space-y-4">
        <div className="max-w-xs mx-auto flex flex-col items-center gap-y-4">
          <Avatar className="h-52 w-52">
            <AvatarImage
              src={user.image ? user.image : "./generic-image.jpg"}
            />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <Input type="file" onChange={(e) => handleImageUpload(e)} />
        </div>
        <FormItem>
          <Label>Username</Label>
          <Input
            disabled
            readOnly
            placeholder={"john.doe@example.com"}
            type="email"
            value={user.name}
          />
        </FormItem>
        <FormItem>
          <Label>Email</Label>
          <Input
            disabled
            readOnly
            placeholder={"john.doe@example.com"}
            type="email"
            value={user.email}
          />
        </FormItem>
      </div>
    </div>
  );
};
export default UserProfile;
