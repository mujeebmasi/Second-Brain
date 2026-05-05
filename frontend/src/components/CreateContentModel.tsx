import { useEffect, useState, type ChangeEventHandler, type FormEvent } from "react";
import { Button } from "./Button";
import { CrossIcon } from "../icons/CrossIcon";
import { createContent, type ContentType } from "../lib/api";

interface CreateContentModelProps {
    open: boolean;
    onClose: () => void;
    onCreated?: () => void;
}

interface InputProps {
    placeholder: string;
    value: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    type?: "text" | "url";
}

interface TextareaProps {
    placeholder: string;
    value: string;
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

export function CreateContentModel({ open, onClose, onCreated }: CreateContentModelProps) {
    const [contentType, setContentType] = useState<ContentType>("youtube");
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) {
            return;
        }

        const onEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, [open, onClose]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim()) {
            setError("Title is required.");
            return;
        }

        if (contentType === "text" && !description.trim()) {
            setError("Description is required for normal text content.");
            return;
        }

        if (contentType !== "text" && !link.trim()) {
            setError("Link is required for YouTube and Twitter content.");
            return;
        }

        const token = localStorage.getItem("sb_token");
        if (!token) {
            setError("Please sign in before adding content.");
            return;
        }

        setLoading(true);
        setError("");

        createContent(token, {
            title,
            link: contentType === "text" ? "" : link,
            description: contentType === "text" ? description : "",
            type: contentType,
        })
            .then(() => {
                setContentType("youtube");
                setTitle("");
                setLink("");
                setDescription("");
                onCreated?.();
                onClose();
            })
            .catch((apiError: Error) => setError(apiError.message))
            .finally(() => setLoading(false));
    };

    return <div>
        {open && <div className="w-screen h-screen bg-slate-500/60 fixed top-0 left-0 z-50" onClick={onClose}>
            <div className="flex flex-col justify-center items-center h-full">
                <form className="bg-white opacity-100 p-4 rounded-md min-w-80 z-[60]" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="cursor-pointer" aria-label="Close modal">
                        <CrossIcon/>
                        </button>
                    </div>
                    <div>
                        {error && <div className="mx-2 mb-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>}
                        <div className="px-2 pt-1">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Content Type</label>
                            <select
                                className="w-full px-3 py-2 border border-slate-300 rounded"
                                value={contentType}
                                onChange={(e) => setContentType(e.target.value as ContentType)}
                            >
                                <option value="youtube">YouTube</option>
                                <option value="twitter">Twitter</option>
                                <option value="text">Normal Text</option>
                            </select>
                        </div>

                        <Input
                            placeholder={"Title"}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        {contentType === "text" ? (
                            <Textarea
                                placeholder={"Description"}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        ) : (
                            <Input
                                placeholder={"Link"}
                                value={link}
                                type={"url"}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        )}
                    </div>
                    <div className="flex justify-center mt-2">
                        <Button variant="primary" text={loading ? "Saving..." : "Submit"} type="submit" className="w-full" />
                    </div>


                </form>

            </div>
        </div>
            }
    </div>
    
}

function Input({ placeholder, value, onChange, type = "text" }: InputProps) {
    return <div>
        <input placeholder={placeholder} type={type} value={value} className="w-full px-4 py-2 border border-slate-300 rounded m-2" onChange={onChange} />
    </div>
}

function Textarea({ placeholder, value, onChange }: TextareaProps) {
    return <div>
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={4}
            className="w-full px-4 py-2 border border-slate-300 rounded m-2 resize-none"
        />
    </div>;
}