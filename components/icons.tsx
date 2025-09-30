import { cn } from '@/lib/utils';
import Image from 'next/image';

export const TiktokLogo = ({ className = '' }: { className?: string }) => {
  return (
    <>
      <Image
        src={'/logos/logo_black.png'}
        alt="TikTok_Logo"
        width={200}
        height={200}
        className={cn(className, 'dark:block hidden')}
      />
      <Image
        src={'/logos/logo_black.png'}
        alt="TikTok_Logo"
        width={200}
        height={200}
        className={cn(className, 'block dark:hidden')}
      />
    </>
  );
};

export const FeatherIcon = ({ size = 28, className }: { size?: number; className?: string }) => {
  return (
    <svg
      fillRule="evenodd"
      clipRule="evenodd"
      className={cn('fill-current', className)}
      style={{ color: 'currentcolor' }}
      viewBox="0 0 24 24"
      aria-hidden="true"
      width={size}
      height={size}
    >
      <g>
        <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z" />
      </g>
    </svg>
  );
};

export const EmptyTree = ({ className }: { className?: string }) => {
  return (
    <svg
      fill="none"
      width="64"
      viewBox="0 0 24 24"
      height="64"
      style={{ color: 'currentcolor' }}
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 4a1 1 0 0 1 1-1h1a8.003 8.003 0 0 1 7.75 6.006A7.985 7.985 0 0 1 19 6h1a1 1 0 0 1 1 1v1a8 8 0 0 1-8 8v4a1 1 0 1 1-2 0v-7a8 8 0 0 1-8-8V4Zm2 1a6 6 0 0 1 6 6 6 6 0 0 1-6-6Zm8 9a6 6 0 0 1 6-6 6 6 0 0 1-6 6Z"
      ></path>
    </svg>
  );
};

export const CameraIcon = ({ size = 14, className }: { size?: number; className?: string }) => {
  return (
    <svg
      fill="none"
      height={size}
      width={size}
      viewBox="0 0 24 24"
      style={{ color: 'currentcolor' }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.371 3.89A2 2 0 0 1 10.035 3h3.93a2 2 0 0 1 1.664.89L17.035 6H20a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.965L8.37 3.89ZM12 9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
      ></path>
    </svg>
  );
};

export const ArrowLeftIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      fill="none"
      width={size}
      viewBox="0 0 24 24"
      height={size}
      style={{ color: 'currentcolor' }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 12a1 1 0 0 1 .293-.707l6-6a1 1 0 0 1 1.414 1.414L6.414 11H20a1 1 0 1 1 0 2H6.414l4.293 4.293a1 1 0 0 1-1.414 1.414l-6-6A1 1 0 0 1 3 12Z"
      ></path>
    </svg>
  );
};

export const SignOutIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      style={{
        color: 'currentcolor',
      }}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
};

export const SparklesIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    height={size}
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width={size}
    style={{ color: 'currentcolor' }}
  >
    <path
      d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z"
      fill="currentColor"
    />
    <path
      d="M14.5 4.5V5H13.5V4.5C13.5 3.94772 13.0523 3.5 12.5 3.5H12V3V2.5H12.5C13.0523 2.5 13.5 2.05228 13.5 1.5V1H14H14.5V1.5C14.5 2.05228 14.9477 2.5 15.5 2.5H16V3V3.5H15.5C14.9477 3.5 14.5 3.94772 14.5 4.5Z"
      fill="currentColor"
    />
    <path
      d="M8.40706 4.92939L8.5 4H9.5L9.59294 4.92939C9.82973 7.29734 11.7027 9.17027 14.0706 9.40706L15 9.5V10.5L14.0706 10.5929C11.7027 10.8297 9.82973 12.7027 9.59294 15.0706L9.5 16H8.5L8.40706 15.0706C8.17027 12.7027 6.29734 10.8297 3.92939 10.5929L3 10.5V9.5L3.92939 9.40706C6.29734 9.17027 8.17027 7.29734 8.40706 4.92939Z"
      fill="currentColor"
    />
  </svg>
);

