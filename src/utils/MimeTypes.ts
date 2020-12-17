// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
export type ImageMimeType = 'image/*'|'image/jpeg'|'image/png'|'image/bmp'|'image/gif'|'image/tiff'|'image/webp'|'image/svg+xml';
export type VideoMimeType = 'video/*'|'video/mp4'|'video/x-msvideo'|'video/mpeg'|'video/ogg'|'video/mp2t'|'video/webm'|'video/3gpp'|'video/3gpp2';
export type MimeType = ImageMimeType | VideoMimeType;
