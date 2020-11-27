export interface VideoPlayerProps {
    loop?: boolean;
    autoplay?: boolean;
    muted?: boolean;
    controls?: boolean;
    height?: number;
    sourceUri: string;
    onError?: (e?: string) => void;
}
