import { auth } from "@/auth";
import AccountProfile from "@/components/account/account-profile";
import { TabsContent, TabsList, TabsTrigger, VerticalTabs } from "@/components/ui/vertical-tabs";
import React from "react";

const AccountPage = async () => {
    const session = await auth();
    if (!session?.user) {
        return null;
    }

    console.log(session.user);

    return (
        <div className="container mx-auto">
            <div className="header">
                <div className="text-2xl font-bold">
                    Account Settings
                </div>
                <div className="text-gray-500">
                    Manage your account settings
                </div>
                <hr className="mt-4" />
            </div>
            <div className="mt-4">
                <VerticalTabs defaultValue="account" className="flex">
                    <TabsList className="w-1/5 gap-2">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    </TabsList>
                    <div className="flex-1 lg:max-w-2xl ml-12">
                        <TabsContent value="profile"><AccountProfile /></TabsContent>
                        <TabsContent value="account">Change your password here.</TabsContent>
                        <TabsContent value="appearance">Change your password here.</TabsContent>
                    </div>
                </VerticalTabs>
            </div>
        </div>
    );
};

export default AccountPage;