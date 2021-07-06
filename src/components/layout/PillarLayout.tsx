import style from "src/styles/modules/LayoutPillar.module.scss";

export interface IPillarLayoutProps {
  isNarrow?: boolean;
  children: JSX.Element;
}

const PillarLayout = ({ children }: IPillarLayoutProps) => {
  return (
    <div className={style.wrapper}>
      <div className={`${style.pillar} ${style.pillar_1}`}></div>
      <div className={style.children}>{children}</div>
      <div className={`${style.pillar} ${style.pillar_2}`}></div>
    </div>
  );
};
export default PillarLayout;
