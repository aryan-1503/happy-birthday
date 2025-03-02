"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cake, PartyPopper } from "lucide-react";

export default function Home() {
    const [name, setName] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const router = useRouter();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handleClick = () => {
        if (!name) return;

        if (image) {
            const reader = new FileReader();
            reader.onload = () => {
                localStorage.setItem("birthdayImage", reader.result as string);
                router.push(`/${encodeURIComponent(name)}`);
            };
            reader.readAsDataURL(image);
        } else {
            router.push(`/${encodeURIComponent(name)}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-md w-full z-10">
                <div className="flex items-center justify-center mb-6 text-pink-500">
                    <Cake className="h-10 w-10 mr-2"/>
                    <h1 className="text-3xl font-bold">Birthday Greeter</h1>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-lg">
                            Who's celebrating their birthday?
                        </Label>
                        <div className="grid w-full max-w-sm items-center gap-4 mt-4">
                            <div className="grid gap-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter their name"
                                    className="text-xl py-6"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-1.5 mt-3">
                                <Label htmlFor="picture">Picture (Optional)</Label>
                                <Input id="picture" type="file" className="pt-3 pb-8" onChange={handleImageChange}/>
                            </div>
                            <Button
                                onClick={handleClick}
                                className="py-6 mt-3 w-full text-white font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
                            >
                                <PartyPopper className="mr-2 h-6 w-6 "/>
                                Go!
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="absolute bottom-4 text-center text-gray-600 text-sm">
                Copyright &copy; Aryan Panchal {new Date().getFullYear()}
            </footer>
        </div>
    );
}