export const ImageIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={{ color: 'currentcolor' }}
    >
      <path
        fill="hsl(211, 99%, 56%)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4Zm2 1v7.213l1.246-.932.044-.03a3 3 0 0 1 3.863.454c1.468 1.58 2.941 2.749 4.847 2.749 1.703 0 2.855-.555 4-1.618V5H5Zm14 10.357c-1.112.697-2.386 1.097-4 1.097-2.81 0-4.796-1.755-6.313-3.388a1 1 0 0 0-1.269-.164L5 14.712V19h14v-3.643ZM15 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-3 1a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"
      ></path>
    </svg>
  );
};

export const HomeIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      fill="none"
      width={size}
      viewBox="0 0 24 24"
      height={size}
      aria-hidden="true"
      style={{ color: 'currentcolor' }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.37 1.724a1 1 0 0 1 1.26 0l8 6.5A1 1 0 0 1 21 9v11a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-5h-2v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 .37-.776l8-6.5ZM5 9.476V19h4v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5h4V9.476l-7-5.688-7 5.688Z"
      ></path>
    </svg>
  );
};

export const HomeFilledIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg fill="none" width={size} viewBox="0 0 24 24" height={size} aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.63 1.724a1 1 0 0 0-1.26 0l-8 6.5A1 1 0 0 0 3 9v11a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V9a1 1 0 0 0-.37-.776l-8-6.5Z"
      ></path>
    </svg>
  );
};
export const LiveIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
    </svg>
  );
};

export const LiveFilledIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
    </svg>
  );
};
export const ExploreFilledIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      aria-label="탐색 탭"
      fill="currentColor"
      height={size}
      role="img"
      viewBox="0 0 24 24"
      width={size}
      style={{ color: 'currentcolor' }}
    >
      <title>탐색 탭</title>
      <path d="m13.173 13.164 1.491-3.829-3.83 1.49ZM12.001.5a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12.001.5Zm5.35 7.443-2.478 6.369a1 1 0 0 1-.57.569l-6.36 2.47a1 1 0 0 1-1.294-1.294l2.48-6.369a1 1 0 0 1 .57-.569l6.359-2.47a1 1 0 0 1 1.294 1.294Z"></path>
    </svg>
  );
};

export const ExploreIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      aria-label="탐색 탭"
      fill="currentColor"
      height={size}
      role="img"
      viewBox="0 0 24 24"
      width={size}
      style={{ color: 'currentcolor' }}
    >
      <title>탐색 탭</title>
      <polygon
        fill="none"
        points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polygon>
      <polygon
        fillRule="evenodd"
        points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"
      ></polygon>
      <circle
        cx="12.001"
        cy="12.005"
        fill="none"
        r="10.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></circle>
    </svg>
  );
};

export const UserIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      fill="none"
      width={size}
      viewBox="0 0 24 24"
      height={size}
      aria-hidden="true"
      style={{ color: 'currentcolor' }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4a8 8 0 0 0-5.935 13.365C7.56 15.895 9.612 15 12 15c2.388 0 4.44.894 5.935 2.365A8 8 0 0 0 12 4Zm4.412 14.675C15.298 17.636 13.792 17 12 17c-1.791 0-3.298.636-4.412 1.675A7.96 7.96 0 0 0 12 20a7.96 7.96 0 0 0 4.412-1.325ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10a9.98 9.98 0 0 1-3.462 7.567A9.965 9.965 0 0 1 12 22a9.965 9.965 0 0 1-6.538-2.433A9.98 9.98 0 0 1 2 12Zm10-4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
      ></path>
    </svg>
  );
};

export const UserFilledIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      fill="none"
      width={size}
      viewBox="0 0 24 24"
      height={size}
      aria-hidden="true"
      style={{ color: 'currentcolor' }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm3-12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-3 10a7.976 7.976 0 0 1-5.714-2.4C7.618 16.004 9.605 15 12 15c2.396 0 4.383 1.005 5.714 2.6A7.976 7.976 0 0 1 12 20Z"
      ></path>
    </svg>
  );
};

