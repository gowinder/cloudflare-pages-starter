import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import useUIEventStore from "@/stores/ui-event.store";
import {
    signIn
} from "@hono/auth-js/react";


export default function SignIn() {

    const { event, setShowLogin } = useUIEventStore();

    const handleSignIn = (provider: any) => {
        signIn(provider);
        setShowLogin(false);
    };

    console.log('signin event:', event);

    if (!event.showLogin) {
        return;
    }
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-4 bg-black bg-opacity-50 m-auth">
            <Card className="w-96">
                <CardHeader className="items-center">
                    <CardTitle>登录</CardTitle>
                    <CardDescription>选择登录方式.</CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid items-center w-full gap-4">
                        <Button onClick={() => handleSignIn("google")}>
                            使用 Google 登录
                        </Button>
                        <Button onClick={() => handleSignIn("github")}>
                            使用 GitHub 登录
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>)
};
