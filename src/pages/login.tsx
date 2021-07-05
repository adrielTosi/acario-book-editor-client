import PillarLayout from "components/layout/PillarLayout";

export default function Login() {
  return (
    <PillarLayout>
      <div className="columns is-centered is-vcentered is-gapless is-full-height is-mobile">
        <div className="column is-8">
          <h1 className="has-text-weight-semibold">Login</h1>
        </div>
      </div>
    </PillarLayout>
  );
}
