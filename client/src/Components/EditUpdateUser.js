import React from "react";
import {
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { Formik } from "formik";
import axios from "axios";
import Popup from "./Common/Popup";

const EditUpdateUser = ({ userData, getUsersData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  //update user data function call
  const UpdateData = (values) => {
    const { _id, name, email, project } = values;
    axios
      .patch(`http://localhost:5000/update/${_id}`, {
        name,
        email,
        project,
      })
      .then((res) => {
        getUsersData();
        toast({
          title: res.data.message,
          status: "success",
          isClosable: true,
          position: "bottom",
          duration: 2000,
        });
        onClose();
      })
      .catch((error) => {
        toast({
          title: error.message,
          status: "error",
          isClosable: true,
          position: "bottom",
          duration: 2000,
        });
        onClose();
      });
  };
  return (
    <div>
      <Button
        colorScheme="blue"
        onClick={onOpen}
        rightIcon={<EditIcon mb={1} />}
      >
        Edit
      </Button>

      <Popup title="Update User" isOpen={isOpen} onClose={onClose} isCentered>
        <Formik
          initialValues={userData}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Name is Required";
            }
            if (!values.project) {
              errors.project = "project is Required";
            }
            return errors;
          }}
          onSubmit={(values) => {
            UpdateData(values);
          }}
        >
          {({
            values,
            errors,
            isValid,
            touched,
            dirty,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <FormControl isRequired mt={8}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  autoComplete="off"
                />
                <Text color="tomato">
                  {errors.name && touched.name && errors.name}
                </Text>
              </FormControl>
              <FormControl isRequired mt={8}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  name="email"
                  isDisabled={true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  autoComplete="off"
                />
                <Text color="tomato">
                  {errors.email && touched.email && errors.email}
                </Text>
              </FormControl>
              <FormControl isRequired mt={8}>
                <FormLabel>project</FormLabel>
                <Input
                  type="text"
                  name="project"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.project}
                  autoComplete="off"
                />
                <Text color="tomato">
                  {errors.project &&
                    touched.project &&
                    errors.project}
                </Text>
              </FormControl>

              <ButtonGroup variant="outline" spacing="3" my={8}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  disabled={!(isValid && dirty)}
                >
                  Update
                </Button>

                <Button colorScheme="blue" onClick={onClose} variant="outline">
                  Cancel
                </Button>
              </ButtonGroup>
            </form>
          )}
        </Formik>
      </Popup>
    </div>
  );
};

export default EditUpdateUser;