export const SettingFilledIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      fill="none"
      width={size}
      viewBox="0 0 24 24"
      height={size}
      aria-hidden="true"
      style={{ color: 'currentcolor' }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.996 2.869A1.951 1.951 0 0 1 11.62 2h.76c.653 0 1.262.326 1.624.869l1.141 1.712 1.749-.404a1.951 1.951 0 0 1 1.819.522l.588.589c.476.475.673 1.162.522 1.818l-.404 1.749 1.712 1.141c.543.362.869.971.869 1.624v.76c0 .653-.326 1.262-.869 1.624l-1.712 1.141.404 1.749a1.951 1.951 0 0 1-.522 1.819l-.588.588a1.951 1.951 0 0 1-1.819.522l-1.749-.404-1.141 1.712A1.951 1.951 0 0 1 12.38 22h-.76a1.951 1.951 0 0 1-1.624-.869L8.855 19.42l-1.749.404a1.951 1.951 0 0 1-1.818-.522l-.59-.588a1.951 1.951 0 0 1-.52-1.819l.403-1.749-1.712-1.141A1.951 1.951 0 0 1 2 12.38v-.76c0-.653.326-1.262.869-1.624L4.58 8.855l-.404-1.749A1.951 1.951 0 0 1 4.7 5.288l.589-.59a1.951 1.951 0 0 1 1.818-.52l1.749.403 1.141-1.712ZM8.5 12a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Z"
      ></path>
    </svg>
  );
};

export const SettingIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-settings-icon lucide-settings"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
};

export const SearchIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-search-icon lucide-search"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
};

export const NotificationIcon = ({ size = 64 }: { size?: number }) => {
  return (
    <svg viewBox="0 0 448 512" height={size} width={size} style={{ color: 'currentcolor' }}>
      <path
        fill="currentColor"
        d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
      ></path>
    </svg>
  );
};

export const BellIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-bell-icon lucide-bell"
    >
      <path d="M10.268 21a2 2 0 0 0 3.464 0" />
      <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
    </svg>
  );
};
export const BellFilledIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      fill="none"
      width={size}
      viewBox="0 0 24 24"
      height={size}
      aria-hidden="true"
      style={{ color: 'currentcolor' }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2a7.853 7.853 0 0 0-7.784 6.815l-1.207 9.053A1 1 0 0 0 4 19h3.354c.904 1.748 2.607 3 4.646 3 2.039 0 3.742-1.252 4.646-3H20a1 1 0 0 0 .991-1.132l-1.207-9.053A7.853 7.853 0 0 0 12 2Zm2.222 17H9.778c.61.637 1.399 1 2.222 1s1.613-.363 2.222-1Z"
      ></path>
    </svg>
  );
};

export const ChatIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-message-circle-more-icon lucide-message-circle-more"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M8 12h.01" />
      <path d="M12 12h.01" />
      <path d="M16 12h.01" />
    </svg>
  );
};
export const ChatFilledIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      fill="none"
      width={size}
      viewBox="0 0 24 24"
      height={size}
      aria-hidden="true"
      style={{ color: 'currentcolor' }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.968 9.968 0 0 1-4.136-.893l-4.68.876a1 1 0 0 1-1.164-1.184l.931-4.537A9.965 9.965 0 0 1 2 12Zm4.25 0a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0Zm4.5 0a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0Zm5.75 1.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
      ></path>
    </svg>
  );
};

