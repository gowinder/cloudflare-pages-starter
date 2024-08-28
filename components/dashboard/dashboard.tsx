

import { CustomSession } from '@/features/use-session';
import useUIEventStore from '@/stores/ui-event.store';
import { useEffect, useState } from 'react';
import SignIn from '../sign-in';
import DashboardNavbar from './dashboard-navbar';
import UserSettingsDialog from './user-settings-dialog';

export default function Dashboard({ session }: { session: CustomSession }) {

    const { event, setShowSettings } = useUIEventStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);


    const handleCloseDialog = () => {
        console.log("Closing dialog");
        setIsDialogOpen(false);
    };

    useEffect(() => {
        setIsSettingsOpen(event.showSettings);
    }, [event.showSettings]);

    const handleCloseSettings = () => {
        setShowSettings(false);
    };


    console.log("Dashboard, Rendering Dashboard. isDialogOpen:", isDialogOpen);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <DashboardNavbar session={session} />
            <div className="container p-4 mx-auto">
                <SignIn />
            </div>

            <UserSettingsDialog
                isOpen={isSettingsOpen}
                onClose={handleCloseSettings}
                session={session}
            />
        </div>
    );
};
