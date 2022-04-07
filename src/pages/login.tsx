import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

import { withApollo } from "apollo/withApollo";
import { useLoginMutation } from "graphql/generated/mutations";
import { Box } from "components/ui/Box";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Please enter valid email.").required("Required"),
  password: Yup.string().min(2, "Too Short!").required("Required"),
});

const Login = () => {
  const [login] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="columns is-centered is-vcentered is-gapless is-full-height is-mobile">
      <div className="column is-12">
        <div className="has-text-centered">
          <h2 className="has-text-weight-semibold">Login</h2>
          <div className="columns is-centered is-gapless">
            <div className="column is-4">
              <Box>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={async (values) => {
                    try {
                      await login({
                        variables: {
                          email: values.email,
                          password: values.password,
                        },
                      });
                      if (typeof router.query.next === "string") {
                        router.push(router.query.next);
                      } else {
                        router.push("/");
                      }
                    } catch (err) {
                      setError((err as any).message);
                    }
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div>
                        <Field name="email" type="email" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                      </div>
                      <div>
                        <Field name="password" type="password" />
                        {errors.password && touched.password ? <div>{errors.password}</div> : null}
                      </div>
                      <button type="submit">Login</button>
                      {error && <div>{error}</div>}
                    </Form>
                  )}
                </Formik>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withApollo(Login);