export const HeartIcon = ({ size = 16, className = '' }: { className?: string; size?: number }) => {
  return (
    <svg
      fill="none"
      width={size}
      viewBox="0 0 24 24"
      height={size}
      style={{ color: 'currentcolor' }}
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.734 5.091c-1.238-.276-2.708.047-4.022 1.38a1 1 0 0 1-1.424 0C9.974 5.137 8.504 4.814 7.266 5.09c-1.263.282-2.379 1.206-2.92 2.556C3.33 10.18 4.252 14.84 12 19.348c7.747-4.508 8.67-9.168 7.654-11.7-.541-1.351-1.657-2.275-2.92-2.557Zm4.777 1.812c1.604 4-.494 9.69-9.022 14.47a1 1 0 0 1-.978 0C2.983 16.592.885 10.902 2.49 6.902c.779-1.942 2.414-3.334 4.342-3.764 1.697-.378 3.552.003 5.169 1.286 1.617-1.283 3.472-1.664 5.17-1.286 1.927.43 3.562 1.822 4.34 3.764Z"
      ></path>
    </svg>
  );
};
export const HeartFillIcon = ({
  size = 16,
  className = '',
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <svg fill="none" width={size} viewBox="0 0 24 24" height={size} className={className}>
      <path
        fill="#ec4899"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.489 21.372c8.528-4.78 10.626-10.47 9.022-14.47-.779-1.941-2.414-3.333-4.342-3.763-1.697-.378-3.552.003-5.169 1.287-1.617-1.284-3.472-1.665-5.17-1.287-1.927.43-3.562 1.822-4.34 3.764-1.605 4 .493 9.69 9.021 14.47a1 1 0 0 0 .978 0Z"
      ></path>
    </svg>
  );
};

export const MoreHorizontalIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      height={size}
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width={size}
      style={{ color: 'currentcolor' }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 8C4 8.82843 3.32843 9.5 2.5 9.5C1.67157 9.5 1 8.82843 1 8C1 7.17157 1.67157 6.5 2.5 6.5C3.32843 6.5 4 7.17157 4 8ZM9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8ZM13.5 9.5C14.3284 9.5 15 8.82843 15 8C15 7.17157 14.3284 6.5 13.5 6.5C12.6716 6.5 12 7.17157 12 8C12 8.82843 12.6716 9.5 13.5 9.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const CheckCircleFillIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      height={size}
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width={size}
      style={{ color: 'currentcolor' }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.5303 6.53033L12.0607 6L11 4.93934L10.4697 5.46967L6.5 9.43934L5.53033 8.46967L5 7.93934L3.93934 9L4.46967 9.53033L5.96967 11.0303C6.26256 11.3232 6.73744 11.3232 7.03033 11.0303L11.5303 6.53033Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const WarningIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      height={size}
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width={size}
      style={{ color: 'currentcolor' }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.55846 0.5C9.13413 0.5 9.65902 0.829456 9.90929 1.34788L15.8073 13.5653C16.1279 14.2293 15.6441 15 14.9068 15H1.09316C0.355835 15 -0.127943 14.2293 0.192608 13.5653L6.09065 1.34787C6.34092 0.829454 6.86581 0.5 7.44148 0.5H8.55846ZM8.74997 4.75V5.5V8V8.75H7.24997V8V5.5V4.75H8.74997ZM7.99997 12C8.55226 12 8.99997 11.5523 8.99997 11C8.99997 10.4477 8.55226 10 7.99997 10C7.44769 10 6.99997 10.4477 6.99997 11C6.99997 11.5523 7.44769 12 7.99997 12Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const LoaderIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      height={size}
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width={size}
      style={{ color: 'currentcolor' }}
    >
      <g clipPath="url(#clip0_2393_1490)">
        <path d="M8 0V4" stroke="currentColor" strokeWidth="1.5" />
        <path opacity="0.5" d="M8 16V12" stroke="currentColor" strokeWidth="1.5" />
        <path
          opacity="0.9"
          d="M3.29773 1.52783L5.64887 4.7639"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          opacity="0.1"
          d="M12.7023 1.52783L10.3511 4.7639"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          opacity="0.4"
          d="M12.7023 14.472L10.3511 11.236"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          opacity="0.6"
          d="M3.29773 14.472L5.64887 11.236"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          opacity="0.2"
          d="M15.6085 5.52783L11.8043 6.7639"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          opacity="0.7"
          d="M0.391602 10.472L4.19583 9.23598"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          opacity="0.3"
          d="M15.6085 10.4722L11.8043 9.2361"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          opacity="0.8"
          d="M0.391602 5.52783L4.19583 6.7639"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_2393_1490">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export const MoreIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
};

export const StarIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      style={{ color: 'currentcolor' }}
    >
      <path
        fill="currentColor"
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      />
    </svg>
  );
};

