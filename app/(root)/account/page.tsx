import UserAppearance from "@/components/account/user-appearance";
import UserProfile from "@/components/account/user-profile";
import {
  TabsContent,
  TabsList,
  TabsTrigger,
  VerticalTabs,
} from "@/components/ui/vertical-tabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account preferences",
};

const AccountPage = () => {
  return (
    <div className="container mx-auto">
      <div className="header">
        <div className="text-2xl font-bold">Account Settings</div>
        <div className="text-gray-500">Manage your account settings</div>
        <hr className="mt-4" />
      </div>
      <div className="mt-4">
        <VerticalTabs defaultValue="account" className="flex items-start">
          <TabsList className="w-1/5 gap-2">
            <TabsTrigger value="account">Profile</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          <div className="flex-1 lg:max-w-2xl ml-12">
            <TabsContent value="account">
              <UserProfile />
            </TabsContent>
            <TabsContent value="appearance">
              <UserAppearance />
            </TabsContent>
          </div>
        </VerticalTabs>
      </div>
    </div>
  );
};

export default AccountPage;
