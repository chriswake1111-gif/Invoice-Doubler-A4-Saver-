import { useEffect } from 'react';

export const usePasteImage = (onImagePaste: (src: string) => void, enabled: boolean) => {
    useEffect(() => {
        if (!enabled) return;

        const handlePaste = (e: ClipboardEvent) => {
            const items = e.clipboardData?.items;
            if (!items) return;

            for (const item of items) {
                if (item.type.startsWith('image/')) {
                    const blob = item.getAsFile();
                    if (blob) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            if (event.target?.result) {
                                onImagePaste(event.target.result as string);
                            }
                        };
                        reader.readAsDataURL(blob);
                    }
                }
            }
        };

        window.addEventListener('paste', handlePaste);
        return () => window.removeEventListener('paste', handlePaste);
    }, [onImagePaste, enabled]);
};
