import React, { useState, useEffect } from "react";
import BasicModal from "../../common/BasicModal/BasicModal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { modalStyles } from "./styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

// dùng để validation sử dụng react hook form và Yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";

const defaultInputValues = {
  userId: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const NewUserModal = ({ open, onClose, addNewUser }) => {
  // tạo const showPassword và đặt cho nó giá trị boolean bằng false
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = React.useState(false);

  // hàm để khi clich thì ẩn hiện pasword khi là show thì ấn thì ẩn đi password, khi password đang ẩn thì cho hiện ra
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setConfirmShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const modalStyles = {
    inputFields: {
      display: "flex",
      flexDirection: "column",
      marginTop: "20px",
      marginBottom: "15px",
      ".MuiFormControl-root": {
        marginBottom: "20px",
      },
    },
  };

  // validation bằng regex
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  //---------------------------------------------------------------------------------------------------

  // tạo hàm validationSchema nó dùng để chứa tất cả các validation rule (quy tắc xác thực )
  const validationSchema = Yup.object().shape({
    userId: Yup.string()
      .required("User ID is required")
      .min(6, "User ID must be at least 6 characters"),
    email: Yup.string()
      // .matches(regexEmail, "Email is not valid")
      .required("Email is required")
      .email("Email is invalid."),
    phoneNumber: Yup.string()
    .required('Phone is required ')
    .matches(
      regexPhoneNumber,
      "Phone number is not valid"
    ),
    password: Yup.string()
      .required("Please Enter your password")
      .matches(
        regexPassword,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPassword: Yup.string()
      .required("ConfirmPassword is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  //------------------------------------------------

  // sử dụng react hook form dùng để hủy cấu trúc
  // register cho phép đăng ký và nhập dữ liệu
  // submit là chức năng nhận dữ liệu của biểu mẫu nếu xác nhận giá trị của biểu mẫu thành công
  // formState là đối tượng chứa thông tin về trạng thái
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultInputValues
  });
  // getValues chỉ xét giá trị 1 lần không quan sát dc sự thay đổi 
  // watch quan sát được sự thay đổi của giá trị 
  //  register dc dùng thay id , name, handlechange cần truyền key vào register nó là 1 dạng nhận dữ liệu 

  const addUser = (data) => {
    addNewUser(data);
    setValue('email', '');
    setValue('password', '');
    setValue('userId', '');
    setValue('confirmPassword', '');
    setValue('phoneNumber', '');
  };
  // add value xong thì cho sét giá trị form về giá trị ''


  const getContent = () => (
    <Box sx={modalStyles.inputFields}>
      <TextField
        placeholder="User ID"
        label="User ID"
        {...register("userId")}
        error={errors.userId?.message.length > 0}
        helperText={errors.userId?.message}
        value={watch('userId')}
      />
      <TextField
        placeholder="Email"
        label="Email"
        {...register("email")}
        error={errors.email?.message.length > 0}
        helperText={errors.email?.message}
        value={watch('email')}

      />
      <TextField
        placeholder="Phone number"
        label="Phone number"
        {...register("phoneNumber")}
        error={errors.phoneNumber?.message.length > 0}
        helperText={errors.phoneNumber?.message}
        value={watch('phoneNumber')}

      />
      <FormControl sx={modalStyles.inputFields}>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          {...register("password")}
          error={errors.password?.message?.length > 0}
        value={watch('password')}
        />
        <FormHelperText error={errors.password?.message?.length > 0} >{errors.password?.message}</FormHelperText>
      </FormControl>
      <FormControl sx={modalStyles.inputFields}>
        <InputLabel htmlFor="outlined-adornment-confirmPassword">
          Confirm Password
        </InputLabel>
        <OutlinedInput
          type={showConfirmPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message?.length > 0}
          helperText={errors.confirmPassword?.message}
          value={watch('confirmPassword')}
        />
        <FormHelperText error={errors.confirmPassword?.message?.length > 0} >{errors.confirmPassword?.message}</FormHelperText>
      </FormControl>
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="New user"
      subTitle="Fill out inputs and hit 'submit' button."
      content={getContent()}
      onSubmit={handleSubmit(addUser)}
    />
  );
};

export default NewUserModal;
