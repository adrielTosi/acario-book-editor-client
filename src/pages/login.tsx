import Box from "components/common/Box/Box";
import PillarLayout from "components/layout/PillarLayout";
import { Formik, Form, Field } from "formik";
import React from "react";

import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Please enter valid email.").required("Required"),
  password: Yup.string().min(2, "Too Short!").required("Required"),
});

export default function Login() {
  return (
    <PillarLayout>
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
                    onSubmit={(values) => {
                      // same shape as initial values
                      console.log(values);
                    }}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div>
                          <Field name="email" type="email" />
                          {errors.email && touched.email ? (
                            <div>{errors.email}</div>
                          ) : null}
                        </div>
                        <div>
                          <Field name="password" type="password" />
                          {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                          ) : null}
                        </div>
                        <button type="submit">Login</button>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PillarLayout>
  );
}
