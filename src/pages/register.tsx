import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

import { withApollo } from "apollo/withApollo";
import { useRegisterMutation } from "graphql/generated/mutations";
import { Box } from "components/ui/Box";
import { StyledField } from "components/ui/StyledField";
import { StyledLabel } from "components/ui/StyledLabel";
import { Button } from "components/ui/Button";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  username: Yup.string().required("Required"),
  email: Yup.string().email("Please enter valid email.").required("Required"),
  password: Yup.string().min(2, "Too Short!").required("Required"),
});

const Login = () => {
  const [register] = useRegisterMutation();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="columns is-centered is-vcentered is-gapless is-full-height is-mobile">
      <div className="column is-12">
        <h2 className="has-text-weight-semibold has-text-centered">Register</h2>
        <div className="columns is-centered is-gapless">
          <div className="column is-3">
            <Box>
              <Formik
                initialValues={{
                  name: "",
                  username: "",
                  email: "",
                  password: "",
                }}
                validationSchema={RegisterSchema}
                onSubmit={async (values) => {
                  try {
                    await register({
                      variables: {
                        name: values.name,
                        username: values.username,
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
                    setError(err.message);
                  }
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Box mb="1em">
                      <StyledLabel>Name </StyledLabel>
                      <StyledField name="name" type="text" />
                      {errors.name && touched.name ? <div>{errors.name}</div> : null}
                    </Box>
                    <Box mb="1em">
                      <StyledLabel>Username</StyledLabel>
                      <StyledField name="username" type="text" />
                      {errors.username && touched.username ? <div>{errors.username}</div> : null}
                    </Box>
                    <Box mb="1em">
                      <StyledLabel>Email</StyledLabel>
                      <StyledField name="email" type="email" />
                      {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    </Box>
                    <Box mb="1em">
                      <StyledLabel>Password</StyledLabel>
                      <StyledField name="password" type="password" />
                      {errors.password && touched.password ? <div>{errors.password}</div> : null}
                    </Box>
                    <Box textAlign="right">
                      <Button type="submit">Register</Button>
                    </Box>
                    {error && <div>{error}</div>}
                  </Form>
                )}
              </Formik>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withApollo(Login);