export const PhoneIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="size-"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.0814 6.82937C11.6088 7.41389 11.4416 8.07609 10.9753 8.70441C10.8647 8.85338 10.7373 9.00016 10.5834 9.1619C10.5095 9.23953 10.4519 9.29791 10.3314 9.41851C10.0578 9.69239 9.82774 9.92252 9.64131 10.1089C9.5509 10.1993 10.1681 11.4326 11.366 12.6316C12.5633 13.8299 13.7966 14.4475 13.8875 14.3566L14.5771 13.6666C14.9569 13.2865 15.158 13.1032 15.4343 12.9219C16.0089 12.545 16.6355 12.4426 17.164 12.9151C18.8897 14.1494 19.8662 14.9068 20.3446 15.4038C21.2777 16.3733 21.1554 17.8655 20.3499 18.7169C20.0706 19.0121 19.7164 19.3664 19.2981 19.7696C16.7677 22.3012 11.4274 20.7606 7.33465 16.6642C3.24096 12.5669 1.70103 7.22664 4.22611 4.70045C4.67944 4.24005 4.82891 4.09068 5.27041 3.65569C6.0924 2.84584 7.65369 2.71903 8.60279 3.6565C9.10203 4.14961 9.89793 5.17356 11.0814 6.82937ZM15.8493 14.9392L15.1596 15.6292C13.9871 16.8022 11.9904 15.8024 10.0937 13.9039C8.19561 12.0042 7.19678 10.0085 8.36962 8.83585C8.5558 8.6497 8.78561 8.41979 9.05904 8.14612C9.16936 8.0357 9.21982 7.98455 9.28039 7.9209C9.36292 7.83417 9.43074 7.758 9.48503 7.6906C8.4362 6.22974 7.72322 5.31692 7.33886 4.93727C7.14036 4.7412 6.69589 4.7773 6.53271 4.93807C6.09752 5.36684 5.95447 5.5098 5.50297 5.96831C3.87909 7.59293 5.12223 11.904 8.60701 15.3918C12.0907 18.8786 16.4015 20.1222 18.0378 18.4854C18.4496 18.0883 18.7852 17.7525 19.0434 17.4796C19.2301 17.2823 19.2634 16.8753 19.0487 16.6522C18.6911 16.2807 17.8157 15.5982 16.304 14.5127C16.1938 14.6014 16.0583 14.73 15.8493 14.9392Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EmailIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="size-"
    >
      <path
        d="M20.3721 18.3988V6.60107H3.62793V18.3988H20.3721Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3.78369 6.75134L11.0071 13.7586C11.5425 14.2751 12.5168 14.269 13.0409 13.7633L20.2593 6.80774"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M4.03174 18.0103L9.56626 12.5939" stroke="currentColor" strokeWidth="1.5" />
      <path d="M19.9048 17.9478L14.5195 12.6689" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
};

