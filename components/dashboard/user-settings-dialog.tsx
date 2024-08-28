import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useGetUserInfo } from "@/features/use-get-user-info";
import { CustomSession } from "@/features/use-session";
import { useState } from "react";

interface UserSettingsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    session: CustomSession;
}

export default function UserSettingsDialog({ isOpen, onClose, session }: UserSettingsDialogProps) {
    const { data: userInfo, isLoading, error } = useGetUserInfo(session?.token?.sub);
    const [showApiToken, setShowApiToken] = useState(false);
    const { toast } = useToast();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Account Settings</DialogTitle>
                </DialogHeader>
                {isLoading ? (
                    <p className="py-4 text-center">Loading...</p>
                ) : error ? (
                    <p className="py-4 text-center text-red-500">Load user info failed</p>
                ) : (
                    <div className="mt-6 space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-center">Account Information</h3>
                            <div className="grid grid-cols-2 gap-2 text-center">
                                <span className="text-left text-gray-500">Account Provider:</span>
                                <span className="text-right">{userInfo?.provider}</span>
                                <span className="text-left text-gray-500">Provider Account ID:</span>
                                <span className="text-right">{userInfo?.providerAccountId}</span>
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}