import { ComponentPropsWithoutRef, FC } from "react";

interface TProps extends ComponentPropsWithoutRef<"svg"> {
  size: number;
  color?: string;
}

const ArrowIcon: FC<TProps> = ({ size, className }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="56" height="56" rx="28" fill="#2D2D2D" />
      <path
        d="M28 37.625L18.375 28L28 18.375"
        stroke="#EBE719"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.625 28H18.375"
        stroke="#EBE719"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowIcon;