export const SendIcon = ({ size = 24 }: { size?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-arrow-up-icon lucide-arrow-up"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
};

export const CertIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => {
  return (
    <svg
      fill="rgb(0, 149, 246)"
      height={size}
      role="img"
      viewBox="0 0 40 40"
      width={size}
      className={className}
    >
      <title>인증됨</title>
      <path
        d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export const DoorOutIcon = ({ size = 28 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: 'currentcolor' }}
  >
    <rect
      x="9"
      y="20"
      width="2"
      height="12"
      rx="1"
      transform="rotate(-180 9 20)"
      fill="currentColor"
    ></rect>
    <rect
      x="22"
      y="15"
      width="10"
      height="2"
      rx="1"
      transform="rotate(-180 22 15)"
      fill="currentColor"
    ></rect>
    <path
      d="M17 18L20.7879 14.2121C20.905 14.095 20.905 13.905 20.7879 13.7879L17 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    ></path>
  </svg>
);

export const AiIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      style={{ color: 'currentcolor' }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
    >
      <path
        fillRule="evenodd"
        d="m7.007 4.993-.813-2.847c-.056-.195-.332-.195-.388 0l-.813 2.847-2.847.813c-.195.056-.195.332 0 .388l2.847.813.813 2.847c.056.195.332.195.388 0l.813-2.847 2.847-.813c.195-.056.195-.332 0-.388zm9.296 1.79 1.415 1.414-2.122 2.121-1.414-1.414zm-3.535 3.535L4.99 18.096a1 1 0 1 0 1.414 1.414l7.778-7.778zm-9.193 6.364L16.303 3.954l4.243 4.243L7.818 20.925a3 3 0 1 1-4.243-4.243m15.046-1.59.508 1.779 1.78.508c.121.035.121.207 0 .242l-1.78.508-.508 1.78c-.035.121-.207.121-.242 0l-.508-1.78-1.78-.508c-.121-.035-.121-.207 0-.242l1.78-.508.508-1.78c.035-.121.207-.121.242 0"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

// AI (filled)
export const AiFilledIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      style={{ color: 'currentcolor' }}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        fillRule="evenodd"
        d="m7.007 4.993-.813-2.847c-.056-.195-.332-.195-.388 0l-.813 2.847-2.847.813c-.195.056-.195.332 0 .388l2.847.813.813 2.847c.056.195.332.195.388 0l.813-2.847 2.847-.813c.195-.056.195-.332 0-.388zm5.76 5.325L4.99 18.096a1 1 0 1 0 1.414 1.414l7.778-7.778zm-9.192 6.364L16.303 3.954l4.243 4.243L7.818 20.925a3 3 0 1 1-4.243-4.243m15.046-1.59.508 1.779 1.78.508c.121.035.121.207 0 .242l-1.78.508-.508 1.78c-.035.121-.207.121-.242 0l-.508-1.78-1.78-.508c-.121-.035-.121-.207 0-.242l1.78-.508.508-1.78c.035-.121.207-.121.242 0"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const PlanIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      fill="currentColor"
      width={size}
      viewBox="0 0 24 24"
      height={size}
      aria-hidden="true"
      style={{ color: 'currentcolor' }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.7 16.895a4 4 0 0 1 4.6 0l3.7 2.6V6.5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v12.995l3.7-2.6Zm10.3 2.6c0 1.62-1.825 2.567-3.15 1.636l-3.7-2.6a2.001 2.001 0 0 0-2.3 0l-3.7 2.6C5.825 22.062 4 21.115 4 19.495V6.5a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v12.995Z"
      ></path>
    </svg>
  );
};

export const PlanFilledIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      fill="currentColor"
      width={size}
      viewBox="0 0 24 24"
      height={size}
      aria-hidden="true"
      style={{ color: 'currentcolor' }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 2.5a4 4 0 0 1 4 4v12.995c0 1.62-1.825 2.567-3.15 1.636l-3.7-2.6a2.001 2.001 0 0 0-2.3 0l-3.7 2.6C5.825 22.062 4 21.115 4 19.495V6.5a4 4 0 0 1 4-4h8Z"
      ></path>
    </svg>
  );
};

export const AppLogo = ({ className = '' }: { className?: string }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="aivy logo">
      <text
        x="20"
        y="100"
        font-family="Poppins, Inter, system-ui, -apple-system, sans-serif"
        font-weight="800"
        font-size="92"
        letter-spacing="-6"
        fill="currentColor"
      >
        aivy
      </text>
      <circle cx="128" cy="40" r="9" fill="#2E8B57" />
    </svg>
  );
};
