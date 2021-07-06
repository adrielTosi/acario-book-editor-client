import style from "./Box.module.scss";

export interface IBoxProps {
  children: JSX.Element | string;
}

export const Box = ({ children }: IBoxProps) => {
  return <div className={style.wrapper}>{children}</div>;
};
export default Box;
