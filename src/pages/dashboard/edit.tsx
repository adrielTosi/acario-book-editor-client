import { withApollo } from "apollo/withApollo";
import { H1 } from "components/typography/Heading";
import { Text } from "components/typography/Text";
import { Avatar } from "components/ui/Avatar";
import { Box } from "components/ui/Box";
import { Button } from "components/ui/Button";
import { DropdownField, DropdownFieldItem } from "components/ui/DropdownField";
import { StyledField } from "components/ui/StyledField";
import { StyledLabel } from "components/ui/StyledLabel";
import { Formik } from "formik";
import { GetUserQuery } from "graphql/generated/graphqlTypes";
import { useUpdateProfileMutation } from "graphql/generated/mutations";
import { ssrCurrentUser, ssrGetUser } from "graphql/generated/page";
import { usePrivateRoute } from "lib/auth";
import { GetServerSideProps, NextPage } from "next";
import router from "next/router";
import { toast } from "react-toastify";
import { useStore } from "store/globalState";
import theme from "styles/theme";
import { ServerSideProps } from "types/ServerSideProps";
import * as Yup from "yup";

type EditProfileProps = ServerSideProps<GetUserQuery>;

const EditProfileSchema = Yup.object().shape({
  avatarSeed: Yup.string().required("Type at least one letter."),
  avatarType: Yup.string().required("Choose an avatar type."),
  name: Yup.string().required("Please choose a name"),
  bio: Yup.string().max(400, "Too long, please make it shorter!").required(),
});

const EditProfile: NextPage<EditProfileProps> = (props) => {
  usePrivateRoute();

  const [updateProfile] = useUpdateProfileMutation();

  const userData = props.data.getUser;
  const initialValues = {
    avatarSeed: userData.avatarSeed,
    avatarType: userData.avatarType,
    bio: userData.bio,
    name: userData.name,
  };

  if (props.error) {
    return <div className="has-text-centered">{props.error}</div>;
  }

  const dropdownData: DropdownFieldItem[] = [
    {
      text: "bottts",
      label: "Bottts",
    },
    {
      text: "croodles",
      label: "Croodles",
    },
  ];

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const { data } = await updateProfile({
        variables: {
          data: {
            avatarSeed: values.avatarSeed,
            avatarType: values.avatarType,
            bio: values.bio,
            name: values.name,
          },
        },
      });
      router.push("/dashboard");
    } catch (err: any) {
      toast(err.message, { toastId: values.name });
    }
  };

  return (
    <div className="container is-max-desktop">
      <Box pb="1em" borderBottom={`1px solid ${theme.colors.comp_outline}`}>
        <H1>Edit Profile</H1>
      </Box>

      <Box mt="2em">
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={EditProfileSchema}
        >
          {({ values, setFieldValue, handleChange, submitForm }) => (
            <>
              <div className="columns is-multiline">
                <div className="column is-6">
                  <div className="columns is-0 is-vcentered">
                    <div className="column is-narrow">
                      <Avatar
                        seed={values.avatarSeed}
                        type={values.avatarType}
                      />
                    </div>
                    <div className="column">
                      <StyledLabel htmlFor="avatarSeed">
                        Avatar seed
                      </StyledLabel>
                      <StyledField
                        id="avatarSeed"
                        name="avatarSeed"
                        type="text"
                      />
                    </div>
                  </div>
                  <Text size="small" color={theme.colors.contrast_low}>
                    Change the seed to change your avatar. Please no sensitive
                    information.
                  </Text>
                  <Text size="small" color={theme.colors.contrast_low}>
                    The avatars are a courtesy of{" "}
                    <a
                      href="https://avatars.dicebear.com/licenses"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Dicebear
                    </a>
                  </Text>
                </div>

                <div className="column is-6">
                  <div>
                    <StyledLabel htmlFor="avatar-dropdown">
                      Avatar Type
                    </StyledLabel>

                    <DropdownField
                      id="avatar-dropdown"
                      data={dropdownData}
                      onClick={(text) => {
                        setFieldValue("avatarType", text);
                      }}
                      selected={values.avatarType}
                    />
                  </div>
                </div>

                <div className="column is-6">
                  <StyledLabel htmlFor="name">Name</StyledLabel>
                  <StyledField id="name" name="name" type="text" />
                </div>
                <div className="column is-6">
                  <StyledLabel htmlFor="bio">Bio</StyledLabel>
                  <StyledField
                    id="bio"
                    name="bio"
                    type="text"
                    as="textarea"
                    value={values.bio}
                    onChange={handleChange}
                  />
                  <Text
                    size="small"
                    color={theme.colors.contrast_low}
                    textAlign="right"
                  >
                    {values.bio.length}/400
                  </Text>
                </div>
              </div>
              <Box textAlign="right" mt="2em">
                <Button onClick={submitForm}>Update</Button>
              </Box>
            </>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default withApollo(EditProfile);

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // IS THIS CALL NECESSARY? PROBABLY NOT -- maybe better make an optional id search in the backend
    const user = await ssrCurrentUser.getServerPage(
      {
        notifyOnNetworkStatusChange: true,
        context: {
          headers: {
            cookie: context.req.headers.cookie,
          },
        },
      },
      context
    );
    const res = await ssrGetUser.getServerPage(
      {
        variables: { username: user.props.data.currentUser.username },
        notifyOnNetworkStatusChange: true,
        context: {
          headers: {
            cookie: context.req.headers.cookie,
          },
        },
      },
      context
    );
    return res;
  } catch (error: any) {
    return { props: { error: error.message } };
  }
};
