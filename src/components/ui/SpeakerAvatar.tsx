
import AppImage from '@/components/ui/AppImage';

interface SpeakerAvatarProps {
  name: string;
  photo: string;
  size?: number;
  showName?: boolean;
}

export default function SpeakerAvatar({ name, photo, size = 32, showName = false }: SpeakerAvatarProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="rounded-full overflow-hidden border-2 border-white/10 flex-shrink-0"
        style={{ width: size, height: size }}
      >
        <AppImage
          src={photo}
          alt={`${name} profile photo`}
          width={size}
          height={size}
          className="object-cover w-full h-full"
        />
      </div>
      {showName && (
        <span className="text-sm font-medium text-slate-300 truncate">{name}</span>
      )}
    </div>
  );
}