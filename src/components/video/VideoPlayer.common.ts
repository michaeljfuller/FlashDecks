export interface VideoPlayerProps {
    loop?: boolean;
    autoplay?: boolean;
    muted?: boolean;
    controls?: boolean;
    sourceUri: string;
    onError?: (e?: string) => void;
}
