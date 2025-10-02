import { useState, type FC, type ReactNode } from "react";
import { PointTagDetails } from "./PointTagDetails";

interface PointTagProps {
  children: ReactNode;
  style?: object;
  maxLen: number;
}

export const PointTag: FC<PointTagProps> = (props) => {
  const {
    style,
    children,
  } = props;
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div
      style={style}
      className="relative rounded-[4px] w-[8px] h-[8px] bg-[#00C6B8] cursor-pointer"
      onClick={() => {
        // open/close
        setOpen((prev) => !prev);
      }}
    >
      {open ? (
        <>
          <PointTagDetails>
            {children}
          </PointTagDetails>
        </>
      ) : null}
    </div>
  );
};