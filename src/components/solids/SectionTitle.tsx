import type { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  className?: string;
};

export function SectionTitle({ children, className = "" }: SectionTitleProps) {
  return (
    <div className={`solids-section-title ${className}`}>
      <span aria-hidden="true" />
      <h2>{children}</h2>
      <span aria-hidden="true" />
    </div>
  );
}
